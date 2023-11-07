// import PropTypes from 'prop-types';
// import * as StandardModule from 'react-native';
//
// // Text.propTypes is deprecated too... react-native-multiple-select uses this as of Jul/18/2022
// StandardModule.Text.propTypes = PropTypes.shape(StandardModule.TextStyle);
//
// const deprecatedProps = {
//   ViewPropTypes: require('deprecated-react-native-prop-types/DeprecatedViewPropTypes'),
//   ColorPropType: require('deprecated-react-native-prop-types/DeprecatedColorPropType'),
//   EdgeInsetsPropType: require('deprecated-react-native-prop-types/DeprecatedEdgeInsetsPropType'),
//   PointPropType: require('deprecated-react-native-prop-types/DeprecatedPointPropType'),
// };
//
// // Had to use a proxy because ...StandardModule made think react-native that all modules were
// // being used and was triggering some unnecessary validations / native dep checks.
// // This prevents that from happening.
// const objProx = new Proxy(StandardModule, {
//   get(obj, prop) {
//     if (prop in deprecatedProps) {
//       return deprecatedProps[prop];
//     }
//     return StandardModule[prop];
//   },
// });
//
// module.exports = objProx;

// import * as StandardModule from 'react-native';
//
// const deprecatedProps = {
//   ImagePropTypes: require('deprecated-react-native-prop-types/DeprecatedImagePropType'),
//   TextPropTypes: require('deprecated-react-native-prop-types/DeprecatedTextPropTypes'),
//   ViewPropTypes: require('deprecated-react-native-prop-types/DeprecatedViewPropTypes'),
//   ColorPropType: require('deprecated-react-native-prop-types/DeprecatedColorPropType'),
//   EdgeInsetsPropType: require('deprecated-react-native-prop-types/DeprecatedEdgeInsetsPropType'),
//   PointPropType: require('deprecated-react-native-prop-types/DeprecatedPointPropType'),
// };
//
// const imgProx = new Proxy(StandardModule.Image, {
//   get(obj, prop) {
//     if (prop === 'propTypes') {
//       return deprecatedProps.ImagePropTypes;
//     }
//     return Reflect.get(...arguments);
//   },
// });
//
// const txtProx = new Proxy(StandardModule.Text, {
//   get(obj, prop) {
//     if (prop === 'propTypes') {
//       return deprecatedProps.TextPropTypes;
//     }
//     return Reflect.get(...arguments);
//   },
// });
//
// // Had to use a proxy because ...StandardModule made think react-native that all modules were
// // being used and was triggering some unnecessary validations / native dep checks.
// // This prevents that from happening.
// const objProx = new Proxy(StandardModule, {
//   get(obj, prop) {
//     if (prop in deprecatedProps) {
//       return deprecatedProps[prop];
//     }
//     if (prop === 'Image') {
//       return imgProx;
//     }
//     if (prop === 'Text') {
//       return txtProx;
//     }
//     return Reflect.get(...arguments);
//   },
// });
//
// module.exports = objProx;

import * as StandardModule from 'react-native';

// And let's stub out everything that's missing!

delete StandardModule.ViewPropTypes;

delete StandardModule.ColorPropType;

delete StandardModule.EdgeInsetsPropType;

delete StandardModule.PointPropType;

module.exports = {
  ...StandardModule,

  get ViewPropTypes() {
    return require('deprecated-react-native-prop-types/DeprecatedViewPropTypes');
  },

  get ColorPropType() {
    return require('deprecated-react-native-prop-types/DeprecatedColorPropType');
  },

  get EdgeInsetsPropType() {
    return require('deprecated-react-native-prop-types/DeprecatedEdgeInsetsPropType');
  },

  get PointPropType() {
    return require('deprecated-react-native-prop-types/DeprecatedPointPropType');
  },
};
