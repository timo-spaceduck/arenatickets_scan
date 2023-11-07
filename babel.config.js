const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['.'],
        resolvePath(sourcePath, currentFile, opts) {
          if (
            sourcePath === 'react-native' &&
            !(
              (
                currentFile.includes('node_modules/react-native/') || // macos/linux paths
                currentFile.includes('node_modules\\react-native\\')
              ) // windows path
            ) &&
            !(
              currentFile.includes('resolver/react-native/') ||
              currentFile.includes('resolver\\react-native\\')
            )
          ) {
            return path.resolve(__dirname, 'resolver/react-native');
          }
          /**
           * The `opts` argument is the options object that is passed through the Babel config.
           * opts = {
           *   extensions: [".js"],
           *   resolvePath: ...,
           * }
           */
          return undefined;
        },
      },
    ],
    // [
    //   'module-resolver',
    //   {
    //     root: ['.'],
    //     resolvePath(sourcePath, currentFile) {
    //       console.log('sourcePath');
    //       console.log(sourcePath);
    //       if (
    //         sourcePath === 'react-native' &&
    //         currentFile.includes('react-native-camera/src/RNCamera.js')
    //       ) {
    //         console.log('resolver', sourcePath, currentFile);
    //         return path.resolve(__dirname, 'resolver/react-native');
    //       }
    //     },
    //   },
    // ],
  ],
};
