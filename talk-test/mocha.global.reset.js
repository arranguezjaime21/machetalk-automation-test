import { remote } from "webdriverio";
import { emulatorCapsReset } from "../helpers/capabilities.js";
import { LoginScreen } from "../talk-screens/login.screen.js";
import { PermissionModal } from "../talk-screens/permission.screen.js";
import { CallAppeal, CallSettings } from "../talk-screens/search.screen.js";
import { Logout } from "../talk-screens/mypage.screen.js";




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

    //add test files
    LoginScreen.driver = global.driver;
    PermissionModal.driver = global.driver;
    CallSettings.driver = global.driver;
    CallAppeal.driver = global.driver;
    Logout.driver = global.driver;
},

async afterAll() {
    if (global.driver) {
        await global.driver.deleteSession();
    }
  },
};