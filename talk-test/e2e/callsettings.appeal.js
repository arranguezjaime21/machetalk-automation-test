import { remote } from "webdriverio";
import { LoginScreen } from "../../talk-screens/login.screen.js";
import { PermissionModal } from "../../talk-screens/permission.screen.js";
import { ScreenCallAppeal, ScreenCallSettings } from "../../talk-screens/search.screen.js";
import { emulatorCapsReset } from "../../helpers/capabilities.js";

describe("end to end test for user login and set call appeal with enabled call settings", function () {
  let driver;

  this.timeout(60000);

  before(async function () {
    driver = await remote({
      path: "/",
      port: 4723,
      hostname: "127.0.0.1",
      logLevel: "error",
      capabilities: emulatorCapsReset,
    });

    LoginScreen.driver = driver;
    PermissionModal.driver = driver;
    ScreenCallAppeal.driver = driver;
    ScreenCallSettings.driver = driver;
    
  });

  after(async function () {
    if (driver) {
        await driver.deleteSession();
    }
  });
  it ("user login, allow permission settings, update call settings and set call appeal", async function () {
    //navigate login sns screen
    await LoginScreen.gotoMailLogin();
    await LoginScreen.gotoMailSNS();
    await LoginScreen.loginMailButton();
    //login user account with user credentials
    await LoginScreen.setCredentials({
      email: "motivation@mail.com",
      password: "admin",
    });
    await LoginScreen.submit();
    await driver.pause(5000);

    //allow app permissions camera/mic/bluetooth and notification
    await PermissionModal.allowPermission();
    //navigate search page
    await ScreenCallSettings.searchNavOption();
    //select call settings and turn on voice video settings
    await ScreenCallSettings.searchCallSettings();
    await ScreenCallSettings.setCallSettings("enableAudioVideo"); 
    //set user appeal
    await ScreenCallAppeal.callAppealIcon();
    await ScreenCallAppeal.setAppeal(0);  
  });
});