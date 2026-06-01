const STORAGE_KEY = 'search_recent_keywords';

export const MAX_RECENT_SEARCH_KEYWORDS = 4;

export function getRecentSearchKeywords(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (entry): entry is string =>
          typeof entry === 'string' && entry.trim().length > 0,
      )
      .slice(0, MAX_RECENT_SEARCH_KEYWORDS);
  } catch {
    return [];
  }
}

export function recordRecentSearchKeyword(keyword: string): void {
  if (typeof window === 'undefined') return;
  const trimmed = keyword.trim();
  if (!trimmed) return;

  const existing = getRecentSearchKeywords();
  const lower = trimmed.toLowerCase();
  const withoutDup = existing.filter((k) => k.trim().toLowerCase() !== lower);
  const next = [trimmed, ...withoutDup].slice(0, MAX_RECENT_SEARCH_KEYWORDS);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore quota / private mode
  }
}
