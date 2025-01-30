module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:import/typescript"
  ],
  plugins: [
    "module-resolver",
    "react-hooks",
    "react-native",
    "@typescript-eslint",
    "simple-import-sort",
    "@tanstack/query",
    "import"
  ],
  rules: {
    "react-native/no-inline-styles": "error",
    "react-native/no-raw-text": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
    ],
    "import/no-extraneous-dependencies": ["error", {}],
    "import/extensions": ["error", "never",{ "svg": "always" }],
    "quotes": ["error", "double"],
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": ["error", "never"],
    "no-console": "warn",
    "prefer-const": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-var-requires": 0
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  ignorePatterns: ["node_modules/", "dist/", "coverage/"]
};
