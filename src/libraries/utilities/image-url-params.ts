/**
 * Options for resizing image URLs that use Amplience-style transform params
 * (e.g. b_white,c_pad,q_80 in a path segment).
 */
export interface ImageUrlDimensionsOptions {
  height?: number;
  quality?: number;
  width?: number;
}

const PARAM_SEPARATOR = '%2C'; // encoded comma
const PARAM_SEPARATOR_DECODED = ',';
const KEY_VALUE_SEP = '_';

/**
 * Parses a decoded params string (e.g. "b_white,c_pad,q_80") into a Map.
 * Each token is "key_value"; the first underscore separates key from value.
 */
function parseParamsString(paramsStr: string): Map<string, string> {
  const map = new Map<string, string>();
  const tokens = paramsStr.split(PARAM_SEPARATOR_DECODED);
  for (const token of tokens) {
    const sepIndex = token.indexOf(KEY_VALUE_SEP);
    if (sepIndex === -1) continue;
    const key = token.slice(0, sepIndex);
    const value = token.slice(sepIndex + 1);
    if (key && value !== undefined) map.set(key, value);
  }
  return map;
}

/**
 * Serializes a Map back to encoded params string (e.g. "b_white%2Cc_pad%2Ch_128%2Cq_80%2Cw_128").
 * Keys in stable order: b, c, h, w, q then rest alphabetically.
 */
function serializeParams(map: Map<string, string>): string {
  const order = ['b', 'c', 'h', 'w', 'q'];
  const seen = new Set<string>();
  const parts: string[] = [];
  const encodeToken = (key: string, value: string) =>
    `${key}${KEY_VALUE_SEP}${encodeURIComponent(value)}`;

  for (const key of order) {
    const value = map.get(key);
    if (value !== undefined) {
      parts.push(encodeToken(key, value));
      seen.add(key);
    }
  }
  const rest = [...map.entries()]
    .filter(([k]) => !seen.has(k))
    .sort(([a], [b]) => a.localeCompare(b));
  for (const [key, value] of rest) {
    parts.push(encodeToken(key, value));
  }
  return parts.join(PARAM_SEPARATOR);
}

/**
 * Finds a path segment in the URL that looks like image transform params
 * (contains encoded commas and key_value style tokens, e.g. b_white%2Cc_pad%2Cq_80).
 */
function findParamsSegment(
  url: string,
): { index: number; segment: string } | null {
  const encodedCommaMatch = url.match(
    /([a-zA-Z0-9_]+%2C(?:[a-zA-Z0-9_]+%2C)*[a-zA-Z0-9_]+)/,
  );
  if (encodedCommaMatch) {
    const segment = encodedCommaMatch[1];
    const index = url.indexOf(segment);
    if (index !== -1) return { index, segment };
  }
  try {
    const decoded = decodeURIComponent(url);
    const segmentMatch = decoded.match(/([a-z]_[^/,]+(?:,[a-z]_[^/,]+)+)/i);
    if (segmentMatch) {
      const segmentDecoded = segmentMatch[1];
      const encoded = segmentDecoded.replace(/,/g, PARAM_SEPARATOR);
      const index = url.indexOf(encoded);
      if (index !== -1) return { index, segment: encoded };
    }
  } catch {
    // decodeURIComponent can throw on malformed URLs
  }
  return null;
}

/**
 * Updates an image URL's dimension/quality params (e.g. Amplience-style b_white,c_pad,q_80).
 * Adds or replaces h (height), w (width), and optionally q (quality).
 * Use for thumbnails (e.g. cart item image 128×128).
 *
 * @param url - Full image URL that may contain a segment like "b_white%2Cc_pad%2Cq_80"
 * @param options - Desired width, height, and optional quality (default 128×128, quality unchanged)
 * @returns Updated URL with h and w set, or original URL if no params segment found
 */
export function imageUrlWithDimensions(
  url: string,
  options: ImageUrlDimensionsOptions = {},
): string {
  const { width = 120, height = 120, quality } = options;
  if (!url || typeof url !== 'string') return url;

  const found = findParamsSegment(url);
  if (!found) return url;

  const { segment, index } = found;
  const decoded = decodeURIComponent(segment);
  const params = parseParamsString(decoded);

  params.set('h', String(height));
  params.set('w', String(width));
  if (quality !== undefined) {
    params.set('q', String(quality));
  }

  const newSegment = serializeParams(params);
  return url.slice(0, index) + newSegment + url.slice(index + segment.length);
}
