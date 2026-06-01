import { getSafariVersion } from 'libraries/utilities/user-agent';

/**
 * Fixes image URL for Safari browsers
 * - Safari 17+: Uses auto=compress&fm=webp
 * - Older Safari: Uses fm=jpg
 * - Non-Safari: Returns URL unchanged (lets Next.js handle optimization)
 */
export function fixSafariImage(url: string): string {
  const safariVersion = getSafariVersion();

  // Not Safari - let Next.js Image handle optimization
  if (safariVersion === null) return url;

  // Safari 14+ - use WebP with auto compression
  if (safariVersion >= 17) {
    // Remove existing fmt parameter if present
    const urlWithoutFmt = url.replace(/[?&]fmt=\w+/g, '');
    // Remove existing auto parameter if present
    const urlWithoutAuto = urlWithoutFmt.replace(/[?&]auto=\w+/g, '');
    return `${urlWithoutAuto}${urlWithoutAuto.includes('?') ? '&' : '?'}auto=compress&fm=webp`;
  }

  // Older Safari - use JPEG
  // Remove existing fmt parameter if present
  const urlWithoutFmt = url.replace(/[?&]fmt=\w+/g, '');
  return `${urlWithoutFmt}${urlWithoutFmt.includes('?') ? '&' : '?'}fmt=jpg`;
}
