import { FakeData } from "../../helpers/faker.helper.js";

describe ("Timeline", function () {
    this.timeout(90000);
    
    it ("Timeline post image", async function () {
        const postText = await FakeData.randomSentence();
        await timelinePage.timelinePost({
            postMsg: postText,
        });
    })
})