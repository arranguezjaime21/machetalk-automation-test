import { remote } from "webdriverio";
import { CallAppeal, CallSettings } from "../../talk-screens/search.screen.js";
import { emulatorCaps } from "../../helpers/capabilities.js";


describe ("update call appeal in search page", function () {
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

        CallAppeal.driver = driver;
        CallSettings.driver = driver;

 
    });

    after(async function () {
         if (driver) {
            await driver.deleteSession();
         }
    });

    it ("updating call appeal 1", async function () {
        await CallSettings.searchNavOption();
        await CallAppeal.callAppealIcon();
        await CallAppeal.setAppeal(0);
    });
    it ("updating call appeal 2", async function () {
        await CallAppeal.callAppealIcon();
        await CallAppeal.setAppeal(1);
    });
    it ("updating call appeal 3", async function () {
        await CallAppeal.callAppealIcon();
        await CallAppeal.setAppeal(2);
    });
    it ("updating call appeal 4", async function () {
        await CallAppeal.callAppealIcon();
        await CallAppeal.setAppeal(3);
    });
    it ("updating call appeal 5", async function () {
        await CallAppeal.callAppealIcon();
        await CallAppeal.setAppeal(4);
    });
    it ("updating call appeal 6", async function () {
        await CallAppeal.callAppealIcon();
        await CallAppeal.setAppeal(5);
    });
    it ("updating call appeal 7", async function () {
        await CallAppeal.callAppealIcon();
        await CallAppeal.setAppeal(6);
    });

});