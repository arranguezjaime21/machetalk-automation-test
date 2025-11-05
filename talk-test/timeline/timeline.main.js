import { FakeData } from "../../helpers/faker.helper.js";

describe ("Timeline Page", function() {
    it("Timeline Post Image", async function () {
        await timelinePage.navTimeline();
        const timelinetext = FakeData.randomSentence();
        await timelinePage.postImage({
            content: timelinetext,
        });
    })
})