# Naming Conventions

## Context

Misaligned naming conventions can cause confusion and make it difficult to read
code. This document aims to provide a set of naming conventions to be used
across the project.

## Decision

To avoid confusion and improve readability, we use the following naming
conventions:

### Variables

Variables are named in `camelCasing`. The exception to the rule is with
categorized scss variables which use a dash between the category and name.

#### ✅ Do use camelCasing for all variables with the only exception being dash separation for categorizations.

```scss
$variableName: 0;
$borderWidth-md: 0;
```

#### ❌ Don't use any other casing for variables.

```scss
$variable-name: 0;
$borderWidthMd: 0;
$borderWidth_md: 0;
```

### Class Names

Style classnames are named in `camelCasing`.

#### ✅ Do always use camelCasing for all classnames.

```js
.className {}
.className.isStateName {}
```

#### ❌ Don't use other casings for classnames.

```js
.class-name {}
.class-name.is-state-name {}
.ClassName {}
.ClassName.IsStateName {}
```

## Consequences

**Positive:** Naming conventions improve readability and avoid confusion.

**Negative:** Naming conventions can be difficult to remember and enforce.
