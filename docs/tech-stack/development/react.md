# React

[Link to official documentation](https://reactjs.org/)

React is a JavaScript library that structures the UI of a web application into
reusable components.

## How to use

Run the `npm run dev` command.

This will start the localhost server on `http://localhost:3000`.

## Features

### Components

React is a component-based library. This means that the UI of a web application
is structured into reusable components.

### JSX

JSX is a syntax extension to JavaScript. It is used with React to describe what
the UI should look like.

### Virtual DOM

The Virtual DOM is a representation of the DOM in memory. It is used to improve
performance by only updating the parts of the DOM that have changed.

### One-way data binding

React uses one-way data binding. This means that data flows in one direction,
from parent to child.

### Hooks

Hooks are a new feature since React 16.8. They allow you to use state and other
React features without writing a class.

### CSS Modules Support

CSS Modules are a way to write CSS that is scoped to a single component. This
means that you can write CSS without worrying about it affecting other
components.

## File Structure

```txt title="src/components/"
└── [level-name]/
    └── [component-name]/
        ├── [sub-component-name]/
        │   └── [sub-component-name].tsx
        │
        └── [component-name].tsx
```
