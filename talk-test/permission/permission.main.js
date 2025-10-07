import { remote } from "webdriverio";
import { emulatorCaps } from "../../helpers/capabilities.js";
import { PermissionModal } from "../../talk-screens/permission.screen.js";




describe ("allow app permission", function () {
    let driver;

    this.timeout(60000);

    before(async function () {
        driver = await remote ({
            path: "/",
            port: 4723,
            hostname: "127.0.0.1",
            logLevel: "error",
            capabilities: emulatorCaps,
        });

        PermissionModal.driver = driver;
 
    });

    after(async function () {
         if (driver) {
            await driver.deleteSession();
         }
    });

    it ("allowing app permission via permission modal", async function () {
        await PermissionModal.allowPermission();
    });


});
