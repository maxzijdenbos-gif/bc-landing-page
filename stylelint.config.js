/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard-scss'],

  ignoreFiles: ['node_modules', 'coverage/**/*', 'storybook-static/**/*'],

  plugins: ['stylelint-order'],

  rules: {
    'color-function-notation': 'legacy',
    'custom-property-pattern': [
      /^[a-z]+[A-z]*(-[a-z]+[A-z]*){0,2}$/,
      {
        message:
          'Custom properties should follow the "(categoryName-)propertyName" structure',
      },
    ],
    'declaration-no-important': true,
    'keyframes-name-pattern': [
      /^[a-z]+[A-z]*[0-9]*$/,
      {
        message: 'Keyframe names should be camelCased',
      },
    ],
    'max-nesting-depth': 4, // TODO: get to work with only 2 nesting depth
    'media-feature-range-notation': 'prefix',
    'no-invalid-position-at-import-rule': true,
    'order/properties-alphabetical-order': true,
    'property-no-unknown': [
      true,
      {
        ignoreSelectors: [':export'],
      },
    ],
    'property-no-vendor-prefix': [
      true,
      {
        ignoreProperties: ['mask-image', 'text-size-adjust'],
      },
    ],
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/at-mixin-pattern': [
      // /^[a-z]+[A-z]*(-[a-z]+[A-z]*){0,1}$/, // ! NOTE: Michael's regex that does not satisfy the mixins added in this PR
      /^[a-z]+[A-z]*(-[a-zA-Z0-9]+)*$/,

      {
        message: 'Mixin names should be kebab-cased',
      },
    ],
    'scss/dollar-variable-pattern': [
      /^[a-z]+[A-z]*(-[0-9]{0,1}[a-z]+[A-z]*[0-9]*){0,1}$/,
      {
        message:
          'Variables should follow the "(categoryName-)variableName" structure',
      },
    ],
    'selector-class-pattern': [
      /^[a-z]+[A-z]*[0-9]*$/,
      {
        message: 'Class names should be camelCased',
      },
    ],
    'selector-disallowed-list': [
      /^(?!\.|#|&|:|\[|[0-9]+%)/,
      {
        message: 'Only class names or pseudo classes are allowed',
      },
    ],
    'selector-id-pattern': [
      /^[a-z]+([A-Z]+[a-z]+[0-9]*)*$/,
      {
        message: 'ID names should be camelCased',
      },
    ],
    'selector-max-compound-selectors': 4, // TODO: get to work with only 2 compound selector
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'global'],
      },
    ],
    'unit-allowed-list': [
      'fr',
      'px',
      'em',
      'rem',
      '%',
      'deg',
      's',
      'vh',
      'vw',
      'dvh',
      'svh',
    ],
  },
};

export default config;
