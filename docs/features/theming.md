# Theming

Easily theme the design with CSS variables for colors, fonts, etc.

## How to use

Set the `NEXT_PUBLIC_THEME_NAME` variable to the desired theme.

## Features

### Colors

Colors can be overwritten for a specific theme by adding the color name to the
theme file.

### Fonts

Fonts can be overwritten for a specific theme by adding the font name to the
theme file.

### Others

Other CSS variables can be added to the theme files to add even more flexibility
between themes.

## File Structure

The files that need to be adjusted if making any changes.

```txt title="/"
├── .storybook/
│   └── .preview.tsx
│
└── src/
    ├── components/
    │   └── utilities/
    │       └── module-preview/
    │           └── module-preview.module.scss
    │
    ├── mocks/
    │   └── data/
    │       └── endpoints/
    │           ├── layout/
    │           │   └── [theme-name]/
    │           │
    │           └── page/
    │               └── [theme-name]/
    │
    ├── styles/
    │   ├── themes/
    │   │   ├── root.scss
    │   │   └── [theme-name].scss
    │   │
    │   └── _app.scss
    │
    └── types/
        └── global.d.ts
```
