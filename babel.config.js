module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['module-resolver', {
      alias: {
        components: './src/components',
        i18n: './src/i18n',
        assets: './src/assets',
        screens: './src/screens',
        navigation: './src/navigation',
        tests: './tests',
      },
    }],
  ],
};
