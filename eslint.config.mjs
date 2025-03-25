import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  // Spread existing next/core-web-vitals config
  ...compat.extends("next/core-web-vitals"),

  // Base configurations
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Custom rules configuration
  {
    plugins: {
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },
    rules: {
      // Disable specific warnings
      "@typescript-eslint/no-unused-vars": "warn", // Changed to warn instead of error
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type
      "react-hooks/exhaustive-deps": "off", // Disable exhaustive deps warning
      "@next/next/no-img-element": "off", // Allow img tags

      // Optional: More lenient unused vars handling
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Recommended Next.js and React best practices
      "react/react-in-jsx-scope": "off", // Not needed in modern React/Next.js
      "@next/next/no-html-link-for-pages": "warn",
    },

    // Optional: Ignore specific files
    ignores: [".next/", "node_modules/", "dist/", "build/"],
  },
];
