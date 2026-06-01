import { TokenPayload } from './types';

function base64UrlEncode(buffer: Buffer | Uint8Array): string {
  return Buffer.from(buffer)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): Buffer {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';

  return Buffer.from(str, 'base64');
}

export async function encodeToken(
  tokenObject: TokenPayload,
  secretA: string,
  secretB: string,
): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerEncoded = base64UrlEncode(Buffer.from(JSON.stringify(header)));
  const payloadEncoded = base64UrlEncode(
    Buffer.from(JSON.stringify(tokenObject)),
  );

  const dataToSign = `${headerEncoded}.${payloadEncoded}`;
  const key = await crypto.subtle.importKey(
    'raw',
    Buffer.from(secretA + secretB),
    { hash: 'SHA-256', name: 'HMAC' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    Buffer.from(dataToSign),
  );
  const signatureEncoded = base64UrlEncode(Buffer.from(signature));

  return `${dataToSign}.${signatureEncoded}`;
}

export async function decodeToken(
  tokenString: string,
  secretA: string,
  secretB: string,
): Promise<TokenPayload | null> {
  const parts = tokenString.split('.');

  if (parts.length !== 3) return null;

  const [headerEncoded, payloadEncoded, signatureEncoded] = parts;
  const dataToVerify = `${headerEncoded}.${payloadEncoded}`;
  const signature = base64UrlDecode(signatureEncoded);

  const key = await crypto.subtle.importKey(
    'raw',
    Buffer.from(secretA + secretB),
    { hash: 'SHA-256', name: 'HMAC' },
    false,
    ['verify'],
  );

  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    // @ts-expect-error - TODO: need to figure out correct type
    signature,
    Buffer.from(dataToVerify),
  );

  if (!isValid) return null;

  try {
    const payloadJson = base64UrlDecode(payloadEncoded).toString();
    const payload = JSON.parse(payloadJson) as TokenPayload;

    if (
      !payload.tokenExpiry ||
      new Date(payload.tokenExpiry).getTime() < Date.now()
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
