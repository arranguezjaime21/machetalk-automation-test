import { FakeData } from "../../helpers/faker.helper.js";


describe ("⚡️ Template Settings", async function () {
    this.timeout(90000);

    it ("Template creation via search page tab", async function () {
        await templateSettings.navTemplateCard();
        const templateContent = FakeData.randomSentence();
        await templateSettings.createTextTemplate({
            content: templateContent,
        });
        console.log("Successfully created template with content:", templateContent);
    });
    it ("Template creation with Text and Image", async function () {
        await templateSettings.navTemplateCard();
        const templateContent = FakeData.randomSentence();
        await templateSettings.createImageAndTextTemplate({
            content: templateContent,
        });
    });
    
})