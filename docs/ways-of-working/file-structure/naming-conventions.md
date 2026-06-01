# Naming Conventions

## Context

Misaligned naming conventions can cause confusion and make it difficult to read
code. This document aims to provide a set of naming conventions to be used
across the project.

## Decision

To avoid confusion and improve readability, we use the following naming
conventions:

### Directory Names

Directories are named in `kebab-casing` to ensure alignment and avoid casing
issues.

#### ✅ Do use kebab-casing for all directory names.

```txt
directory-name/
```

#### ❌ Don't use other casings for directory names to avoid inconsistencies and misunderstanding.

```txt
directoryName/
directory_name/
DirectoryName/
```

### File Names

Files are named in `kebab-casing` to ensure alignment and avoid casing issues.

A categorization can be appended to the file name with a preceeding dot (`.`) to
quickly explain the usage of the file. Some of which (`.stories`, `.test`, etc)
are used by other tools to identify the file.

#### ✅ Do use kebab-casing for all file names.

```txt
file-name.ts
file-name.tsx
file-name.adapter.ts
file-name.response.ts
file-name.stories.tsx
file-name.stubs.ts
file-name.test.tsx
file-name.module.scss
```

#### ❌ Don't use other casings or combinations of casings for file names to avoid inconsistencies and misunderstanding.

```txt
fileName.ts
FileName.tsx
file_name-adapter.ts
fileName-stories.tsx
```

## Consequences

**Positive:** Naming conventions improve readability and avoid confusion.

**Negative:** Naming conventions can be difficult to remember and enforce.
