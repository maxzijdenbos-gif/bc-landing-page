# Mixins

## Context

Mixins are used to apply a set of styles to a classname. They are used to
enforce a more streamlined approach to styling.

## Decision

Mixins should be used as a way to create reusable snippets of code. They should
be used to apply a set of styles to a classname.

### File Structure

Where to find and extend the files.

```txt title="src/styles/"
├── mixins/
│   ├── breakpoints.scss
│   ├── general.scss
│   ├── typographies.scss
│   └── ...
│
└── _setup.scss
```

### Breakpoints (`breakpoints.scss`)

Breakpoint mixins are used to enforce a more streamlined approach to responsive
design. They are used to apply the breakpoints to the components.

### General (`general.scss`)

General mixins are a collection of mixins that aren't categorized yet.

### Typographies (`typographies.scss`)

Typography mixins are used to apply all attributes of a typography to a
classname.

## Consequences

**Positive:** Mixins are a great way to enforce a more streamlined approach to
styling.

**Negative:** Mixins require a more structured way of thinking about styling.
