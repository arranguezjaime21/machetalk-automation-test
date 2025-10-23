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

    await loginScreen.errMessage("•メールアドレスまたは、パスワードに誤りがあります。");
  });

  user.forEach((user) => {
  it("Login Successfully", async function () {
    await loginScreen.gotoMailLogin();
    await loginScreen.loginMailFlow({
      email: user.email,
      password: user.password,
    });
    await driver.pause(3000);
    await handleSavePass(driver);
    await loginScreen.permissionisVisible();

  });
  });
});
