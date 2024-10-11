module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'function-comma-space-after': 'always-single-line',
    'block-no-empty': null,
    'custom-property-pattern': null,
    'rule-empty-line-before': null,
    'property-no-unknown': null,
    'selector-class-pattern': null,
    'max-empty-lines': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'string-quotes': 'single',
    


    "color-function-notation": null, // 禁用 color-function-notation 规则
    "function-url-quotes": "never",
    "at-rule-no-unknown": null,
  },
};

