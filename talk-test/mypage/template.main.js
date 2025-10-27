import { FakeData } from "../../helpers/faker.helper.js";

describe ("⚡️ Mypage Template Settings", function () {
  this.timeout(90000);
  // it ("Create template with image upload via camera roll", async function () {
  //   const desc = FakeData.randomSentence();  
  //   await myPageTemplate.createTextCaptureTemplate({
  //       content: desc,
  //     });
  // });

  it("Create Template with image upload via device gallery", async function () {
    const desc = FakeData.randomSentence();
    await myPageTemplate.creatTextGalleryTemplate({
      content: desc,
    });
  });
  
})