import { remote } from "webdriverio";
import { emulatorCaps } from "../../helpers/capabilities.js";
import { ScreenCallSettings } from "../../talk-screens/search.screen.js";


describe ("allow user call settings via search page", function () {
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

        ScreenCallSettings.driver = driver;
 
    });

    after(async function () {
         if (driver) {
            await driver.deleteSession();
         }
    });

    it ("disabling users video call settings", async function () {
        await ScreenCallSettings.searchNavOption();
        await ScreenCallSettings.searchCallSettings();
        await ScreenCallSettings.setCallSettings("disableVideoOnly");
    });

    it ("disabling users video and audio call settings", async function () {
        await ScreenCallSettings.searchCallSettings();
        await ScreenCallSettings.setCallSettings("disableAudioVideo");
    });

    it (" enabling users audio call settings ", async function () {
        await ScreenCallSettings.searchCallSettings();
        await ScreenCallSettings.setCallSettings("enableAudioCall");      
    });

    it (" enabling users video and audio call settings ", async function () {
        await ScreenCallSettings.searchCallSettings();
        await ScreenCallSettings.setCallSettings("enableAudioVideo");      
    });
});
