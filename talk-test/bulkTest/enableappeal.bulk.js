import { remote } from "webdriverio";
import { emulatorCapsReset } from "../../helpers/capabilities.js";
import { LoginScreen } from "../../talk-screens/login.screen.js";
import { CallAppeal, CallSettings } from "../../talk-screens/search.screen.js";
import { PermissionModal } from "../../talk-screens/permission.screen.js";
import { users } from "../../test-data/bulkusers.js";
import { handleSavePass } from "../../helpers/handleSavePassPopup.js";
import { Logout } from "../../talk-screens/mypage.screen.js";


describe("Login multiple users and update call appeal", function () {
  let driver;
    
  this.timeout(120000);

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
    CallSettings.driver = driver;
    CallAppeal.driver = driver;
    Logout.driver = driver;
  });

  after(async function () {
    if (driver) {
        await driver.deleteSession();
    }
  });


  users.forEach((users, index) => {
    it (`(${index + 1}) login user and update call settings for user ${users.email}`, async function () {
        console.log(`End to end test for  ${users.email}`);
        //NAVIGATE LOGIN SCREEN
        await LoginScreen.gotoMailLogin();
        await LoginScreen.gotoMailSNS();
        await LoginScreen.loginMailButton();
        //INPUT USER CREDENTIALS
        await LoginScreen.setCredentials({
            email: users.email,
            password: users.password,
        });
        await LoginScreen.submit();
        await driver.pause(5000);

        //HANDLING FOR SAVE PASS POPUP MODAL
        await handleSavePass(driver);

        //ALLOW PERMISSION
        await PermissionModal.allowPermission();

        //ENABLE CALL SETTINGS
        await CallSettings.searchNavOption();
        await CallSettings.searchCallSettings();
        await CallSettings.setCallSettings("enableAudioVideo");

        //UPDATE CALL APPEAL
        await CallAppeal.callAppealIcon();
        await CallAppeal.setAppeal(2);
        
         //logout user
        await Logout.userLogout();
        await driver.pause(3000);
        
    });
  });  
});


    
