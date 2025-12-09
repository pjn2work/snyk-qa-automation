import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import playwright from "eslint-plugin-playwright";
import js from "@eslint/js";

import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"], // Apply to all TypeScript files
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      playwright: playwright,
    },
    rules: {
      // Enable recommended TypeScript rules
      ...typescriptEslint.configs.recommended.rules,

      // Enable recommended Playwright rules
      ...playwright.configs['flat/recommended'].rules,

      // Add your custom rules here:
      "no-console": "warn", // Warn if you leave console.log in the code
      "playwright/no-focused-test": "error", // Prevent committing tests with .only
    },
  },
];