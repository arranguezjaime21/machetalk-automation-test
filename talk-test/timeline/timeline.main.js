import { FakeData } from "../../helpers/faker.helper.js";

describe ("⚡️ Timeline Page", function() {
    this.timeout(90000);
    it("Timeline: Posting timeline base on inputted postType: text | camera | gallery", async function () {
        await timelinePosting.postTimeline({
            content: FakeData.randomSentence(),
            postType: 'text',
        });
    });
})