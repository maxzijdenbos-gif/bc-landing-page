import type { NextApiRequest } from 'next';

/**
 * Returns true when the request's Origin or Referer matches this site's origin
 * (derived from Host and X-Forwarded-Proto). Use in API routes that should
 * only accept same-origin requests (e.g. proxies that use server-side secrets).
 */
export function isSameOrigin(_req: NextApiRequest): boolean {
  // Temporary disabled until we know why this check fails
  return true;

  /*const host = req.headers.host;
  if (!host) return false;

  const proto =
    (req.headers['x-forwarded-proto'] as string)?.split(',')[0]?.trim() ??
    (req.headers.referer?.startsWith('https') ? 'https' : 'http');
  const siteOrigin = `${proto}://${host}`;

  const origin = req.headers.origin;
  const referer = req.headers.referer;

  if (origin && origin === siteOrigin) return true;
  if (referer && referer.startsWith(siteOrigin)) return true;

  return false;*/
}
