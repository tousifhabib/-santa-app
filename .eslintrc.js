module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript/base',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:promise/recommended'
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        'import/order': ['error', { 'newlines-between': 'always' }],
        'promise/always-return': 'error',
        'promise/no-nesting': 'warn'
    },
    ignorePatterns: [
        'dist/**',
        'node_modules/**'
    ],
};