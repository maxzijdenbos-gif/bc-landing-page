# Content

Amplience is the projects chosen CMS and will deliver the editor content to this
application.

## How to use

Most content pages will be accessed through a router slug approach, meaning that
the pages will be build by the content delivered by Amplience. This happens
through the deliveryKey which is gonna represent the slug in the address bar of
the users chosen browser.

## Features

### Page Endpoint

To fetch the data for our content pages we are gonna utilize the Amplience
content delivery API v2, which comes with it's own SDK. `dc-delivery-sdk-js`,
where we are utilizing the `getContentItemByKey` endpoint.

### Layout Endpoint

TBD

### Dictionary Endpoint

TBD

### Editor Preview

Enable the editors to preview their content directly from the CMS (if the
feature exists).

### Publishing

Publishing is a feature that allows the editors to publish their content
directly from the CMS and trigger a new build of the static file(s).

## File Structure

The files that need to be adjusted if making any changes.

```txt title="src/"
├── integrations/
│   └── content/
│       └── amplience/
│           ├── endpoints/
│           │   └── delivery-key/
│           │      └── get-content-delivery-key.ts
│           ├── page/
│           │   ├── page.adapter.ts
│           │   ├── page.ts
│           │   └── page.types.ts
│           └── error/
│               ├── error.adapter.ts
│               └── error.response.ts
│
└── pages/
    ├── [...slug].tsx
    ├── 404.tsx
    ├── index.tsx
    └── sitemap.xml.ts
```
