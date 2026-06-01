# Localization

Localization is a feature that allows you to change the language of the website.

## How to use

Using the [next-localization](https://github.com/StarpTech/next-localization)
package, you can easily add localization to your website.

## Features

### Storybook integration

The `I18nProvider` from the `next-localization` package works perfectly with
Storybook and its `locale` globalType.

## File Structure

The files that need to be adjusted if making any changes.

```txt title="/"
├── .storybook/
│   └── .preview.tsx
│
├── src/
│   ├── mocks/
│   │   └── data/
│   │       └── endpoints/
│   │           ├── dictionary/
│   │           │   └── [locale-name].ts
│   │           │
│   │           ├── error/
│   │           │   └── [locale-name].ts
│   │           │
│   │           ├── layout/
│   │           │   └── [theme-name]/
│   │           │       └── [locale-name].ts
│   │           │
│   │           └── page/
│   │               └── [theme-name]/
│   │                   └── [locale-name].ts
│   │
│   └── types/
│       └── global.d.ts
│
└── next.config.js
```
