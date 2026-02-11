// .js is recommended for ESLint configuration
// .ts is also supported, but it requires additional configuration
// https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files
// If you’re using Node.js >= 22.13.0, you can load TypeScript configuration files natively without requiring jiti
import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig(
    globalIgnores(["**/*.js", "**/*.cjs", "**/*.mjs"]),
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
    eslintPluginPrettierRecommended
);