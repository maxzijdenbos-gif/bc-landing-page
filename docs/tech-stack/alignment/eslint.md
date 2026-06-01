# ESLint

[Link to official documentation](https://eslint.org/)

ESLint is a tool for identifying and reporting on patterns found in
ECMAScript/JavaScript code, with the goal of making code more consistent and
avoiding bugs.

## How to use

Run the `npm run lint` command.

## Features

### Linting

ESLint statically analyzes your code to quickly find scripting related problems.

### Formatting

ESLint can validate formatting issues using Prettier.

### Fixing

ESLint can auto-fix some of the problems it finds. The fixes are made to the
actual files on disk.

### Ignoring

ESLint can be configured to ignore entire files and directories.

### Configuring

ESLint is completely configurable, meaning you can turn off every rule and run
only with basic syntax validation, or mix and match the bundled rules and your
custom rules to make ESLint perfect for your project.

## File Structure

```txt title="/"
├── .eslintrc
├── .lintstagedrc
├── .prettierignore
├── .prettierrc
└── .tsconfig.json
```
