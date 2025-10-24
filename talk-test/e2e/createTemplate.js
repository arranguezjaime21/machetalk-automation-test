import { handleSavePass } from "../../helpers/handleSavePassPopup.js";
import { FakeData } from "../../helpers/faker.helper.js";
import { user } from "../../test-data/user.js";

describe ("⚡️ Template Creation in search page", function () {
    this.timeout(90000);

    user.forEach((user) => {
        it("Login user and create a template", async function () {
            // --- Login ---
            await loginScreen.gotoMailLogin();
            await loginScreen.loginMailFlow({
                email: user.email,
                password: user.password,
            });
            await driver.pause(5000);

            // --- Save Pass Helper ---
            await handleSavePass(driver);

            // --- Allow Permission ---
            await permissionModal.allowPermission();

            // --- Template Deletion ---
            await templateSettings.navTemplateCard();
            await templateSettings.deleteTemplate();

            // --- Template Creation ---
            await templateSettings.navTemplateCard();
            const templateDescription = FakeData.randomSentence();
            await templateSettings.createImageAndTextTemplate({
                content: templateDescription,
            });
            // --- Logout ---
            await logout.userLogout();
        });
    })
})