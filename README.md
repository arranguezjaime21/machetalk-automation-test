# appium-automation-tests
Automated tests for MacheTalk using Appium + Mocha

appium locator setup
=====================
{
  "platformName": "Android",
  "appium:deviceName": "R58R80ZGHPH",
  "appium:appPackage": "com.fdc_machetalk_broadcaster",
  "appium:appActivity": "com.fdc_machetalk_broadcaster.Activity.RootActivity",
  "appium:automationName": "UiAutomator2"
}

====================
check app locator > adb shell am start -n com.fdc_machetalk_broadcaster/com.fdc_machetalk_broadcaster.Activity.RootActivity
check device id for ANDROID > adb devices
check device current state (to get app package and activity)  > adb shell dumpsys window | grep -E "mCurrentFocus"
------------------------------------------------> end here <---------------------------------------------------------------

setup new project from scratch [via terminal] installation and dependencies 
=========================
create folder > mkdir [project name]
open created folder > cd [project name]
initialize NPM - npm init -y
web driver io - npm instal webdriverio appium --save-dev
mocha framewrok - npm install mocha chai --save-dev
appium - appium driver install uiautomator2

helper for emulator 
========================
export const emulatorCaps = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "emulator-5554",
  "appium:appPackage": "com.fdc_machetalk_broadcaster",
  "appium:appActivity": "com.fdc_machetalk_broadcaster.ui.splash.SplashActivity",
  "appium:noReset": true
};

export const emulatorCapsReset = Object.assign({}, emulatorCaps, {
  "appium:noReset": false,
});
------------------------------------------------> end here <---------------------------------------------------------------

APPIUM INSTALLTION AND SETUP AUTOMATION GLOBALLY ON TERMINAL 
DOWNLOAD!
> APPIUM inspector - for locator id/path/element
> ANDROID STUDIO - for virtual device only 
> VSCODE - for IDE

===========================>
SETUP ENVIRONTMENT 
- nano ~/.zshrc
- export ANDROID_HOME=$HOME/Library/Android/sdk
- export PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH
- source ~/.zshrc
- adb --version
===========================>
node installation
- install node.js
- version node -v (checking version)
- install JDK
- version java -version (checking version)
===========================>
Appium installation and webdriverio
- install appium
- npm install -g appium
- appium -v
appium drivers
android -- appium driver install uiautomator2
ios -- appium driver install xcuitest
appim inspector - install appium inspector
------------------------------------------------> end here <---------------------------------------------------------------
  
npx mocha [testfile] --timeout 60000


🔄 Pull latest changes	git pull origin main	Update your local copy before editing
🌱 Create a new branch	git checkout -b feature/login-tests	Work on new tests without breaking main
✍️ Make changes	edit files	Add/update tests, helpers, config
💾 Save changes	git add . && git commit -m "added login screen test"	Commit your work
🚀 Push to GitHub	git push origin feature/login-tests	Upload your branch
🔍 Open a Pull Request	on GitHub	Ask for review/merge into main

GITHUB 
git init - install github
git remote add origin [githublink]
git remote -v - check github version 
git status - checking changes before commiting
git add - add chnages file to commit 
git commit -m "sample" - remarks for file to commit 
git push origin main - oush changes to main 

git pull --rebase origin main - pull main to local 


========================== BEFORE ASYNC FUNCTION ===============================
       driver = await remote({
      path: "/",
      port: 4723,
      hostname: "127.0.0.1",
      logLevel: "error",
      capabilities: emulatorCapsReset,
========================== BEFORE ASYNC FUNCTION ===============================












