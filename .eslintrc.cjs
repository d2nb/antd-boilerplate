module.exports = {
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
    'react/jsx-one-expression-per-line': [2, { allow: 'literal' }],
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/display-name': 'off',
    'react/prop-types': 'off'
  }
}
