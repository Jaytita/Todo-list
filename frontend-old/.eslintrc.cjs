module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    // 'simple-import-sort/imports': 2,
    // 'simple-import-sort/exports': 2,
    // 'unused-imports/no-unused-imports': 2,
    // 'no-empty': 0,
    // 'no-unused-vars': 0,
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     tabWidth: 2,
    //     trailingComma: 'all',
    //     endOfLine: 'auto',
    //   },
    // ],
  },
}
