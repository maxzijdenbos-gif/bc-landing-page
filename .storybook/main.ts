import type { StorybookConfig } from '@storybook/nextjs-vite';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'path';
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-docs',
    'storybook-addon-pseudo-states',
    '@storybook/addon-vitest',
    '@storybook/addon-mcp',
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    defaultName: 'Documentation',
  },
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      image: {
        // Exclude SVG files from being handled by vite-plugin-storybook-nextjs in order to use svgr instead.
        excludeFiles: ['**/*.svg'],
      },
    },
  },

  staticDirs: ['../src/mocks', '../public'],

  stories: [
    { directory: '../src/components/tokens', titlePrefix: '1. Tokens' },
    { directory: '../src/components/motions', titlePrefix: '2. Motions' },
    { directory: '../src/components/atoms', titlePrefix: '3. Atoms' },
    { directory: '../src/components/molecules', titlePrefix: '4. Molecules' },
    { directory: '../src/components/organisms', titlePrefix: '5. Organisms' },
    { directory: '../src/components/templates', titlePrefix: '6. Templates' },
    { directory: '../src/components/utilities', titlePrefix: '7. Utilities' },
  ],

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      exclude: ['**/*.stubs.ts'],
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },

  viteFinal: async (config) => {
    const srcRoot = path.resolve(__dirname, '../src');

    config.css ??= {};
    config.css.preprocessorOptions ??= {};
    config.css.preprocessorOptions.scss = {
      ...config.css.preprocessorOptions.scss,
      loadPaths: [
        ...(config.css.preprocessorOptions.scss?.loadPaths ?? []),
        srcRoot,
      ],
    };

    config.plugins = [
      ...(config.plugins ?? []),
      svgr({
        include: '**/*.svg',
        svgrOptions: {
          icon: true,
        },
      }),
    ];

    return config;
  },
};

export default config;
