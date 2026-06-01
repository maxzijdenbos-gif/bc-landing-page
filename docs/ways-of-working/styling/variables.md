# Variables

## Context

Hardcoding values in CSS is a bad practice. It makes the code harder to maintain
and to scale. It also makes it harder to change the values in the future.

## Decision

We will use variables to store values that are used in multiple places in the
codebase.

### File Structure

Where to find and extend the files.

```txt title="src/styles/"
├── variables/
│   ├── breakpoints.scss
│   ├── contexts.scss
│   ├── general.scss
│   ├── grid.scss
│   ├── palette.scss
│   └── ...
│
└── _setup.scss
```

### Breakpoints (`breakpoints.scss`)

Breakpoint variables are used to define the breakpoints for the media queries.

### Contexts (`contexts.scss`)

Context variables are used to map out the color contexts of the application.
They are used to define the color palette.

### General (`general.scss`)

General variables are used to define the general values of the application. They
are used to define the font sizes, font families, etc.

### Grid (`grid.scss`)

Grid variables are used to define the grid of the application. They are used to
define the grid gutters, grid containers, etc.

### Palette (`palette.scss`)

Palette variables are used to define the color palette of the application. These
are mapped to the contexts and not used directly.

## Consequences

**Positive:** It is easier to update values in a more centralized location.

**Negative:** It requires a more strict naming convention to avoid misalignments
and confusion.
