module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        semi: false,
        trailingComma: "none",
      },
    ],
    "react/jsx-filename-extension": [
      1,
      {
        allow: "always",
        extensions: [".tsx"],
      },
    ],
    "import/extensions": ["error", { tsx: "never" }],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
