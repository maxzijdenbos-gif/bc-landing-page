# Storybook

[Link to official documentation](https://storybook.js.org)

Storybook is a tool for developing UI components in isolation. It makes building
stunning UIs organized and efficient.

## How to use

Run the `npm run storybook` command.

This will start the Storybook server on `http://localhost:6006` and open the
browser.

## Features

### Decorators

Decorators are a powerful way to wrap stories with extra code. They are used for
adding global styles, contexts, and more.

### Add-ons

Add-ons are a powerful way to customize Storybook's UI and behavior. Storybook
comes with a lot of official add-ons, such as the Actions and Controls.

It also has a lot of community add-ons, such as the Accessibility add-on.

### Global Types

Global Types are used for configuring the global parameters of the story.

**Color:** The `color` globalType is used for changing the context and related
colors of the story. This replaces the `backgrounds` add-on which has been
disabled in favor of this, since it didn't support proper context awareness.

**Locale:** The `locale` globalType is used for changing the language of the
story. This is used in combination with the `next-localization` package.

**Theme:** The `themeName` globalType is used for changing the theme of the
story.

### Parameters

Parameters are used for configuring the stories.

**Viewports:** The `viewports` parameter is used for configuring the viewports
of the story. The setup comes with four predefined viewports: `mobile`,
`tablet`, `laptop` and `desktop`, which should be aligned with the design.

## File Structure

```txt title="/"
├── .storybook/
│   ├── decorators.tsx
│   └── main.ts
│   └── manager.ts
│   └── preview-head.html
│   └── preview.tsx
│
└── src/
    └── components/
        └── [level-name]/
            └── [component-name]/
                └── [component-name].stories.tsx
```
