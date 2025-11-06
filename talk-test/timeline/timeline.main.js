import { FakeData } from "../../helpers/faker.helper.js";

describe ("Timeline Page", function() {
    it("Timeline Post Image", async function () {
        const timelinetext = FakeData.randomSentence();
        await timelinePage.postImage({
            content: timelinetext,
        });
    });
    it("Timeline Post Gallery Image", async function () {
        const timelinetext = FakeData.randomSentence();
        await timelinePage.postGallery({
            content: timelinetext,
        });
   });
})