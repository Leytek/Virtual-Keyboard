module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'keyword-spacing': [2, {'overrides': {
        'if': {'after': false},
        'for': {'after': false},
        'while': {'after': false},
        'switch': {'after': false},
      }}],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'lines-between-class-members': ["error", "always", { "exceptAfterSingleLine": true }],
  },
};
