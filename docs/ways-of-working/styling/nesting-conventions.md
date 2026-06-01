# Nesting Conventions

## Context

Nesting `scss` files can become very complex and hard to read. This is
especially true when using `scss` variables and mixins.

Lack of specificity can also cause issues with styling because of the order of
the classes in the compiled `css` file.

## Decision

Never nest more than one level deep. If you need to nest more than one levels
deep, consider refactoring the code.

Only have the wrapping element and its state in the root of the file. Never have
sub classes directly in the root of the file.

Always split modifications into separate root based scopes to avoid unnecessary
complexity and further nesting.

### Examples

#### ✅ Do put only the wrapping class (`.component`) and its states (ie. `.component.isActive`) in the root of the scss files.

```scss title="[component-name].module.scss"
.component {
  // ...

  .className {
    // ...
  }
}
```

#### ❌ Don't have sub classes directly in the root of the file as it will remove specificity.

```scss title="[component-name].module.scss"
.component {
  // ...
}

.className {
  // ...
}
```

#### ✅ Do put all state modifiers (ie. `.component.isActive`) in the root of the scss file.

```scss title="[component-name].module.scss"
.component {
  // ...

  .className {
    // ...
  }
}

.component.isActive {
  // ...

  .className {
    // ...
  }
}
```

##### ❌ Don't put state modifiers inside the main scope as it add extra nesting and makes the styling it harder.

```scss title="[component-name].module.scss"
.component {
  // ...

  .className {
    // ...
  }

  &.isActive {
    // ...

    .className {
      // ...
    }
  }
}
```

##### ✅ Do only have one level of nesting inside the wrapping element to avoid unnecessary specificity.

```scss title="[component-name].module.scss"
.component {
  // ...

  .className {
    // ...
  }

  .subClassName {
    // ...
  }
}
```

##### ❌ Don't nest sub classes inside each other which makes the code harder to read.

```scss title="[component-name].module.scss"
.component {
  // ...

  .className {
    // ...

    .subClassName {
      // ...
    }
  }
}
```

## Consequences

**Positive:** The styles are easier to read and understand. And it's easier to
find the correct place to make modifications.
