export const readLocalStorageJson = <T>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    return JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
};

export const readLocalStorageNumber = (key: string): number | null => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return null;
    const parsed = Number(saved);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
};
