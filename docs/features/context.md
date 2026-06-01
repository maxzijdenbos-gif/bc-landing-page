# Context

Context is a utility that allows you to set a context for a component. This
context can be used to change the appearance of the component.

## How to use

You can use the context utility in two ways. The first way is to use the
`context` mixin. This mixin will set the context for the component. The second
way is to use the `context-wrapper` mixin. This mixin will wrap the component in
a context. This is useful if you want to set a context for a component that is
not a direct child of the component.

## Features

### Context Wrapping

Context wrapping is a way to set a context for a component related to a data
attribute on a parent element. By default the context wrapper will look for a
data attribute called `data-color`. This can be changed by passing a string to
the mixin.

```scss
.component { ... }

@include context-wrapper();
```

```scss
.component { ... }

@include context-wrapper('attribute-name');
```

### Context Overwriting

Context overwriting is a way to overwrite the context of a component. This is
useful if you need to overrule the context variables for a specific scenario.

```scss
.component {
  @include context('primary');

  ...
}
```

## File Structure

The files that need to be adjusted if making any changes.

```txt title="/"
├── .storybook/
│   └── .preview.tsx
│
└── src/
    ├── components/
    │   └── utilities/
    │       ├── module-preview/
    │       │   └── module-preview.module.scss
    │       │
    │       └── module-wrapper/
    │           └── module-wrapper.module.scss
    │
    ├── styles/
    │   ├── themes/
    │   │   ├── root.scss
    │   │   └── [theme-name].scss
    │   │
    │   └── variables/
    │       └── contexts.scss
    │
    └── types/
        └── global.d.ts
```
