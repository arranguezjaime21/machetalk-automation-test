import { remote } from "webdriverio";
import { LoginScreen } from "../../talk-screens/login.screen.js";
import { emulatorCapsReset } from "../../helpers/capabilities.js";



describe("talk login flow", function () {
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
  });

  after(async function () {
    if (driver) {
        await driver.deleteSession();
    }
  });

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
    await LoginScreen.submitButtonStatus();
  });

  it ("user cant login by inputting password only", async function () {
    await LoginScreen.setCredentials({
      email: "",
      password: "admin",
    });
    await LoginScreen.submitButtonStatus();
  });

  it("user successfully login using email and password!!", async function () {
    await LoginScreen.setCredentials({
      email: "motivation@mail.com",
      password: "admin",
    });
    await LoginScreen.submit();
    await driver.pause(5000);

    const permissionDialog = await driver.$('id=com.fdc_machetalk_broadcaster:id/ll_permission_dialog');
    const permissionShow = await permissionDialog.isDisplayed();

        if (!permissionShow) {
           throw new Error("login fail - permission is not visible");
        }
  });
});
