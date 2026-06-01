# Wrapper Components

## Context

Third party packages can very quickly become very entangled with your codebase.
This can make it very difficult to replace them with another package or custom
code.

## Decision

Third party packages should always be wrapped in a custom component whenever
possible.

The interface should be simplified to only the needed features.

## Consequences

**Positive:** Making it easier to replace with either another package or custom
code.

**Positive:** Making it easier to understand the used functionality of the
component.
