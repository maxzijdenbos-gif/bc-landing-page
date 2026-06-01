# Pure Components

## Context

Components quickly get developed exactly as described in the design. But as soon
as the component is used in a different context, it needs to be changed. This is
because the component is not generic and relies on external data or state.

## Decision

Components should be pure and easy to extract. This means that components should
not rely on any external data or state. All data should be passed in as props.

A component should always have both all the following types of files
`rendering`, `styling`, `stories`, `stubs` and `tests`.

If a component becomes too complex it is recommended to separate parts into sub
components. Only the main components should have Storybook stories and stubs.

### File Structure

```txt title="src/components/[level-name]/"
└── [component-name]/
    ├── [sub-component-name]/
    │   ├── [sub-component-name].module.scss (styling)
    │   ├── [sub-component-name].test.ts (tests)
    │   └── [sub-component-name].tsx (rendering)
    │
    ├── [component-name].module.scss (styling)
    ├── [component-name].stories.tsx (stories)
    ├── [component-name].stubs.ts (stubs)
    ├── [component-name].test.ts (tests)
    └── [component-name].tsx (rendering)
```

## Consequences

**Positive:** Components are easy to extract and reuse.

**Negative:** It requires a structural approach to how to apply logic and data
to components.
