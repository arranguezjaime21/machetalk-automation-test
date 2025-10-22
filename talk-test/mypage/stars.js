describe ("Users Total Acquired Stars", function () {
    this.timeout(90000);

    it ("Check users acquired stars" , async function () {
        await stars.userStars();
    });
})