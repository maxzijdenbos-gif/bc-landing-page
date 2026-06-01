import path from 'path';
import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const config: NextConfig = {
  basePath: isGithubPages
    ? '/bc-landing-page'
    : process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH
      ? `/${process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH}`
      : '',
  trailingSlash: isGithubPages,
  devIndicators: false,
  async headers() {
    return [
      {
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "base-uri 'none';child-src 'none';connect-src 'self' https://*.bigcontent.io https://*.staging.bigcontent.io https://cdn.media.amplience.net;default-src 'self';font-src 'self';form-action 'self';frame-ancestors 'none';frame-src 'none';img-src 'self';manifest-src 'self';media-src 'self' https://*.bigcontent.io https://*.staging.bigcontent.io https://cdn.media.amplience.net;object-src 'none';script-src 'self';style-src 'self' 'unsafe-inline';worker-src 'self';",
          },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
        source: '/((?!amplience)[^\\.]+)$',
      },
      {
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
        source: '/amplience/extensions/:path*',
      },
    ];
  },
  images: {
    unoptimized: isGithubPages,
    qualities: [80],
    remotePatterns: [
      { hostname: 'localhost' },
      { hostname: 'cdn.media.amplience.net', protocol: 'https' },
      { hostname: 'images2.giant-bicycles.com', protocol: 'https' },
      ...(process.env.NEXT_PUBLIC_AMPLIENCE_VISUALISATION_DOMAIN
        ? [
            {
              hostname: process.env.NEXT_PUBLIC_AMPLIENCE_VISUALISATION_DOMAIN,
              protocol: 'https' as const,
            },
          ]
        : []),
      { hostname: '**.bigcontent.io', protocol: 'http' },
      { hostname: '**.bigcontent.io', protocol: 'https' },
      { hostname: 'embed-ssl.wistia.com', protocol: 'https' },
    ],
  },
  output: isGithubPages ? 'export' : 'standalone',
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    };

    config.module.rules.push({
      issuer: /\.[jt]sx?$/, // Applies only to JS/TS files
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });

    return config;
  },
};

export default config;
