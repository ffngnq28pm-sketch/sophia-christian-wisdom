// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "dist-gh/*", ".expo/*"],
  },
  {
    rules: {
      // Inadapté à React Native : cette règle vise le rendu HTML web, or
      // <Text> ne rend pas d'entités HTML. Bruyant avec le texte français.
      "react/no-unescaped-entities": "off",
    },
  },
]);
