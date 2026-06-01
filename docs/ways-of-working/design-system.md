# Design System

## Context

We want to create a design system that is easy to use and maintain and improves
reusability of components. We want to create a system that makes as much sense
as possible for both developers and designers.

## Decision

We base our structure on an extended version of the
[Atomic Design methodology](https://atomicdesign.bradfrost.com/chapter-2/). With
the addition of frontend specific component groups like layouts and utilities.

### File Structure

```txt title="src/"
├── components/
│   ├── atoms/
│   │   └── [component-name]/
│   │
│   ├── layouts/
│   │   └── [component-name]/
│   │
│   ├── molecules/
│   │   └── [component-name]/
│   │
│   ├── organisms/
│   │   └── [component-name]/
│   │
│   ├── templates/
│   │   └── [component-name]/
│   │
│   ├── tokens/
│   │   └── [component-name]/
│   │
│   └── utilities/
│       └── [component-name]/
│
└── pages/
    └── [page-name].tsx
```

### Utilities

The "invisible" components. These components are mainly used for layout
purposes:

```tsx
<Column />
<Container />
<Link />
<ModuleList />
<ModulePreview />
<ModuleWrapper />
<PageProgressLoader />
<Row />
```

### Tokens

The design tokens. These components are only used in Storybook and show an
overview of the token variables:

```tsx
<ColorSystem />
<GridSystem />
<IconographicSystem />
<SpacingSystem />
<TypographicSytem />
```

### Atoms

The smallest building blocks in the system. These components cannot be broken
down any further and are the base for all other components:

```tsx
<Icon />
<Image />
<RichText />
<Typography />
<Video />
```

### Molecules

The combination of smaller parts adding interactions:

```tsx
<Button />
<Card />
<Carousel />
<Checkbox />
<Input />
<Radiobutton />
<Select />
<SliderItem />
<Textarea />
```

### Organisms

The "modules" of the system. These components are a combination of atoms and
molecules or even other organisms:

```tsx
<CardList />
<Contact />
<Text />
<CopyAndMedia />
<Footer />
<Gallery />
<MainNavigation />
<Marquee />
<Media />
<Slider />
```

### Templates

The structure of a whole page. These components define the layout of a page.

```tsx
<Error />
<Page />
```

### Pages

Adding actual content to the templates:

```tsx
<Contact />
<Homepage />
```

## Consequences

**Positive:** We have a more clear inheritance of components.

**Negative:** It may require alignment with the team to put components in the
right place.
