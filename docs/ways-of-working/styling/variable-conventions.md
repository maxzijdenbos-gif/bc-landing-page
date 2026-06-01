# Variable Conventions

## Context

Hardcoded values are hard to maintain and scale.

## Decision

Make use of scss variables whenever possible. To make it easier to maintain and
scale the website, we have created a system of variables for breakpoints,
contexts, general, grid, palette, etc.

### Examples

#### ✅ Do use `$spacing-*` variables for margins, paddings, etc whenever possible.

```css
margin: $spacing-s;
padding: $spacing-m;
```

#### ❌ Don't use values for margins, paddings, etc that are misaligned with the `$spacing-*` system without a good reason. And if you do, add a comment explaining why.

```css
margin: rem(18);
```

##### ❌ Don't use the `$spacing-*` variables for sizes that are not actual spacings.

```css
line-height: $spacing-m;
```

## Consequences

**Positive:** The use of variables makes it easier to maintain the code and to
scale the website.
