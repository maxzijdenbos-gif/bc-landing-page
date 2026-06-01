/**
 * Returns the value of a cookie by name, or null if not found or not in the browser.
 * Only safe to call in the browser (document is defined).
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined' || !name) return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts?.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift()?.trim();
    return cookieValue && cookieValue.length > 0 ? cookieValue : null;
  }

  return null;
}
