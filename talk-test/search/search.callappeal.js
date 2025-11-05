describe ("⚡️ Call Appeal", function () {
    this.timeout(90000);

    it ("updating call appeal 1", async function () {
        await callSettings.navSearchPage();
        await callAppeal.callAppealIcon();
        await callAppeal.setAppeal(0);
    });
   
});