import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

const HEADER_ALLOWLIST = [
  'host',
  'x-forwarded-host',
  'x-forwarded-proto',
  'x-forwarded-for',
  'x-real-ip',
  'cloudfront-viewer-address',
  'cloudfront-is-desktop-viewer',
  'cloudfront-is-mobile-viewer',
  'origin',
  'referer',
  'via',
] as const;

type Props = {
  payload: Record<string, unknown>;
};

export default function RequestInfoDebugPage({ payload }: Props) {
  return (
    <React.Fragment>
      <Head>
        <title>Request info debug</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem' }}>Request info</h1>
        <p style={{ color: '#555', maxWidth: '48rem' }}>
          Server-side snapshot for this request.
        </p>
        <pre
          style={{
            background: '#f4f4f5',
            fontSize: '13px',
            lineHeight: 1.45,
            marginTop: '1rem',
            overflow: 'auto',
            padding: '1rem',
          }}
        >
          {JSON.stringify(payload, null, 2)}
        </pre>
      </main>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { req } = ctx;

  const relevantHeaders: Record<string, string | string[] | null> = {};
  for (const key of HEADER_ALLOWLIST) {
    // Next.js serializes getServerSideProps props as JSON; omit undefined.
    relevantHeaders[key] = req.headers[key] ?? null;
  }

  const payload = {
    relevantHeaders,
    url: req.url ?? null,
  };

  return { props: { payload } };
};
