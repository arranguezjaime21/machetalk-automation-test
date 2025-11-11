import { FakeData } from "../../helpers/faker.helper.js";


describe ("⚡️ Template Settings", async function () {
    this.timeout(90000);

 
    it ("Search Page: Template Creation base on inputted templateType: text | camera | gallery", async function () {
        await templateSettings.templateCreation({
            content: FakeData.randomSentence(),
            templateType: 'text',
        });
    });
})