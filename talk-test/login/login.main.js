import { LoginScreen } from "../../talk-screens/login.screen.js";
import { handleSavePass } from "../../helpers/handleSavePassPopup.js";
import { user } from "../../test-data/user.js";



describe("Login", function () {
  this.timeout(90000);
  
  it("error message should be displayed!!", async function () {
    await LoginScreen.gotoMailLogin();
    await LoginScreen.gotoMailSNS();
    await LoginScreen.loginMailButton();

    await LoginScreen.setCredentials({
      email: "adjskdjsk@mail.com",
      password: "admin",
    });
    await LoginScreen.submit();

    const message = await LoginScreen.getErrorMessage();
    console.log("error message shown:", message);

    if (message !== "•メールアドレスまたは、パスワードに誤りがあります。") {
      throw new Error(`unexpected error message: ${message}`);
    }
  });

  it ("user cant login by inputting email only", async function () {
    await LoginScreen.setCredentials({
      email: "adjskdjsk@mail.com",
      password: "",
    });
    await LoginScreen.submitisEnabled();
  });

  it ("user cant login by inputting password only", async function () {
    await LoginScreen.setCredentials({
      email: "",
      password: "admin",
    });
    await LoginScreen.submitisEnabled();
  });

  user.forEach((user) => {
  it("user should login using email and password!!", async function () {
    await LoginScreen.setCredentials({
      email: user.email,
      password: user.password,
    });
    await LoginScreen.submit();
    await driver.pause(3000);

    await handleSavePass(driver);
      
    const permissionDialog = await driver.$('id=com.fdc_machetalk_broadcaster:id/ll_permission_dialog');
    const permissionShow = await permissionDialog.isDisplayed().catch(() => false);
      if (!permissionShow) {
           throw new Error("login fail - permission is not visible");
        }
        console.log("permission dialog is visible - user successfully login");
        
  });
  });
});
