# for development
yarn react-native start

# in second terminal to launch simulator
npx react-native run-ios
npx react-native run-android

source ~/.bash_profile 
adb devices

iOS autolinking: // after each library install
npx pod-install ios
cd ios
rm -rf Pods 
pod install

View proptypes problem
https://stackoverflow.com/questions/72755476/invariant-violation-viewproptypes-has-been-removed-from-react-native-migrate-t

To apply all patches: - should be automatic, added postinstall in package.json
npx patch-package

Generate bundle
cd android && ./gradlew bundleRelease

will be found:
android/app/build/outputs/bundle/release/app-release.aab



cd android && ./gradlew assembleRelease
./gradlew assembleRelease --warning-mode=all
android/app/build/outputs/apk/release/app-release.apk


if error: failed to install the app. make sure you have the android development environment set up
cd android && ./gradlew clean
chmod +x gradlew
