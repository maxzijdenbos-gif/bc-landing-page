# Pipelines

Azure pipelines for pull requests and deployment.

## How to use

All pipelines need to be set up in Azure DevOps under `Pipelines` on the left
side in a project team.

The pipelines are written in YAML and can be found in the
`.azuredevops/pipelines` folder.

"Pull Request" pipelines also need to be added as a build validation check to
the `develop`, `main`, and `release/*` branches.

## Features

### Pull Request Pipelines

List of details about the pull request related pipelines:

#### Build Validation

Filename: `pr-build-validation.yml`.

Triggered on Pull Requests to `develop` and `main` branches.

Runs linters, formatters, type-check and tests.

Validates the builds for Next.js and Storybook.

Uses the `frontend-dev` variable group.

#### Branch protection

Checks if the allowed source branch is allowed to be merged to a given target
branch.

Triggered on Pull Requests to `main` and `release/*` branches..

### Variable Groups

Variable groups are used to store secrets and other variables that are used in
the pipelines. They need to be set up in Azure DevOps under
`Pipelines -> Library` on the left side in a project team.

#### DEV / Development

Group name: `frontend-dev`.

## File Structure

```txt title=".azuredevops/pipelines/"
├── steps/
│   ├── install-node-modules.yml
│   ├── install-node.yml
│   ├── publish-artifact.yml
│   ├── run-build-storybook.yml
│   ├── run-build.yml
│   ├── run-eslint.yml
│   ├── run-prettier.yml
│   ├── run-stylelint.yml
│   ├── run-test-storybook.yml
│   ├── run-test.yml
│   └── run-type-check.yml
│
├── pr-build-validation.yml
├── pr-branch-protection.yml
```
