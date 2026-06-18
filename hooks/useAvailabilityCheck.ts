import { useCallback, useState } from 'react';
import { Category, LinkItem } from '../types';

export type AvailabilityResultStatus = 'online' | 'offline' | 'timeout';

export interface LinkAvailabilityResult {
  isOnline: boolean;
  status: AvailabilityResultStatus;
  message: string;
  checkedAt: number;
  finalUrl: string;
}

export interface CategoryAvailabilityStatus {
  checking: boolean;
  online: number;
  offline: number;
  timeout: number;
  total: number;
  offlineLinks: string[];
  resultsByLinkId: Record<string, LinkAvailabilityResult>;
}

interface UseAvailabilityCheckOptions {
  links: LinkItem[];
  categories: Category[];
  unlockedCategoryIds: Set<string>;
  unassignedSubCategoryFilter: string;
}

const CONCURRENT_LIMIT = 5;
const REQUEST_TIMEOUT_MS = 15000;

const getCategoryCheckScopeKey = (categoryId: string, subCategoryId: string | null = null) => (
  subCategoryId ? `${categoryId}::sub::${subCategoryId}` : categoryId
);

const normalizeCheckUrl = (url: string): string => {
  const trimmed = url.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const classifyFetchError = (error: unknown): { status: Exclude<AvailabilityResultStatus, 'online'>; message: string } => {
  if (error instanceof Error && error.name === 'AbortError') {
    return { status: 'timeout', message: '请求超时' };
  }
  return { status: 'offline', message: '连接失败' };
};

const tryFetch = async (targetUrl: string, timeoutMs = REQUEST_TIMEOUT_MS): Promise<void> => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    await fetch(targetUrl, {
      method: 'GET',
      signal: controller.signal,
      mode: 'no-cors'
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const checkUrlWithLocalNetwork = async (url: string): Promise<LinkAvailabilityResult> => {
  const testUrl = normalizeCheckUrl(url);
  const checkedAt = Date.now();

  if (!testUrl) {
    return {
      isOnline: false,
      status: 'offline',
      message: '网址为空',
      checkedAt,
      finalUrl: ''
    };
  }

  try {
    await tryFetch(testUrl);
    return {
      isOnline: true,
      status: 'online',
      message: '可访问',
      checkedAt,
      finalUrl: testUrl
    };
  } catch (primaryError) {
    if (testUrl.startsWith('https://')) {
      const httpUrl = testUrl.replace(/^https:\/\//i, 'http://');
      try {
        await tryFetch(httpUrl);
        return {
          isOnline: true,
          status: 'online',
          message: 'HTTPS 失败，HTTP 可访问',
          checkedAt,
          finalUrl: httpUrl
        };
      } catch (fallbackError) {
        const primary = classifyFetchError(primaryError);
        const fallback = classifyFetchError(fallbackError);
        const status = primary.status === 'timeout' && fallback.status === 'timeout' ? 'timeout' : 'offline';
        return {
          isOnline: false,
          status,
          message: status === 'timeout' ? 'HTTPS/HTTP 均超时' : 'HTTPS/HTTP 均连接失败',
          checkedAt,
          finalUrl: testUrl
        };
      }
    }

    const failed = classifyFetchError(primaryError);
    return {
      isOnline: false,
      status: failed.status,
      message: failed.message,
      checkedAt,
      finalUrl: testUrl
    };
  }
};

export const useAvailabilityCheck = ({
  links,
  categories,
  unlockedCategoryIds,
  unassignedSubCategoryFilter
}: UseAvailabilityCheckOptions) => {
  const [categoryCheckStatus, setCategoryCheckStatus] = useState<Record<string, CategoryAvailabilityStatus>>({});
  const [linkCheckResults, setLinkCheckResults] = useState<Record<string, LinkAvailabilityResult>>({});
  const [checkingLinkIds, setCheckingLinkIds] = useState<Set<string>>(new Set());

  const isCategoryLocked = useCallback((categoryId: string) => {
    const category = categories.find(item => item.id === categoryId);
    return !!category?.password && !unlockedCategoryIds.has(categoryId);
  }, [categories, unlockedCategoryIds]);

  const getLinksForCategoryCheck = useCallback((categoryId: string, subCategoryId: string | null = null) => {
    let scopedLinks = links.filter(link => link.categoryId === categoryId && !isCategoryLocked(link.categoryId));

    if (subCategoryId === unassignedSubCategoryFilter) {
      const category = categories.find(item => item.id === categoryId);
      const validSubCategoryIds = new Set((category?.subcategories || []).map(item => item.id));
      scopedLinks = scopedLinks.filter(link => !link.subCategoryId || !validSubCategoryIds.has(link.subCategoryId));
    } else if (subCategoryId) {
      scopedLinks = scopedLinks.filter(link => link.subCategoryId === subCategoryId);
    }

    return scopedLinks;
  }, [categories, isCategoryLocked, links, unassignedSubCategoryFilter]);

  const buildStatusFromResults = useCallback((
    resultsByLinkId: Record<string, LinkAvailabilityResult>,
    total: number,
    checking: boolean
  ): CategoryAvailabilityStatus => {
    const results = Object.entries(resultsByLinkId);
    const offlineLinks = results
      .filter(([, result]) => !result.isOnline)
      .map(([linkId]) => linkId);

    return {
      checking,
      online: results.filter(([, result]) => result.isOnline).length,
      offline: offlineLinks.length,
      timeout: results.filter(([, result]) => result.status === 'timeout').length,
      total,
      offlineLinks,
      resultsByLinkId
    };
  }, []);

  const getEffectiveCategoryCheckStatus = useCallback((categoryId: string, subCategoryId: string | null = null) => {
    const scopeKey = getCategoryCheckScopeKey(categoryId, subCategoryId);
    const baseStatus = categoryCheckStatus[scopeKey];
    const categoryLinks = getLinksForCategoryCheck(categoryId, subCategoryId);
    const scopedLinkIds = new Set(categoryLinks.map(link => link.id));
    const mergedResults: Record<string, LinkAvailabilityResult> = {};
    const baseResults: Record<string, LinkAvailabilityResult> = baseStatus?.resultsByLinkId || {};

    Object.entries(baseResults).forEach(([linkId, result]) => {
      if (scopedLinkIds.has(linkId)) {
        mergedResults[linkId] = result;
      }
    });

    categoryLinks.forEach(link => {
      const override = linkCheckResults[link.id];
      if (override) {
        mergedResults[link.id] = override;
      }
    });

    if (!baseStatus && Object.keys(mergedResults).length === 0) {
      return undefined;
    }

    return buildStatusFromResults(
      mergedResults,
      baseStatus ? categoryLinks.length : Object.keys(mergedResults).length,
      baseStatus?.checking ?? false
    );
  }, [buildStatusFromResults, categoryCheckStatus, getLinksForCategoryCheck, linkCheckResults]);

  const getLinkAvailabilityResult = useCallback((link: LinkItem, subCategoryId: string | null = null) => {
    const singleResult = linkCheckResults[link.id];
    if (singleResult) return singleResult;
    return getEffectiveCategoryCheckStatus(link.categoryId, subCategoryId)?.resultsByLinkId[link.id];
  }, [getEffectiveCategoryCheckStatus, linkCheckResults]);

  const checkLinkAvailability = useCallback(async (link: LinkItem): Promise<LinkAvailabilityResult> => {
    setCheckingLinkIds(prev => new Set(prev).add(link.id));

    try {
      const result = await checkUrlWithLocalNetwork(link.url);
      setLinkCheckResults(prev => ({ ...prev, [link.id]: result }));
      return result;
    } finally {
      setCheckingLinkIds(prev => {
        const next = new Set(prev);
        next.delete(link.id);
        return next;
      });
    }
  }, []);

  const applyLinkAvailabilityResult = useCallback((link: LinkItem, isOnline: boolean) => {
    setLinkCheckResults(prev => ({
      ...prev,
      [link.id]: {
        isOnline,
        status: isOnline ? 'online' : 'offline',
        message: isOnline ? '可访问' : '连接失败',
        checkedAt: Date.now(),
        finalUrl: normalizeCheckUrl(link.url)
      }
    }));
  }, []);

  const checkCategoryAvailability = useCallback(async (
    categoryId: string,
    subCategoryId: string | null = null,
    options: { onlyFailed?: boolean } = {}
  ) => {
    const scopeKey = getCategoryCheckScopeKey(categoryId, subCategoryId);
    const scopedLinks = getLinksForCategoryCheck(categoryId, subCategoryId);
    const targetLinks = options.onlyFailed
      ? scopedLinks.filter(link => getEffectiveCategoryCheckStatus(categoryId, subCategoryId)?.offlineLinks.includes(link.id))
      : scopedLinks;

    if (targetLinks.length === 0) return;

    setCategoryCheckStatus(prev => ({
      ...prev,
      [scopeKey]: {
        checking: true,
        online: 0,
        offline: 0,
        timeout: 0,
        total: targetLinks.length,
        offlineLinks: [],
        resultsByLinkId: {}
      }
    }));

    const resultsByLinkId: Record<string, LinkAvailabilityResult> = {};

    for (let i = 0; i < targetLinks.length; i += CONCURRENT_LIMIT) {
      const chunk = targetLinks.slice(i, i + CONCURRENT_LIMIT);
      const results = await Promise.all(chunk.map(async link => ({
        linkId: link.id,
        result: await checkUrlWithLocalNetwork(link.url)
      })));

      results.forEach(({ linkId, result }) => {
        resultsByLinkId[linkId] = result;
      });

      setCategoryCheckStatus(prev => ({
        ...prev,
        [scopeKey]: buildStatusFromResults(resultsByLinkId, targetLinks.length, true)
      }));
    }

    setCategoryCheckStatus(prev => ({
      ...prev,
      [scopeKey]: buildStatusFromResults(resultsByLinkId, targetLinks.length, false)
    }));
  }, [buildStatusFromResults, getEffectiveCategoryCheckStatus, getLinksForCategoryCheck]);

  return {
    checkingLinkIds,
    checkCategoryAvailability,
    checkLinkAvailability,
    applyLinkAvailabilityResult,
    getEffectiveCategoryCheckStatus,
    getLinkAvailabilityResult
  };
};
