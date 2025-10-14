import { CallSettings } from "../../talk-screens/search.screen.js";


describe ("Call Settings - Search Page", function () {
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
