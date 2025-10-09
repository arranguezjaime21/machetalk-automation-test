import { remote } from "webdriverio";
import { emulatorCaps } from "../../helpers/capabilities.js";
import { CallSettings } from "../../talk-screens/search.screen.js";


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

        CallSettings.driver = driver;
 
    });

    after(async function () {
         if (driver) {
            await driver.deleteSession();
         }
    });

    it ("disabling users video call settings", async function () {
        await CallSettings.searchNavOption();
        await CallSettings.searchCallSettings();
        await CallSettings.setCallSettings("disableVideoOnly");
    });

    it ("disabling users video and audio call settings", async function () {
        await CallSettings.searchCallSettings();
        await CallSettings.setCallSettings("disableAudioVideo");
    });

    it (" enabling users audio call settings ", async function () {
        await CallSettings.searchCallSettings();
        await CallSettings.setCallSettings("enableAudioCall");      
    });

    it (" enabling users video and audio call settings ", async function () {
        await CallSettings.searchCallSettings();
        await CallSettings.setCallSettings("enableAudioVideo");      
    });
});
