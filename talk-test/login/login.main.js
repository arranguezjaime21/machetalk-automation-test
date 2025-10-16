import { handleSavePass } from "../../helpers/handleSavePassPopup.js";
import { user } from "../../test-data/user.js";



describe("⚡️ Login", function () {
  this.timeout(90000);

  it("Login Fail", async function () {
    await loginScreen.gotoMailLogin();
    await loginScreen.loginMailFlow({
      email: "asdadjhcs@mail.com",
      password: "admin",
    });

    const message = await loginScreen.errMessage();
    console.log("⚠️ error message shown:", message);

    if (message !== "•メールアドレスまたは、パスワードに誤りがあります。") {
      throw new Error(`⚠️ unexpected error message: ${message}`);
    }
  });

  user.forEach((user) => {
  it("Login Successfully", async function () {
    await loginScreen.loginMailFlow({
      email: user.email,
      password: user.password,
    });
    await driver.pause(3000);

    await handleSavePass(driver);
      
    const permissionDialog = await driver.$('id=com.fdc_machetalk_broadcaster:id/ll_permission_dialog');
    const permissionShow = await permissionDialog.isDisplayed().catch(() => false);
      if (!permissionShow) {
           throw new Error("⚠️ login fail - permission is not visible");
        }
        console.log("🛠️ permission dialog is visible - user successfully login");
  });
  });
});
