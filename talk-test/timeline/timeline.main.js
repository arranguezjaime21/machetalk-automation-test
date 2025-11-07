import { FakeData } from "../../helpers/faker.helper.js";

describe ("Timeline Page", function() {
//     it("Timeline Post Image", async function () {
//         const timelinetext = FakeData.randomSentence();
//         await timelinePosting.postImage({
//             content: timelinetext,
//         });
//     });
//     it("Timeline Post Gallery Image", async function () {
//         const timelinetext = FakeData.randomSentence();
//         await timelinePosting.postGallery({
//             content: timelinetext,
//         });
//    });
        it("Timeline Post Test", async function () {
                const timelinetext = FakeData.randomSentence();
                await timelinePosting.postTextOnly({
                    content: timelinetext,
                });
        });

})