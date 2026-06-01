import { NextRequest, NextResponse } from 'next/server';
import { AMPLIENCE_ACCESS_TOKEN_NAME } from 'integrations/content/amplience/types/amplience-setting-types';
import {
  ALLOWED_LOCALES,
  FALLBACK_LOCALE,
  isAllowedLocale,
  isSupportedLocale,
  normalizeLocale,
} from 'libraries/getters/locale-config';

class AuthError extends Error {
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
  }
}

const validateEnvVariables = () => {
  const required = [
    'ACCESS_RESTRICTED_LOCALE_USERNAME_HASH',
    'ACCESS_RESTRICTED_LOCALE_PASSWORD_HASH',
  ];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    console.error(`Missing required env variables: ${missing.join(', ')}`);
    throw new AuthError(
      'Server configuration error - missing authentication setup',
      500,
    );
  }

  return true;
};

const localeIsRestricted = (currentLocale: string) =>
  !isAllowedLocale(currentLocale);

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));

  return hashBase64;
}

// Locale pattern: 2-letter language code, optionally followed by dash and 2-letter country code
const LOCALE_PATTERN = /^[a-z]{2}(-[a-z]{2})?$/i;

const isLocaleSegment = (segment: string): boolean => {
  return LOCALE_PATTERN.test(segment);
};

const getBasePathSegment = () => process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH;

const getPathSegments = (pathname: string) =>
  pathname.split('/').filter(Boolean);

const getRouteSegments = (pathSegments: string[]) => {
  const configuredBasePath = getBasePathSegment();

  if (configuredBasePath && pathSegments[0] === configuredBasePath) {
    return pathSegments.slice(1);
  }

  return pathSegments;
};

const getLocaleHomepagePath = (locale: string) => {
  const basePath = getBasePathSegment();

  return `${basePath ? `/${basePath}` : ''}/${locale}`;
};

export default async function proxy(req: NextRequest) {
  // Check for multiple consecutive locales in pathname and redirect to single locale
  // e.g., /discover/en-us/en-ca/de-de/page -> /discover/en-us/page
  const pathSegments = getPathSegments(req.nextUrl.pathname);
  const configuredBasePath = getBasePathSegment(); // e.g., 'discover'

  // Find where the locale segments start (after basePath if present)
  let localeStartIndex = 0;

  if (configuredBasePath && pathSegments[0] === configuredBasePath) {
    localeStartIndex = 1; // Skip basePath segment
  }

  // Check if we have at least one locale segment
  if (
    pathSegments.length > localeStartIndex &&
    isLocaleSegment(pathSegments[localeStartIndex])
  ) {
    const firstLocale = pathSegments[localeStartIndex];
    let nextIndex = localeStartIndex + 1;

    // Count how many consecutive locale segments follow the first one
    while (
      nextIndex < pathSegments.length &&
      isLocaleSegment(pathSegments[nextIndex])
    ) {
      nextIndex++;
    }

    // If we found more than one consecutive locale, we need to redirect
    const localeCount = nextIndex - localeStartIndex;

    if (localeCount > 1) {
      // Keep only the first locale, remove all others
      const beforeLocales = pathSegments.slice(0, localeStartIndex);
      const afterLocales = pathSegments.slice(nextIndex);
      const correctedSegments = [
        ...beforeLocales,
        firstLocale,
        ...afterLocales,
      ];
      const correctedPath = `/${correctedSegments.join('/')}`;

      return NextResponse.redirect(
        new URL(`${correctedPath}${req.nextUrl.search}`, req.url),
        301,
      );
    }
  }

  const routeSegments = getRouteSegments(pathSegments);
  const localeSegment = normalizeLocale(routeSegments[0]);

  // Root path should redirect to cookie locale if valid, otherwise fallback.
  if (routeSegments.length === 0) {
    const localeFromCookie = normalizeLocale(
      req.cookies.get('NEXT_LOCALE')?.value,
    );
    const destinationLocale = isSupportedLocale(localeFromCookie)
      ? localeFromCookie
      : FALLBACK_LOCALE;

    return NextResponse.redirect(
      new URL(
        `${getLocaleHomepagePath(destinationLocale)}${req.nextUrl.search}`,
        req.url,
      ),
    );
  }

  // Unknown locale (not in NEXT_PUBLIC_AVAILABLE_COUNTRIES): redirect to fallback.
  // Locales in AVAILABLE but not in ALLOWED must reach the Basic Auth check below.
  if (routeSegments[0] && isLocaleSegment(routeSegments[0])) {
    if (!isSupportedLocale(localeSegment)) {
      return NextResponse.redirect(
        new URL(
          `${getLocaleHomepagePath(FALLBACK_LOCALE)}${req.nextUrl.search}`,
          req.url,
        ),
      );
    }
  }

  // All amplience API/normal routes most deliver a token to access
  // This prevents access from outside of Amplience
  if (
    req.nextUrl.pathname.includes('/api/amplience/') ||
    req.nextUrl.pathname.includes('/amplience/dashboard') ||
    req.nextUrl.pathname.includes('/amplience/extensions')
  ) {
    const suppliedToken = req.nextUrl.searchParams.get(
      AMPLIENCE_ACCESS_TOKEN_NAME,
    );
    const validToken = process.env.AMPLIENCE_NEXT_API_ROUTE_KEY;

    if (suppliedToken !== validToken) {
      return NextResponse.json(
        { message: 'No access', status: 'error' },
        { status: 403 },
      );
    }
  }

  if (
    ALLOWED_LOCALES.length > 0 &&
    routeSegments[0] &&
    isLocaleSegment(routeSegments[0])
  ) {
    if (localeIsRestricted(localeSegment)) {
      try {
        validateEnvVariables();

        const authHeader = req.headers.get('authorization');

        if (!authHeader?.startsWith('Basic ')) {
          throw new AuthError('Authentication required', 401);
        }

        const credentials = Buffer.from(
          authHeader.slice(6),
          'base64',
        ).toString();
        const [username, password] = credentials.split(':');

        // Get stored hashes
        const storedUsernameHash =
          process.env.ACCESS_RESTRICTED_LOCALE_USERNAME_HASH;
        const storedPasswordHash =
          process.env.ACCESS_RESTRICTED_LOCALE_PASSWORD_HASH;

        // Hash the provided credentials
        const usernameHash = await hashString(username);
        const passwordHash = await hashString(password);

        // Compare the hashes
        if (
          usernameHash !== storedUsernameHash ||
          passwordHash !== storedPasswordHash
        ) {
          throw new AuthError('Invalid credentials', 401);
        }

        return NextResponse.next();
      } catch (error: any) {
        const status = error instanceof AuthError ? error.status : 500;
        const message =
          error instanceof AuthError
            ? error.message
            : 'Server configuration error';

        return new NextResponse(null, {
          headers: {
            state: message,
            'WWW-Authenticate': 'Basic realm="Protected Area"',
          },
          status,
        });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|media|_next/static|_next/image|images|favicon.ico).*)',
    '/',
  ],
};
