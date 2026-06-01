# Scoped Styles

## Context

Not using scoped styles is a common source of bugs and conflicts in large
projects. This is because CSS is global by default, and it's easy to
accidentally override styles in other components.

## Decision

All components should use CSS Modules to scope their styles.

### Examples

#### ✅ Do use scoped styling to ensure a hashed unique output for each component.

```scss title=".../[component-name].module.scss"
.component {
  .className {
    background: red;
  }
}

.component {
  .className {
    background: blue;
  }
}
```

```css title=".../[output-file-name].css"
.mZ3wtfIwPQczF0hjxkdQ .fABZ8hgbdaBr5HOvUPto {
  background: red;
}

.mZ3wtfIwPQczF0hjxkdQ .t8jvqXV_bJce8w7btQP8 {
  background: blue;
}
```

#### ❌ Don't use unscoped styling, which can lead to conflicting styling.

```scss title=".../[component-name].module.scss"
.component {
  .className {
    background: red;
  }
}

.component {
  .className {
    background: blue;
  }
}
```

```css title=".../[output-file-name].css"
.component .className {
  background: red;
}

.component .className {
  background: blue;
}
```

## Consequences

Components will be more self-contained and less likely to conflict with each
other.
