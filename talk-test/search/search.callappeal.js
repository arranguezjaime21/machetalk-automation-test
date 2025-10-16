describe ("Call Appeal", function () {
    this.timeout(90000);

    it ("updating call appeal 1", async function () {
        await callSettings.navSearchPage();
        await callAppeal.callAppealIcon();
        await callAppeal.setAppeal(0);
    });
    it ("updating call appeal 2", async function () {
        await callAppeal.callAppealIcon();
        await callAppeal.setAppeal(1);
    });
    it ("updating call appeal 3", async function () {
        await callAppeal.callAppealIcon();
        await callAppeal.setAppeal(2);
    });
    it ("updating call appeal 4", async function () {
        await callAppeal.callAppealIcon();
        await callAppeal.setAppeal(3);
    });
    it ("updating call appeal 5", async function () {
        await callAppeal.callAppealIcon();
        await callAppeal.setAppeal(4);
    });
    it ("updating call appeal 6", async function () {
        await callAppeal.callAppealIcon();
        await callAppeal.setAppeal(5);
    });
    it ("updating call appeal 7", async function () {
        await callAppeal.callAppealIcon();
        await callAppeal.setAppeal(6);
    });

});