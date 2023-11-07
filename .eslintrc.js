{
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": ["standard-with-typescript", "prettier"],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "project": ["tsconfig.json"],
      "tsconfigRootDir": "./"
    },
    "rules": {
      "@typescript-eslint/space-before-function-paren": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-non-null-assertion": "off"
    }
  }
  