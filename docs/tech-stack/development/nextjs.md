# Next.js

[Link to official documentation](https://nextjs.org)

Next.js is a React based framework that allows you to create server-side
rendered React applications.

## How to use

Run the `npm run dev` command.

This will start the localhost server on `http://localhost:3000`.

## Features

### SSR / SSG Support

Next.js supports both Sever-Side Rendering and Static Site Generation.

### Routing

Next.js has a file-based routing system. This means that you can create a file
in the `pages` folder and it will be automatically available at the
corresponding route.

### API Routes

Next.js has a built-in API system. You can create a file in the `pages/api`
folder and it will be automatically available at the corresponding route.

### Image Optimization

Next.js has a built-in image optimization system. You can use the `Image`
component to automatically optimize your images.

## File Structure

```txt title="/"
├── public/
├── src/
│   └── pages/
│       ├── api/
│       │   ├── [category-name]/
│       │   │   └── [endpoint-name].ts
│       │   │
│       │   ├── clear-preview.ts
│       │   ├── forms.ts
│       │   ├── preview.ts
│       │   └── [endpoint-name].ts
│       │
│       ├── _app.tsx
│       ├── _document.tsx
│       ├── _error.tsx
│       ├── [...slug].tsx
│       ├── 404.tsx
│       ├── index.tsx
│       ├── sitemap.xml.ts
│       └── [route-name].tsx
│
├── next.config.js
└── next-env.d.ts
```
