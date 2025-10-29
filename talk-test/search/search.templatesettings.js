import { FakeData } from "../../helpers/faker.helper.js";


describe ("⚡️ Template Settings", async function () {
    this.timeout(90000);

    // it ("Template creation via search page tab", async function () {
    //     const templateContent = FakeData.randomSentence();
    //     await templateSettings.createTextTemplate({
    //         content: templateContent,
    //     });
    //     console.log("Successfully created template with content:", templateContent);
    // });
    // it ("Template with text and image via camera roll", async function () {
    //     const templateContent = FakeData.randomSentence();
    //     await templateSettings.createImageAndTextTemplate({
    //         content: templateContent,
    //     });
    // });
    // it ("Template with text and image via device gallery", async function () {
    //     const templateContent = FakeData.randomSentence();
    //     await templateSettings.createTemplateImageGallery({
    //         content: templateContent,
    //     });
    // });
    // it ("Template Deletion", async function () {
    //     await templateSettings.deleteTemplate();
    // });
    // it ("Template Editing", async function () {
    //     const templateContent = FakeData.randomSentence();
    //     await templateSettings.editTemplate({
    //         content: templateContent,
    //     });
    // });



    it ("send template", async function () {
        await attackTab.sendTemplate();
    })
  
    
})