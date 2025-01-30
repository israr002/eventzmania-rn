module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          api: "./src/api",
          assets: "./src/assets",
          components: "./src/components",
          constants: "./src/constants",
          context: "./src/context",
          hooks: "./src/hooks",
          i18n: "./src/i18n",
          navigation: "./src/navigation",
          screens: "./src/screens",
          styles: "./src/styles",
          tests: "./tests",
          types: "./src/types",
          utils: "./src/utils"
        }
      }
    ]
  ]
};
