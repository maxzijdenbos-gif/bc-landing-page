# Releases and Tags

## Context

We want to have a clear and consistent way of naming our releases and tags.

## Decision

We will use the following naming conventions for our releases and tags:

### Naming conventions

The structure should follow the `[major].[minor].[patch]` naming convension.

**Major**: Breaking changes that have huge impact on the architecture

**Minor**: Minor changes to the architecture, like a sprint full of new features

**Patch**: Patching (hotfixing) issues in the release

### Releases

Releases should be named after the sprint that they are based on.

**Sprint 5**: `release/1.5.0`

**Sprint 6**: `release/1.6.0`

**Sprint 7**: `release/1.7.0`

### Tags

Tags are used for deployment to UAT and should be named after a combination of
the current release and hotfix:

**Sprint 6**: `v1.6.0` (adds the sprint number as minor level)

**Hotfix of release 1.6.0**: `v1.6.1` (increments the patch level by one)

**Another hotfix of release 1.6.0**: `v1.6.2` (increments the patch level by
one)

**Sprint 7**: `v1.7.0` (resets the patch level to zero)

**Hotfix of release 1.7.0**: `v1.7.1` (increments the patch level by one)

## Consequences

**Positive:** We have a clear and consistent way of naming our releases and
tags.

**Negative:** We have to remember to increment the major and minor level when
creating a new release. We have to remember to reset the patch level when
creating a new release.
