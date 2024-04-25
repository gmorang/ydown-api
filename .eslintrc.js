module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["standard", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "eslint-plugin-import-helpers"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: false,
        trailingComma: "all",
        arrowParens: "always",
        semi: true,
      },
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: ["module", "/^@/", "/^test/", ["parent", "sibling", "index"]],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],

    camelcase: "off",
    "no-useless-constructor": "off",
    "no-new": "off",
    "dot-notation": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "no-case-declarations": "off",
    "@typescript-eslint/no-empty-function": "off",
    "no-use-before-define": "off",
  },
  settings: {
    "import/parsers": {
      [require.resolve("@typescript-eslint/parser")]: [".ts", ".tsx", ".d.ts"],
    },
  },
};
