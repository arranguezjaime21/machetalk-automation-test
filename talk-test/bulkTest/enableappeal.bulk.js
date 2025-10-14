import { LoginScreen } from "../../talk-screens/login.screen.js";
import { CallAppeal, CallSettings } from "../../talk-screens/search.screen.js";
import { PermissionModal } from "../../talk-screens/permission.screen.js";
import { users } from "../../test-data/bulkusers.js";
import { handleSavePass } from "../../helpers/handleSavePassPopup.js";
import { Logout } from "../../talk-screens/mypage.screen.js";


describe("Login multiple users and update call appeal", function () {
  this.timeout(120000);

  users.forEach((user, index) => {
    it (`(${index + 1}) login user and update call settings for user ${user.email}`, async function () {
        console.log(`End to end test for  ${user.email}`);
        // --- Login Flow ---
        await LoginScreen.gotoMailLogin();
        await LoginScreen.gotoMailSNS();
        await LoginScreen.loginMailButton();
        await LoginScreen.setCredentials({
            email: user.email,
            password: user.password,
        });
        await LoginScreen.submit();
        await driver.pause(5000);

        // --- Save Password Modal ---
        await handleSavePass(driver);

        // --- Permission ---
        await PermissionModal.allowPermission();

        // --- Call Settings --- 
        await CallSettings.searchNavOption();
        await CallSettings.searchCallSettings();
        await CallSettings.setCallSettings("enableAudioVideo");

        // --- Call Appeal ---
        await CallAppeal.callAppealIcon();
        await CallAppeal.setAppeal(2);
        
        // --- Logout ---
        await Logout.userLogout();
        await driver.pause(3000);
        
    });
  });  
});


    
