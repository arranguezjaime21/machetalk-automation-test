import { handleSavePass } from "../../helpers/handleSavePassPopup.js";
import { user } from "../../test-data/user.js";

describe("⚡️ E2E Call Settings and Update Call Appeal", function () {
  this.timeout(90000);

  user.forEach((user) => {
  it ("Login and update call appeal", async function () {
    // --- Login ---
    await loginScreen.gotoMailLogin();
    await loginScreen.loginMailFlow ({
      email: user.email,
      password: user.password,
    });
    await driver.pause(5000);
    // --- Save Password ---
    await handleSavePass(driver);
    // --- Permission ---
    await
     permissionModal.allowPermission();
    // --- Call Settings ---
    await callSettings.navSearchPage()
    await callSettings.callSettingsIcon();
    await callSettings.setCallSettings("enableAudioVideo");
    // --- Call Appeal ---
    await callAppeal.callAppealIcon();
    await callAppeal.setAppeal(3);

    // --- Logout ---
    await logout.userLogout();
  });
});
});