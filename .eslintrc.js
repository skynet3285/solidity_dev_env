module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  plugins: ["prettier"],
  rules: {
    "no-undef": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      parser: "espree", // 기본 JS 파서를 사용합니다.
      rules: {},
    },
    {
      files: ["*.ts"],
      rules: {},
    },
  ],
};
