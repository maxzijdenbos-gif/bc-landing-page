# Vitest and Storybook tests

[Vitest](https://vitest.dev/) is the test runner. The repo uses two Vitest
**projects** in a single [`vitest.config.ts`](../../../vitest.config.ts) at the
repository root:

1. **Unit** — Node environment, `*.test.ts` / `*.test.tsx` under `src/`.
2. **Storybook** —
   [`@storybook/addon-vitest`](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)
   with **browser** mode (Playwright Chromium), running interaction tests from
   stories (for example `play` functions on stories).

Supporting pieces include
[`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/),
[`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom)
matchers, and [`vitest.shims.d.ts`](../../../vitest.shims.d.ts) for browser test
types.

## How to run

| Command                        | Purpose                                                                  |
| ------------------------------ | ------------------------------------------------------------------------ |
| `npm run test`                 | Run all Vitest projects once (unit + Storybook).                         |
| `npm run test:watch`           | Watch mode for all projects.                                             |
| `npm run test:coverage`        | All projects with [V8 coverage](https://vitest.dev/guide/coverage.html). |
| `npm run test:ci`              | Unit project with coverage (used in Azure Pipelines; emits Cobertura).   |
| `npm run test-storybook`       | Only the Storybook project (`vitest run --project=storybook`).           |
| `npm run test-storybook:watch` | Watch mode for the Storybook project only.                               |

The Storybook project is wired to start Storybook via
`npm run storybook -- --no-open` when needed (see `storybookTest` in
`vitest.config.ts`). For day-to-day UI work you can still run
`npm run storybook` separately on port 6006.

## Features

### Unit tests

Vitest runs files matching `src/**/*.test.ts` and `src/**/*.test.tsx` in a
**node** environment. Use these for pure logic, hooks, and components without
needing a real browser.

### Storybook / component tests

Stories live next to components as `*.stories.tsx`. Interaction tests use
Storybook’s **`play`** function (and related APIs) so scenarios stay colocated
with the component docs. Those run under the **storybook** Vitest project in a
headless Chromium instance.

Addons registered in [`.storybook/main.ts`](../../../.storybook/main.ts) include
`@storybook/addon-vitest` and `storybook-addon-test-codegen` for test authoring
support.

### Mocking

Vitest provides [`vi.mock`](https://vitest.dev/api/vi.html#vi-mock), spies, and
timers compatible with the Jest-style API many teams already know.

### Coverage

`npm run test:coverage` uses `@vitest/coverage-v8` to report how much of the
codebase is exercised by tests.

`npm run test:ci` (Azure Pipelines) enforces minimum thresholds in
`vitest.config.ts`

## File structure

```txt title="/"
├── vitest.config.ts
├── vitest.shims.d.ts
├── .storybook/
│   └── main.ts          # @storybook/addon-vitest, framework, stories globs
├── src/
│   └── components/
│       └── [level-name]/
│           └── [component-name]/
│               ├── [component-name].stories.tsx   # stories + play tests
│               └── [component-name].test.tsx      # optional unit tests
```
