import { CallAppeal, CallSettings } from "../../talk-screens/search.screen.js";

describe ("Call Appeal", function () {
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