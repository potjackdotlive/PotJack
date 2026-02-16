import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";
import i18next from "eslint-plugin-i18next";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      i18next.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    settings: {
      react: { version: "18" },
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true, args: "none" }],
      "@typescript-eslint/no-explicit-any": "off",
      "import/named": "off",
      "no-duplicate-imports": "error",
      "no-restricted-imports": ["error", { patterns: ["../*"] }],
      "unused-imports/no-unused-imports": "warn",
      "react/self-closing-comp": "warn",
      "react/jsx-key": "error",
      "no-console": "warn",
      "no-cond-assign": ["error", "always"],
      "arrow-body-style": ["error", "as-needed"],
      "react/jsx-curly-brace-presence": ["warn", { props: "never" }],
      "i18next/no-literal-string": "warn",
      "import/no-unresolved": ["error", { ignore: ["\\.svg\\?react$"] }],
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent"],
          pathGroups: [
            {
              pattern: "react*",
              group: "external",
              position: "before",
            },
            {
              pattern: "antd",
              group: "external",
              position: "before",
            },
            {
              pattern: "@ant-design*",
              group: "external",
              position: "before",
            },
            {
              pattern: "@emotion*",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
);
