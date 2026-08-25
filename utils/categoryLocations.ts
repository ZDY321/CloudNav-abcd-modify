import { AdditionalCategoryLocation, Category, LinkItem } from '../types';

const locationKey = (location: AdditionalCategoryLocation) =>
  `${location.categoryId}::${location.subCategoryId || ''}`;

export const getAdditionalCategoryLocations = (link: Pick<LinkItem, 'additionalCategoryLocations' | 'additionalCategoryIds'>): AdditionalCategoryLocation[] => {
  if (Array.isArray(link.additionalCategoryLocations)) {
    return link.additionalCategoryLocations;
  }
  return Array.isArray(link.additionalCategoryIds)
    ? link.additionalCategoryIds.map(categoryId => ({ categoryId }))
    : [];
};

export const normalizeAdditionalCategoryLocations = (
  rawLocations: unknown,
  categories: Category[],
  primaryCategoryId: string
): AdditionalCategoryLocation[] => {
  const validCategories = new Map(categories.map(category => [category.id, category]));
  const locations = Array.isArray(rawLocations) ? rawLocations : [];
  const seen = new Set<string>();

  return locations.reduce<AdditionalCategoryLocation[]>((result, raw) => {
    if (!raw || typeof raw !== 'object') return result;
    const categoryId = typeof (raw as any).categoryId === 'string' ? (raw as any).categoryId : '';
    const subCategoryId = typeof (raw as any).subCategoryId === 'string' && (raw as any).subCategoryId
      ? (raw as any).subCategoryId
      : undefined;
    const category = validCategories.get(categoryId);
    if (!category || categoryId === primaryCategoryId) return result;
    if (subCategoryId && !(category.subcategories || []).some(sub => sub.id === subCategoryId)) return result;

    const normalized = { categoryId, ...(subCategoryId ? { subCategoryId } : {}) };
    const key = locationKey(normalized);
    if (seen.has(key)) return result;
    seen.add(key);
    result.push(normalized);
    return result;
  }, []);
};

export const normalizeLinkCategoryLocations = (link: LinkItem, categories: Category[]): LinkItem => {
  const validCategoryIds = new Set(categories.map(category => category.id));
  const primaryCategoryId = validCategoryIds.has(link.categoryId) ? link.categoryId : (categories[0]?.id || 'common');
  const primaryCategory = categories.find(category => category.id === primaryCategoryId);
  const primarySubCategoryId = link.subCategoryId && primaryCategory?.subcategories?.some(sub => sub.id === link.subCategoryId)
    ? link.subCategoryId
    : undefined;
  const rawLocations = Array.isArray(link.additionalCategoryLocations)
    ? link.additionalCategoryLocations
    : (link.additionalCategoryIds || []).map(categoryId => ({ categoryId }));
  const additionalCategoryLocations = normalizeAdditionalCategoryLocations(rawLocations, categories, primaryCategoryId);
  const additionalCategoryIds = Array.from(new Set(additionalCategoryLocations.map(location => location.categoryId)));

  return {
    ...link,
    categoryId: primaryCategoryId,
    subCategoryId: primarySubCategoryId,
    additionalCategoryLocations: additionalCategoryLocations.length > 0 ? additionalCategoryLocations : undefined,
    additionalCategoryIds: additionalCategoryIds.length > 0 ? additionalCategoryIds : undefined,
  };
};

export const removeCategoryLocations = (
  links: LinkItem[],
  removedCategoryIds: Set<string>,
  removedSubCategoryIdsByCategory: Map<string, Set<string>> = new Map()
): LinkItem[] => links.map(link => {
  const primarySubRemoved = link.subCategoryId && removedSubCategoryIdsByCategory.get(link.categoryId)?.has(link.subCategoryId);
  const locations = getAdditionalCategoryLocations(link).filter(location => (
    !removedCategoryIds.has(location.categoryId) &&
    !(location.subCategoryId && removedSubCategoryIdsByCategory.get(location.categoryId)?.has(location.subCategoryId))
  ));
  const additionalCategoryIds = Array.from(new Set(locations.map(location => location.categoryId)));
  return {
    ...link,
    subCategoryId: primarySubRemoved ? undefined : link.subCategoryId,
    additionalCategoryLocations: locations.length > 0 ? locations : undefined,
    additionalCategoryIds: additionalCategoryIds.length > 0 ? additionalCategoryIds : undefined,
  };
});

export const getCategoryLocationKey = locationKey;
