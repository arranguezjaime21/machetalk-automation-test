describe ("Streaming Bonuses", function () {
    this.timeout(90000);

    it ("check function for streaming bonuses", async function () {
        await streamingBonus.streamBonuses();
    });
})