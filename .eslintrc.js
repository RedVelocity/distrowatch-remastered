module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
    'plugin:@next/next/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  rules: {
    'consistent-return': 1,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 1,
    'linebreak-style': 0,
    'no-nested-ternary': 0,
    'no-return-assign': [1, 'except-parens'],
    'no-unused-expressions': [
      1,
      { allowTernary: true, allowShortCircuit: true },
    ],
    'react/prop-types': 0,
    'react/jsx-filename-extension': 1,
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'react/require-default-props': 0,
    'react/function-component-definition': 0,
  },
};
