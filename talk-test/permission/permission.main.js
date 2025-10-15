describe ("App Permission", function () {
    this.timeout(90000);

    it ("allowing app permission", async function () {
        await permissionModal.allowPermission();
    });

});
