import { remote } from "webdriverio";
import { emulatorCapsReset } from "../helpers/capabilities.js";
import { LoginScreen } from "../talk-screens/login.screen.js";
import { PermissionModal } from "../talk-screens/permission.screen.js";
import { Logout, MyPage } from "../talk-screens/mypage.screen.js";
import { CallAppeal, CallSettings, TemplateSettings } from "../talk-screens/search.screen.js";

export const mochaHooks = {
async beforeAll() {
    this.timeout(90000);

    global.driver = await remote({
      path: "/",
      port: 4723,
      hostname: "127.0.0.1",
      logLevel: "error",
      capabilities: emulatorCapsReset,
    });


    global.loginScreen = new LoginScreen(global.driver);
    global.permissionModal = new PermissionModal(global.driver);
    global.logout = new Logout(global.driver);
    global.myPage = new MyPage(global.driver);
    global.callAppeal = new CallAppeal(global.driver);
    global.callSettings = new CallSettings(global.driver);
    global.templateSettings = new TemplateSettings(global.driver);
    
},

async afterAll() {
    if (global.driver) {
        await global.driver.deleteSession();
        //console.log("🧹 Session closed");
    }
  },
};