import { FakeData } from "../../helpers/faker.helper.js";

describe ("Mypage Template Settings", function () {
  this.timeout(90000);
  it ("Template Settings in Mypage", async function () {
    const desc = FakeData.randomSentence();  
    await myPageTemplate.createTextTemplate({
        content: desc,
      });
  });
})