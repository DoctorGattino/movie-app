import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      import: importPlugin,
    },
    rules: {
      // 🔹 Базовые рекомендации от ESLint и React
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // 🔹 React-специфичные улучшения
      'react/react-in-jsx-scope': 'off', // Не требует `import React`
      'react/prop-types': 'off', // Отключаем PropTypes (если используешь TypeScript)

      // 🔹 Логика хуков
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // 🔹 Поддержка hot reload
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // 🔹 Упорядочивание импортов
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'error',

      // 🔹 Стиль кода (Prettier)
      'prettier/prettier': 'error',

      // 🔹 Чистота кода
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-console': 'off',
      'no-debugger': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
  },
]
