# Exports

## Context

Maintaining the same value in both styling and scripting is prone to
misalignment, forgetting to update one of the values. This can lead to bugs and
inconsistencies in the application.

## Decision

If in use of variables that are already set in scss these should be exported in
the `*.module.scss` file to ensure alignment of values.

### Examples

#### ✅ Do use exported scss variables if available.

```scss title=".../[component-name].module.scss"
$variableName: 1920px;

:export {
  variableName: $variableName;
}
```

```tsx title=".../[component-name].tsx"
import styles from './[component-name].module.scss';

const variableName = parseInt(styles.variableName);
```

#### ❌ Don't maintain the same value in two places.

```scss title=".../[component-name].module.scss"
// scss
$variableName: 1920px;
```

```tsx title=".../[component-name].tsx"
const variableName = 1920;
```

## Consequences

**Positive:** Alignment of variable across styling and scripting is ensured.

**Negative:** Adds additional complexity to the codebase.
