# Exports

## Context

Components should always be exported as `export default`.

The Component Props interface should always be exported if present.

## Decision

Components should always be exported as `export default`. Everything else should
be exported inline.

### Examples

#### ✅ Do export the files main functionality as default and everything else directly.

```tsx title=".../[component-name].tsx"
export interface ComponentProps {...};

const Component = ({...}: ComponentProps) => {
  return (...)
};

export default Component;
```

#### ❌ Don't export the main functionlity inline and don't forget to always export the props interface.

```tsx title=".../[component-name].tsx"
interface ComponentProps {...};

export const Component = ({...}: ComponentProps) => {
  return (...)
};
```

#### ✅ Do import the files main functionality as default and everything else directly.

```tsx
import ComponentName, { ComponentNameProps } from '[component-name].tsx';
```

#### ❌ Don't import everything inline.

```tsx
import { ComponentName, ComponentNameProps } from '[component-name].tsx';
```

## Consequences

**Positive:** It makes it easier to differentiate between an imports main
functionality and its types.
