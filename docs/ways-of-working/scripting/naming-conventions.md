# Naming Conventions

## Context

Misaligned naming conventions can cause confusion and make it difficult to read
code. This document aims to provide a set of naming conventions to be used
across the project.

## Decision

To avoid confusion and improve readability, we use the following naming
conventions:

### Variables

Variable names should always be `camelCased`.

#### ✅ Do use camelCasing for all variable names

```tsx
const variableName: '';
```

#### ❌ Don't use other casings for variable names to avoid inconsistencies and misunderstanding.

```tsx
const VariableName: '';
const variable-name: '';
const variable_name: '';
```

### Functions

Functions are named in `camelCasing`.

#### ✅ Do use camelCasing for functions.

```tsx
const functionName = () => {
  // ...
};
```

#### ❌ Don't use other casings for functions as they can get confused with types etc.

```tsx
const FunctionName = () => {
  // ...
};

const function_name = () => {
  // ...
};
```

### Interfaces & Types

Interfaces/Types are named in `PascalCasing` to make a clear separation from
variables and functions.

They should also never be prefixed with `I`/`T` or postfixed with
`Type`/`Interface` as the PascalCasing should make it implicit. And changes to
the interface/type could change it from an interface to a type or vice versa.

#### ✅ Do use PascalCasing for interfaces and types.

```tsx
type ListName = 'option1' | 'option2';

export interface ComponentNameProps {
  // ...
}
```

#### ❌ Don't write interfaces and types in other casings as they can be confused with other functionality.

```tsx
type listName = 'option1' | 'option2';

export interface componentNameProps {
  // ...
}
```

#### ❌ Don't prefix `I` to interfaces or `T` to types as they can be mixed later on.

```tsx
type TListName = 'option1' | 'option2';

export interface IComponentNameProps {
  // ...
}
```

#### ❌ Don't write prop interfaces without appending `Props` to the name.

```tsx
export interface ComponentName {
  // ...
}
```

#### ❌ Don't can props interfaces something as generic as `Props` as its hard to see when importing what component it relates to.

```tsx
export interface Props {
  // ...
}
```

### Components

Components are named in `PascalCasing` to make a clear separation from standard
DOM elements.

#### ✅ Do use PascalCasing for the name of a component to differentiate from standard DOM elements.

```tsx
const ComponentName = () => {
  return (
    // ...
  );
};

<ComponentName {...args} />
```

#### ❌ Don't use other casings as it can be confused with other functionality.

```tsx
const componentName = () => {
  return (...);
};

<componentName {...args} />
<component-name {...args} />
<component_name {...args} />
```

## Consequences

**Positive:** Naming conventions improve readability and avoid confusion.

**Negative:** Naming conventions can be difficult to remember and enforce.
