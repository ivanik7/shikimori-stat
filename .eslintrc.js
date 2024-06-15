module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-restricted-syntax": [
      "error",
      "WithStatement",
      "BinaryExpression[operator='in']"
    ],
    "no-useless-constructor": "off",
    "no-empty-function": "off",
    "no-await-in-loop": "off",
    "no-continue": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false }
    ],
    "lines-between-class-members": "off",
    "no-restricted-globals": "off",
    "import/extensions": "off"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"]
      }
    }
  }
};
