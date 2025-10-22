import { remote } from "webdriverio";
import { emulatorCaps } from "../helpers/capabilities.js";
import { PermissionModal } from "../talk-screens/permission.screen.js";
import { LoginScreen } from "../talk-screens/login.screen.js";
import { CallAppeal, CallSettings, TemplateSettings } from "../talk-screens/search.screen.js";
import { Logout, MyPage, MyPageTemplate, Stars } from "../talk-screens/mypage.screen.js";




export const mochaHooks = {
async beforeAll() {
    this.timeout(90000);

    global.driver = await remote({
      path: "/",
      port: 4723,
      hostname: "127.0.0.1",
      logLevel: "error",
      capabilities: emulatorCaps,
    });

    global.loginScreen = new LoginScreen(global.driver);
    global.permissionModal = new PermissionModal(global.driver);
    global.callSettings = new CallSettings(global.driver);
    global.callAppeal = new CallAppeal(global.driver);
    global.logout = new Logout(global.driver);
    global.myPage = new MyPage(global.driver);
    global.stars = new Stars(global.driver);
    global.templateSettings = new TemplateSettings(global.driver);
    global.myPageTemplate = new MyPageTemplate(global.driver);
},

async afterAll() {
    if (global.driver) {
        await global.driver.deleteSession();
    }
  },
};