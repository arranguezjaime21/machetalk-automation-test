import { FakeData } from "../../helpers/faker.helper.js";

describe ("⚡️ Timeline Page", function() {
    it("Timeline: Posting text and verifying upload status and display", async function () {
        const timelinetext = FakeData.randomSentence();
        await timelinePosting.postTextOnly({
            content: timelinetext,
        });
    });

    it("Timeline: Posting timeline image via camera roll", async function () {
        const timelinetext = FakeData.randomSentence();
        await timelinePosting.postImage({
            content: timelinetext,
        });
    });
    it("Timeline: Posting timeline image via device gallery", async function () {
        const timelinetext = FakeData.randomSentence();
        await timelinePosting.postGallery({
            content: timelinetext,
        });
    });
   
})