import { getContentDeliveryKey } from 'integrations/content/amplience/endpoints/get-content/get-content-delivery-key';
import {
  decodeToken,
  encodeToken,
} from 'integrations/content/amplience/preview/crypto';
import { handleVisualizationRedirect } from 'integrations/content/amplience/preview/iframeMode';
import { handlePreviewRedirect } from 'integrations/content/amplience/preview/popoutMode';
import {
  GlobalSettingsResponse,
  RequestHandler,
  TokenPayload,
} from 'integrations/content/amplience/preview/types';

// Configs
const GLOBAL_SETTINGS_SLUG =
  process.env.ACCESS_AMPLIENCE_CONFIG_DELIVERY_KEY || 'globalsettings';
const AMPLIENCE_SECRET = process.env.ACCESS_AMPLIENCE_SECRET_KEY_AMPLIENCE;
const INTERNAL_SECRET = process.env.ACCESS_AMPLIENCE_SECRET_KEY_INTERNAL;
const DEFAULT_SESSION_EXPIRY_HOURS = 5 / 60; // Session cookie duration (e.g. 5 min)
const DEFAULT_TOKEN_EXPIRY_HOURS = 1; // Token security expiry (e.g. 24 hours)

/**
 * Safely fetch token lifetime (from settings), fallback to default token expiry.
 */
async function getTokenLifetimeMs(): Promise<number> {
  try {
    const globalSettings = await getContentDeliveryKey<GlobalSettingsResponse>({
      slug: GLOBAL_SETTINGS_SLUG || '',
    });

    const previewTime = globalSettings?.previewTime;

    if (typeof previewTime === 'number' && previewTime > 0) {
      return previewTime * 60 * 60 * 1000; // Assuming CMS sends hours
    }

    console.warn(
      'Invalid or missing previewTime in settings, using default token expiry.',
    );
  } catch (error) {
    console.error(
      'Error fetching globalSettings, using default token expiry.',
      error,
    );
  }

  return DEFAULT_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000;
}

/**
 * Preflight handler to create or validate token and set preview data.
 */
const handlePreflight: RequestHandler = async (req, res) => {
  if (!GLOBAL_SETTINGS_SLUG || !AMPLIENCE_SECRET || !INTERNAL_SECRET) {
    return res.status(500).send('Error: Server misconfigured.');
  }

  if (!req.query?.action) {
    res.status(400).send('Error: No action specified.');

    return;
  }

  if (req.query.action?.toString() === 'stop') {
    res.clearPreviewData();

    return;
  }

  if (req.query.action?.toString() !== 'renew') {
    res.status(400).send('Error: No valid action specified.');

    return;
  }

  let encodedToken = req.query.token?.toString() || null;
  let decodedToken: TokenPayload | null = null;

  if (encodedToken) {
    decodedToken = await decodeToken(
      encodedToken,
      AMPLIENCE_SECRET,
      INTERNAL_SECRET,
    );
  }

  if (!encodedToken && !decodedToken) {
    const { id, vse, secret } = req.query;

    if (!id || !vse || !secret) {
      return res.status(400).send('Error: Missing required parameters.');
    }

    if (secret !== AMPLIENCE_SECRET && secret !== INTERNAL_SECRET) {
      return res.status(403).send('Error: Invalid secret.');
    }

    // Use configured or fallback token lifetime for the token itself (security enforcement)
    const tokenLifetimeMs = await getTokenLifetimeMs();
    const tokenExpiry = new Date(Date.now() + tokenLifetimeMs);

    // Create token with its security lifetime
    const tokenPayload: TokenPayload = {
      entryId: id.toString(),
      sessionDuration: DEFAULT_SESSION_EXPIRY_HOURS * 60 * 60, // Always fixed short session (seconds)
      stagingEnvironment: vse.toString(),
      tokenExpiry: tokenExpiry,
    };

    encodedToken = await encodeToken(
      tokenPayload,
      AMPLIENCE_SECRET,
      INTERNAL_SECRET,
    );
    decodedToken = tokenPayload;
  }

  if (!decodedToken) {
    return res.status(400).send('Error: Invalid or expired token.');
  }

  const now = new Date();

  res.setHeader(
    'Set-Cookie',
    `previewToken=${encodeURIComponent(
      encodedToken || '',
    )}; Path=/; Secure; SameSite=Lax`,
  );

  let timestamp: string | undefined;

  if (req.query.timestamp?.toString() === 'null') {
    timestamp = now.toISOString();
  } else if (req.query.timestamp) {
    timestamp = new Date(
      parseInt(req.query.timestamp.toString()),
    ).toISOString();
  } else {
    timestamp = undefined;
  }

  res.setPreviewData(
    {
      displayIndicator: req.headers['sec-fetch-dest'] !== 'iframe',
      previewSessionDurationSeconds: DEFAULT_SESSION_EXPIRY_HOURS * 60 * 60,
      previewSessionIssuedAt: now.toISOString(),
      stagingEnvironment: decodedToken.stagingEnvironment,
      timestamp,
      tokenExpiresAt: new Date(decodedToken.tokenExpiry).toISOString(),
    },
    {
      maxAge: DEFAULT_SESSION_EXPIRY_HOURS * 60 * 60,
    },
  );
};

/**
 * Main handler entry point.
 */
const handler: RequestHandler = async (req, res) => {
  // This function handles setting or unsetting preview mode including security measures.

  await handlePreflight(req, res);

  if (res.writableEnded) return;

  if (req.headers['sec-fetch-dest'] === 'iframe') {
    return handleVisualizationRedirect(req, res);
  }

  return handlePreviewRedirect(req, res);
};

export default handler;
