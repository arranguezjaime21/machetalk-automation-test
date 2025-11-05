import { FakeData } from "../../helpers/faker.helper.js";


describe ("⚡️ Template Settings", async function () {
    this.timeout(90000);

 
    it ("Template Editing", async function () {
        const templateContent = FakeData.randomSentence();
        await templateSettings.editTemplate({
            content: templateContent,
        });
    });

    it ("Template Deletion", async function () {
        await templateSettings.deleteTemplate();
    });
})