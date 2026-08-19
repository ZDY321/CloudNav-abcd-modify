type FaviconLookupStatus = 'found' | 'missing' | 'failed';

interface IconCandidateResult {
  status: 'found' | 'missing' | 'failed';
  sourceUrl?: string;
  bytes?: Uint8Array;
  contentType?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const MAX_HTML_BYTES = 256 * 1024;
const MAX_ICON_BYTES = 256 * 1024;
const PAGE_TIMEOUT_MS = 8000;
const ICON_TIMEOUT_MS = 5000;

const jsonResponse = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...corsHeaders,
  },
});

const normalizeTargetUrl = (value: string): URL | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed : null;
  } catch {
    return null;
  }
};

const isPrivateIpv4 = (hostname: string): boolean => {
  const parts = hostname.split('.').map(Number);
  if (parts.length !== 4 || parts.some(part => !Number.isInteger(part) || part < 0 || part > 255)) {
    return false;
  }

  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  );
};

const isAllowedTarget = (target: URL): boolean => {
  const hostname = target.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (!hostname || hostname === 'localhost' || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    return false;
  }
  if (hostname.includes(':')) return false;
  return !isPrivateIpv4(hostname);
};

const readLimitedBytes = async (response: Response, limit: number): Promise<{ bytes: Uint8Array; truncated: boolean }> => {
  if (!response.body) return { bytes: new Uint8Array(), truncated: false };

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  let truncated = false;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      const remaining = limit - total;
      if (value.byteLength > remaining) {
        if (remaining > 0) chunks.push(value.slice(0, remaining));
        total = limit;
        truncated = true;
        break;
      }

      chunks.push(value);
      total += value.byteLength;
    }
  } finally {
    if (truncated) await reader.cancel().catch(() => undefined);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  chunks.forEach(chunk => {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  });
  return { bytes, truncated };
};

const fetchPage = async (target: URL): Promise<{ ok: boolean; finalUrl: URL; html: string }> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PAGE_TIMEOUT_MS);

  try {
    const response = await fetch(target.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CloudNav-Favicon/1.0)',
        'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.1',
      },
    });
    const finalUrl = normalizeTargetUrl(response.url) || target;
    if (!isAllowedTarget(finalUrl)) throw new Error('Redirected to a restricted host');

    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || (!contentType.includes('html') && contentType !== '')) {
      await response.body?.cancel().catch(() => undefined);
      return { ok: false, finalUrl, html: '' };
    }

    const { bytes } = await readLimitedBytes(response, MAX_HTML_BYTES);
    return { ok: true, finalUrl, html: new TextDecoder().decode(bytes) };
  } finally {
    clearTimeout(timeoutId);
  }
};

const parseTagAttributes = (tag: string): Record<string, string> => {
  const attributes: Record<string, string> = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(tag)) !== null) {
    const name = match[1].toLowerCase();
    attributes[name] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return attributes;
};

const findDeclaredIcons = (html: string, pageUrl: URL): string[] => {
  const results: string[] = [];
  const linkPattern = /<link\b[^>]*>/gi;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(html)) !== null) {
    const attributes = parseTagAttributes(match[0]);
    const relTokens = (attributes.rel || '').toLowerCase().split(/\s+/);
    if (!relTokens.some(token => token === 'icon' || token === 'apple-touch-icon')) continue;
    if (!attributes.href || attributes.href.startsWith('data:')) continue;

    try {
      const resolved = new URL(attributes.href, pageUrl);
      if (isAllowedTarget(resolved)) results.push(resolved.toString());
    } catch {
      // Ignore malformed icon references and continue with standard locations.
    }
  }

  return [...new Set(results)];
};

const hasImageSignature = (bytes: Uint8Array, contentType: string): boolean => {
  if (bytes.byteLength === 0) return false;
  if (contentType.toLowerCase().startsWith('image/')) return true;
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return true;
  if (bytes.length >= 4 && bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x01 && bytes[3] === 0x00) return true;
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return true;
  if (bytes.length >= 6 && new TextDecoder().decode(bytes.slice(0, 6)).startsWith('GIF8')) return true;
  return /^\s*<svg\b/i.test(new TextDecoder().decode(bytes.slice(0, 256)));
};

const detectContentType = (bytes: Uint8Array, responseType: string): string => {
  const normalized = responseType.split(';')[0].trim().toLowerCase();
  if (normalized.startsWith('image/')) return normalized;
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50) return 'image/png';
  if (bytes.length >= 4 && bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x01) return 'image/x-icon';
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8) return 'image/jpeg';
  if (/^\s*<svg\b/i.test(new TextDecoder().decode(bytes.slice(0, 256)))) return 'image/svg+xml';
  return 'application/octet-stream';
};

