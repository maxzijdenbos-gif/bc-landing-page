# Functions

## Context

Converting values to a specific unit of measurement is a common task in CSS.
This can be done as a manual case by case calculation, but it requires more
effort to read and understand the code.

We also need a place for any other reusable logic that might be needed in the
future.

## Decision

We use functions to create reusable logic that can be used globally in all scss
files.

### File Structure

Where to find and extend the files.

```txt title="src/styles/"
├── functions/
│   ├── units.scss
│   └── ...
│
└── _setup.scss
```

### Units (`units.scss`)

Unit functions are used to convert values to a specific unit of measurement.

## Consequences

**Positive:** Making use of functions makes the code more aligned and easier to
read.

**Negative:** It requires more effort to enforce the use of functions where
relevant.
