import { SiteSettings } from '../types';

export const SITE_SETTINGS_STORAGE_KEY = 'cloudnav_site_settings';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  title: 'CloudNav - 我的导航',
  navTitle: 'CloudNav',
  pinnedCategoryIcon: 'LayoutGrid',
  favicon: '/favicon.png',
  cardStyle: 'detailed',
  passwordExpiryDays: 7
};

const isCardStyle = (value: unknown): value is SiteSettings['cardStyle'] => (
  value === 'detailed' || value === 'simple'
);

const normalizePasswordExpiryDays = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : DEFAULT_SITE_SETTINGS.passwordExpiryDays;
};

export const normalizeSiteSettings = (source?: Partial<SiteSettings> | null): SiteSettings => ({
  ...DEFAULT_SITE_SETTINGS,
  title: typeof source?.title === 'string' && source.title.trim() ? source.title : DEFAULT_SITE_SETTINGS.title,
  navTitle: typeof source?.navTitle === 'string' && source.navTitle.trim() ? source.navTitle : DEFAULT_SITE_SETTINGS.navTitle,
  pinnedCategoryIcon: typeof source?.pinnedCategoryIcon === 'string' && source.pinnedCategoryIcon.trim()
    ? source.pinnedCategoryIcon
    : DEFAULT_SITE_SETTINGS.pinnedCategoryIcon,
  favicon: typeof source?.favicon === 'string' && source.favicon.trim() ? source.favicon : DEFAULT_SITE_SETTINGS.favicon,
  cardStyle: isCardStyle(source?.cardStyle) ? source.cardStyle : DEFAULT_SITE_SETTINGS.cardStyle,
  passwordExpiryDays: normalizePasswordExpiryDays(source?.passwordExpiryDays)
});

export const mergeSiteSettings = (
  current: SiteSettings,
  incoming?: Partial<SiteSettings> | null
): SiteSettings => normalizeSiteSettings({
  ...current,
  ...incoming
});
