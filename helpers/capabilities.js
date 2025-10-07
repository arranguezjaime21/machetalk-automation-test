export const emulatorCaps = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "emulator-5554",
  "appium:appPackage": "com.fdc_machetalk_broadcaster",
  "appium:appActivity": "com.fdc_machetalk_broadcaster.Activity.RootActivity",
  "appium:noReset": true
};


export const emulatorCapsReset = Object.assign({}, emulatorCaps, {
  "appium:noReset": false,
});
