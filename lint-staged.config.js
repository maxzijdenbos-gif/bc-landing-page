/** @type {import('lint-staged').Configuration} */
const config = {
  '*': 'prettier --write --ignore-unknown',
  '*.(css|scss)': 'stylelint --fix --max-warnings=0',
  '*.(js|cjs|mjs|jsx|ts|tsx)': [
    'eslint --fix --max-warnings=0 --no-warn-ignored',
    // 'vitest related --run', // TODO: temporarily disabled due to issue with vite-tsconfig-paths and esm vs cjs imports
  ],
  '*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};

export default config;
