# Folder Structure

## Context

Knowing where to put things and where to find things is important for a project
to be maintainable and scalable.

## Decision

We will use the following folder structure where each folder has a specific
purpose:

```txt title="/"
├── .azuredevops/ (azure templates)
├── .husky/ (husky configuration)
├── .storybook/ (storybook configuration)
├── .vscode/ (vscode configuration)
├── documentation/ (documentation of ways of working)
├── public/ (next.js public directory)
└── src/ (project specific code)
    ├── __mocks__/ (mocking of packages)
    ├── assets/ (project specific assets)
    │   ├── fonts/ (font assets)
    │   └── icons/ (icon assets)
    │
    ├── components/ (everything that is jsx/tsx file and not in /pages)
    │   ├── atoms/ (the smallest building blocks in the system)
    │   ├── layouts/ (the wrapping layout of templates)
    │   ├── molecules/ (the combination of of smaller parts adding interactions)
    │   ├── organisms/ (the "modules" of the system)
    │   ├── templates/ (the structure of a whole page)
    │   ├── tokens/ (storybook exclusive components for listing tokens)
    │   └── utilities/ (the "invisible" components)
    │
    ├── integrations/ (categorized integrations handling integrations etc)
    │   ├── content/ (integration for cms content)
    │   └── tracking/ (integration for tracking)
    │
    ├── libraries/ (custom functions, hooks, etc)
    │   ├── formatters/ (functions for formatting values)
    │   ├── getters/ (custom getter functions)
    │   ├── hooks/ (custom react hooks)
    │   └── validators/ (validation of values)
    │
    ├── pages/ (next.js routing)
    │   └── api/ (next.js api)
    │
    ├── styles/ (global styles)
    │   ├── functions/ (scss functions)
    │   ├── mixins/ (scss mixins)
    │   ├── themes/ (custom themes with scoped css variables)
    │   └── variables/ (scss variables)
    │
    ├── tools/ (anything tool/script or build related that is not required to be root level)
    │   ├── documentation/ (template for documentation files)
    │   ├── pipelines/ (build and validation pipelines for deployment and pull requests)
    │   └── plop-templates/ (templates for auto-generation of code)
    │
    └── types/ (global types)
```

## Consequences

**Positive:** Clear structure of where to put things and where to find things.

**Negative:** The structure might not fit all projects.
