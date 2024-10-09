module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        tsconfigRootDir: "backend",
        project: ['./tsconfig.lint.json']
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'security-node'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'eslint:recommended',
      'plugin:security-node/recommended'
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js','*.spec.ts','*-spec.ts', 'src/vdm/**/*'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_", "ignoreRestSiblings": true,   }],
      "no-unused-vars": 'off'
    },
  };