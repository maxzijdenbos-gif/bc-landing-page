# Husky

[Link to official documentation](https://typicode.github.io/husky/)

Husky is used to add pre-hooks to git commands. It is a wrapper around the
native git hooks.

## How to use

The pre-hooks automatically get executed when the corresponding git command is
executed.

## Features

### Pre-Commit hook

When the pre-commit hook is executed husky automatically runs the `lint-staged`
commands.

### Pre-Push hook

When the pre-push hook is executed husky automatically runs the `lint` and
`test` commands.

It also validates that the branch name is valid.

## File Structure

```txt title="/"
├── .husky/
│   ├── pre-commit
│   └── pre-push
│
└── package.json
```