const fetchIconCandidate = async (sourceUrl: string, includeBytes = false): Promise<IconCandidateResult> => {
  const target = normalizeTargetUrl(sourceUrl);
  if (!target || !isAllowedTarget(target)) return { status: 'failed' };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ICON_TIMEOUT_MS);

  try {
    const response = await fetch(target.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CloudNav-Favicon/1.0)',
        'Accept': 'image/avif,image/webp,image/svg+xml,image/*,*/*;q=0.1',
      },
    });

    const finalUrl = normalizeTargetUrl(response.url) || target;
    if (!isAllowedTarget(finalUrl)) return { status: 'failed' };
    if (response.status >= 500) return { status: 'failed' };
    if (!response.ok) return { status: 'missing' };

    const contentLength = Number(response.headers.get('content-length') || 0);
    if (contentLength > MAX_ICON_BYTES) return { status: 'missing' };

    const { bytes, truncated } = await readLimitedBytes(response, MAX_ICON_BYTES + 1);
    if (truncated || bytes.byteLength > MAX_ICON_BYTES) return { status: 'missing' };

    const responseType = response.headers.get('content-type') || '';
    if (!hasImageSignature(bytes, responseType)) return { status: 'missing' };

    return {
      status: 'found',
      sourceUrl: finalUrl.toString(),
      bytes: includeBytes ? bytes : undefined,
      contentType: detectContentType(bytes, responseType),
    };
  } catch {
    return { status: 'failed' };
  } finally {
    clearTimeout(timeoutId);
  }
};

const lookupFavicon = async (target: URL): Promise<{ status: FaviconLookupStatus; icon?: string; message: string }> => {
  let page: { ok: boolean; finalUrl: URL; html: string };
  try {
    page = await fetchPage(target);
  } catch {
    return { status: 'failed', message: '网站页面请求失败' };
  }

  const declaredIcons = page.ok ? findDeclaredIcons(page.html, page.finalUrl) : [];
  const defaultIcons = [
    new URL('/favicon.ico', page.finalUrl).toString(),
    new URL('/favicon.png', page.finalUrl).toString(),
  ];
  const candidates = [...new Set([...declaredIcons, ...defaultIcons])];
  let declaredFailure = false;
  let defaultFailures = 0;

  for (const candidate of candidates) {
    const result = await fetchIconCandidate(candidate);
    if (result.status === 'found' && result.sourceUrl) {
      return {
        status: 'found',
        icon: `/api/favicon?icon=${encodeURIComponent(result.sourceUrl)}&v=${Date.now()}`,
        message: '已获取网站图标',
      };
    }

    const isDeclared = declaredIcons.includes(candidate);
    if (result.status === 'failed' && isDeclared) declaredFailure = true;
    if (result.status === 'failed' && !isDeclared) defaultFailures += 1;
  }

  if (!page.ok || declaredFailure || (declaredIcons.length === 0 && defaultFailures === defaultIcons.length)) {
    return { status: 'failed', message: '网站图标请求失败' };
  }
  return { status: 'missing', message: '网站未提供可用图标' };
};

export const onRequestOptions = async () => new Response(null, {
  status: 204,
  headers: corsHeaders,
});

export const onRequestGet = async (context: { request: Request }) => {
  const requestUrl = new URL(context.request.url);
  const iconSource = requestUrl.searchParams.get('icon');

  if (iconSource) {
    const result = await fetchIconCandidate(iconSource, true);
    if (result.status !== 'found' || !result.bytes || !result.contentType) {
      return new Response(null, { status: result.status === 'missing' ? 404 : 502, headers: corsHeaders });
    }

    return new Response(result.bytes, {
      headers: {
        'Content-Type': result.contentType,
        'Cache-Control': 'public, max-age=604800',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': 'sandbox',
        ...corsHeaders,
      },
    });
  }

  const rawTarget = requestUrl.searchParams.get('url') || '';
  const target = normalizeTargetUrl(rawTarget);
  if (!target) return jsonResponse({ status: 'failed', message: '网址格式无效' }, 400);
  if (!isAllowedTarget(target)) return jsonResponse({ status: 'failed', message: '不允许访问该网址' }, 400);

  const result = await lookupFavicon(target);
  return jsonResponse(result);
};
