import { LoginScreen } from "../../talk-screens/login.screen.js";
import { PermissionModal } from "../../talk-screens/permission.screen.js";
import { CallAppeal, CallSettings } from "../../talk-screens/search.screen.js";
import { handleSavePass } from "../../helpers/handleSavePassPopup.js";
import { Logout } from "../../talk-screens/mypage.screen.js";
import { user } from "../../test-data/user.js";

describe("E2E Call Settings and Update Call Appeal", function () {
  user.forEach((user) => {
  it ("user login, allow permission settings, update call settings and set call appeal", async function () {
    // --- Login ---
    await LoginScreen.gotoMailLogin();
    await LoginScreen.gotoMailSNS();
    await LoginScreen.loginMailButton();
    await LoginScreen.setCredentials({
      email: user.email,
      password: user.password,
    });
    await LoginScreen.submit();
    await driver.pause(5000);
    // --- Save Password ---
    await handleSavePass(driver);
    // --- Permission ---
    await PermissionModal.allowPermission();
    // --- Call Settings ---
    await CallSettings.searchNavOption();
    await CallSettings.searchCallSettings();
    await CallSettings.setCallSettings("enableAudioVideo"); 
    // --- Call Appeal ---
    await CallAppeal.callAppealIcon();
    await CallAppeal.setAppeal(0);  

    // --- Logout ---
    await Logout.userLogout();
  });
});
});