# Giant Discovery

## Dependency Highlights

- [`Next.js` Documentation](https://nextjs.org)
- [`React` Documentation](https://reactjs.org/)
- [`Storybook` Documentation](https://storybook.js.org)
- [`Plop` Documentation](https://plopjs.com/documentation/)
- [`Husky` Documentation](https://typicode.github.io/husky/)

## Installation

1. Clone the repository.
2. Go to project root folder.
3. Make sure you use the correct Node.js version as described in the section
   [below](#node.js-version-management).
4. Install the necessary dependencies with: `npm install && npm run prepare`.
5. Make a copy of the `.env` file and rename the copy of it to `.env.local`.
   Overwrite the relevant variables or add missing ones from the `.env.example`
   file.

## Documentation

More in depth information about various topics can be found in the
[documentaton](/docs/README.md) section.

## Node.js Version Management

It is recommended to use a Node.js version manager such as
[nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to
easily switch between Node.js versions and ensure compatibility across different
projects.

The **required Node.js version** for this project is specified in the `.nvmrc`
file in the root directory. This ensures a consistent Node.js version across
local development and CI/CD environments (e.g., `Azure Pipelines`,
`AWS Amplify`).

## Visual Studio Code setup

VS Code will prompt you to install recommended extensions when this project is
opened for the first time. You can also review the extension list with the
_Extensions: Show Recommended Extensions_ command. The project also comes with
some settings which improve your overall development experience. Think of things
like automatic file formatting fixing on file save.

## Development Server

Start up the local development server with `npm run dev`.

Access the site on [http://localhost:3000](http://localhost:3000).

## Storybook

Start up the local Storybook server with `npm run storybook`.

Access the site on [http://localhost:6006](http://localhost:6006).

## E-commerce API

The project includes a type-safe client for the Giant E-commerce API, built with
[OpenAPI TypeScript](https://openapi-ts.dev/) (openapi-typescript,
openapi-fetch, openapi-react-query).

- **Location:** `src/integrations/ecommerce-api/`
- **Spec:** `specs/ecommerce-carts-openapi-v1.json` (TODO replace with url where
  the open api json is hosted for all e-commerce api calls)

### Setup

- Set `ECOMMERCE_API_URL` and `ECOMMERCE_OCP_APIM_SUBSCRIPTION_KEY` in
  `.env.local` (server-only). The client calls the catch-all API route
  `pages/api/ecommerce/[...path]`; it proxies to the real API and adds the
  subscription key so the key is never exposed to the browser. If you use
  `NEXT_PUBLIC_AMPLIENCE_BASE_PATH`, the client baseUrl includes it (e.g.
  `/discover/api/ecommerce`).
- Types are generated from the OpenAPI spec. After updating the spec, run:
  ```bash
  npm run generate:ecommerce-api
  ```

### Usage

**Typed hooks (React Query)** — use inside components that are wrapped in
`QueryClientProvider`:

```ts
import { ecommerceApiQuery } from 'integrations/ecommerce-api';

// Query
const { data, error, isPending } = ecommerceApiQuery.useQuery(
  'get',
  '/carts/{cartGuid}/summary',
  { params: { path: { cartGuid } } },
);

// Mutation
const { mutate } = ecommerceApiQuery.useMutation(
  'post',
  '/carts/{cartGuid}/items',
);
mutate({
  params: { path: { cartGuid } },
  body: { modelId: 1, partNumberCode: '...', quantity: 1 },
});
```

**Raw client** — for custom React Query usage or non-React code:

```ts
import { ecommerceApi } from 'integrations/ecommerce-api';

const { data, error } = await ecommerceApi.GET('/carts/{cartGuid}/summary', {
  params: { path: { cartGuid } },
});
```

## Folder Structure

```txt
├── .azuredevops/ (azure templates)
    └── pipelines/ (build and validation pipelines for deployment and pull requests)
├── .husky/ (husky configuration)
├── .storybook/ (storybook configuration)
├── .vscode/ (vscode configuration)
├── docs/ (project documentation)
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
    │   ├── motions/ (storybook exclusive components for listing motion animation/transitions)
    │   ├── organisms/ (the "modules" of the system)
    │   ├── templates/ (the structure of a whole page)
    │   ├── tokens/ (storybook exclusive components for listing tokens)
    │   └── utilities/ (the "invisible" components)
    │
    ├── integrations/ (categorized integrations handling integrations etc)
    │   ├── ecommerce-api/ (type-safe E-commerce API client, see E-commerce API section above)
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
    │   └── plop-templates/ (templates for auto-generation of code)
    │
    └── types/ (global types)
```
