import { FakeData } from "../../helpers/faker.helper.js";

describe ("⚡️ Mypage Template Settings", function () {
  this.timeout(1200000);


  it("Create Template with image upload via device gallery", async function () {
    await myPageTemplate.templateCreation({
      content: FakeData.randomSentence(),
      templateType: "gallery",
    });
  });

})