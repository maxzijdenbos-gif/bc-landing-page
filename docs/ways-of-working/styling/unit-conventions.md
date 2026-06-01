# Unit Conventions

## Context

The use of `px` units for sizes makes it difficult to scale the website. It also
makes it difficult to change the font-size of the root element.

## Decision

Use the custom `rem()` function for sizes either directly or in variables.

### Examples

#### ✅ Do use the custom `rem()` function that converts `px` to `rem`.

```css
font-size: rem(16);
```

#### ✅ Do use `px` if value is equal to 1px to avoid it disappearing when scaling the website.

```css
font-size: 1px;
```

#### ❌ Don't use `px` unit for sizes above 1px.

```css
font-size: 16px;
```

## Consequences

**Positive:** The use of `rem` units allows us to scale the website by changing
the font-size of the root element.

**Positive:** The use of the custom `rem()` function makes the code more
readable by not having to manually calculate the rem values.
