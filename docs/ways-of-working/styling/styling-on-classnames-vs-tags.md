# Styling on Classnames vs Tags

## Context

Styling on tags is both unreadable and has a high risk of introducing mistakes
when later replacing the tags because of SEO or accessibility optimizations.

## Decision

We make use of classnames to apply styling.

### Examples

#### ✅ Do use classnames to apply styling as classnames should never change and can better explain the purpose of the element.

```scss
.image {
  // ...
}
```

#### ❌ Don't apply styling directly on HTML elements as they may be changed for accessibility or SEO optimization.

```scss
img {
  // ...
}
```

## Consequences

**Positive:** Classnames are more readable and can better explain the purpose of
the element.

**Negative:** Classnames are more verbose and can require more effort to write.
