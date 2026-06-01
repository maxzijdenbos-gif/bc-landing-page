import type { NextApiRequest, NextApiResponse } from 'next';
import { isSameOrigin } from 'libraries/utilities/is-same-origin';

const UPSTREAM_BASE = process.env.ECOMMERCE_API_URL?.replace(/\/$/, '') ?? '';
const SUBSCRIPTION_KEY = process.env.ECOMMERCE_OCP_APIM_SUBSCRIPTION_KEY;

/**
 * Catch-all API route that proxies E-commerce API requests so the APIM
 * subscription key stays server-side. Matches /api/ecommerce/carts/..., etc.
 * Only accepts requests from the same origin (Origin/Referer check).
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!isSameOrigin(req)) {
    res.status(403).json({
      error: 'Forbidden',
      message: 'E-commerce API proxy can only be used within the website.',
    });
    return;
  }

  if (!UPSTREAM_BASE || !SUBSCRIPTION_KEY) {
    res.status(500).json({
      error:
        'E-commerce API proxy not configured (ECOMMERCE_API_URL / ECOMMERCE_OCP_APIM_SUBSCRIPTION_KEY)',
    });
    return;
  }

  const pathSegments = req.query.path;
  const pathPart = Array.isArray(pathSegments)
    ? pathSegments.join('/')
    : typeof pathSegments === 'string'
      ? pathSegments
      : '';

  const query = { ...req.query };
  delete query.path;
  const queryString = new URLSearchParams(
    query as Record<string, string>,
  ).toString();
  const upstreamUrl = `${UPSTREAM_BASE}/${pathPart}${queryString ? `?${queryString}` : ''}`;

  const headers: Record<string, string> = {
    'Content-Type': req.headers['content-type'] ?? 'application/json',
    'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
  };

  try {
    const response = await fetch(upstreamUrl, {
      body:
        req.method !== 'GET' && req.method !== 'HEAD'
          ? JSON.stringify(req.body ?? {})
          : undefined,
      headers,
      method: req.method,
    });

    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    res.status(response.status);

    const text = await response.text();
    if (text) {
      try {
        res.send(JSON.parse(text));
      } catch {
        res.send(text);
      }
    } else {
      res.end();
    }
  } catch (error) {
    res.status(502).json({
      error: 'E-commerce API request failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
