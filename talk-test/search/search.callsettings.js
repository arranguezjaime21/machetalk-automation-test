describe ("⚡️ Call Settings - Search Page", function () {
    this.timeout(90000);

    it ("disabling users video call settings", async function () {
        await callSettings.navSearchPage();
        await callSettings.callSettingsIcon();
        await callSettings.setCallSettings("disableVideoOnly");
    });

    it ("disabling users video and audio call settings", async function () {
        await callSettings.callSettingsIcon();
        await callSettings.setCallSettings("disableAudioVideo");
    });

    it (" enabling users audio call settings ", async function () {
        await callSettings.callSettingsIcon();
        await callSettings.setCallSettings("enableAudioCall");
    });

    it (" enabling users video and audio call settings ", async function () {
        await callSettings.callSettingsIcon();
        await callSettings.setCallSettings("enableAudioVideo");
    });
});
