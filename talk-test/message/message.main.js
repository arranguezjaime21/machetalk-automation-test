describe ("⚡️ Message Screen",function () {
    this.timeout(90000);

    it("should navigate message page", async function () {
        await messageScreen.navMessagePage();
    });
    
})