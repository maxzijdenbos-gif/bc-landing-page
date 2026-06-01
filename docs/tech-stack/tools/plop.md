# Plop

[Link to official documentation](https://plopjs.com/documentation/)

Plop has been implemented to help easily generate new components, documentation,
mocks, etc.

It helps enforce consistency and reduces the amount of time spent on repetitive
tasks.

## How to use

Run the `npm run generate` command.

Select which generator you want to use.

## Features

### Component

Creates a new component on the selected level of the components directory.

### Documentation

Creates a new documentation file in the selected section.

### Mock Endpoint

Creates a new mock endpoint together with its corresponding handler in the mocks
directory and automatically adds it to the mock server.

## File Structure

```txt title="src/tools/"
├── plop-templates/
│   ├── component/
│   │   ├── component.module.scss.hbs
│   │   ├── component.stories.tsx.hbs
│   │   ├── component.stubs.ts.hbs
│   │   ├── component.test.tsx.hbs
│   │   └── component.tsx.hbs
│   │
│   ├── documentation/
│   │   └── documentation.md.hbs
│
└── plopfile.js
```
