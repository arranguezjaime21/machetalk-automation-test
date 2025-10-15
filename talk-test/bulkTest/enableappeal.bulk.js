import { users } from "../../test-data/bulkusers.js";
import { handleSavePass } from "../../helpers/handleSavePassPopup.js";

describe("Login multiple users and update call appeal", function () {
  this.timeout(120000);

  users.forEach((user, index) => {
    it (`(${index + 1}) login user and update call settings for user ${user.email}`, async function () {
        console.log(`End to end test for  ${user.email}`);
        // --- Login Flow ---
        await loginScreen.gotoMailLogin();
        await loginScreen.loginMailFlow({
            email: user.email,
            password: user.password,
        });
        await driver.pause(5000);

        // --- Save Password Modal ---
        await handleSavePass(driver);

        // --- Permission ---
        await permissionModal.allowPermission();

        // --- Call Settings --- 
        await callSettings.navSearchPage();
        await callSettings.callSettingsIcon();
        await callSettings.setCallSettings("enableAudioVideo");

        // --- Call Appeal ---
        await callAppeal.callAppealIcon();
        await callAppeal.setAppeal(2);
        
        // --- Logout ---
        await logout.userLogout();
        await driver.pause(3000);
        
    });
  });  
});


    
