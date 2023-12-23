// module.exports = function(api) {
//   api.cache(true);
//   return {
//      presets: [
//         'babel-preset-expo',
//         'module:react-native-dotenv',
//      ]
//   };
// };

module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    [
      'babel-preset-expo',
      {
        jsxRuntime: 'automatic',
        importSource: 'react',
      },
    ],
  ],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
          '@components': './components',
          '@screens': './screens',
          '@utils': './utils',
          '@assets': './assets',
          '@context': './context',
        },
      },
    ],
  ],
}
