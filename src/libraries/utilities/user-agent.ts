/**
 * Client user-agent and platform sniffing. Prefer feature detection when possible;
 * use these helpers ONLY for known browser/OS quirks! All functions are SSR-safe
 * (return false or null when `navigator` is unavailable).
 */

function getUserAgent(): string | undefined {
  if (typeof navigator === 'undefined') return undefined;
  return navigator.userAgent;
}

/**
 * Detects if the current browser is Firefox
 */
export function isFirefox(): boolean {
  const ua = getUserAgent();
  return ua !== undefined && /firefox/i.test(ua);
}

/**
 * Detects if the current browser is Safari
 */
export function isSafari(): boolean {
  const ua = getUserAgent();
  if (!ua) return false;
  return /^((?!chrome|android).)*safari/i.test(ua);
}

/**
 * Gets Safari version from user agent
 * Returns null if not Safari or version cannot be determined
 */
export function getSafariVersion(): number | null {
  if (!isSafari()) return null;
  const ua = getUserAgent();
  if (!ua) return null;
  const match = ua.match(/Version\/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Returns if the current iOS version is 17 or lower
 */
export function isIos17OrLower(): boolean {
  const ua = getUserAgent();
  if (!ua || !/iPhone/.test(ua)) return false;
  // Match "iPhone OS 17_0" or "OS 17_2_1" in iOS UA
  const match = ua.match(/OS (\d+)[_\d]*/);
  const major = match ? parseInt(match[1], 10) : 0;
  return major > 0 && major <= 17;
}
