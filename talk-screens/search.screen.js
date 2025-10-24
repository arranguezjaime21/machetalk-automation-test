import { AppealOption } from "../config/callappeal.config.js";
import { callSettingsConfig } from "../config/callsettings.js";
import { BasePage } from "./base.screen.js";
import { CameraHelper } from "../helpers/camera.helper.js";
import { SearchScreenSelectors, TemplateSelectors } from "../talk-selectors/selectors.js";


// call settings 
export class CallSettings extends BasePage { 
    constructor(driver) {
        super(driver);
        this.selectors = SearchScreenSelectors;

    }

    async navSearchPage() { 
        await this.waitAndClick(this.selectors.searchPageNav);
    }

    async callSettingsIcon() {
        await this.waitAndClick(this.selectors.callSettingsBtn);
    } 

    async handleCallSettings({ buttonID, enableStatus, disableStatus, currentStatus }) {                        
        const button = await this.driver.$(`id=${buttonID}`);
        const status = await this.waitAndFind(this.selectors.callSettingsStatus, 5000);
        const getStatus = await status.getAttribute("text");
        

            if (enableStatus.includes(getStatus)) {
                await button.waitForDisplayed({timeout:5000});
                await button.click();
            } else if (disableStatus.includes(getStatus)) {
                console.log(currentStatus);
                const close = await this.waitAndClick(this.selectors.closedBtn);
            } else {
                console.log(`⚠️ unexpected error state: ${getStatus}`);
            }
    }

    async setCallSettings (settingName) {
        if (!callSettingsConfig[settingName]) {
            throw new Error (`⚠️ unknown call setting: ${settingName}`);
        } 
        await this.handleCallSettings(callSettingsConfig[settingName]);
    }
}

// --- Set Call Appeal ---
export class CallAppeal extends BasePage {
    constructor(driver) {
        super(driver);
        this.selectors = SearchScreenSelectors;
        this.callSettings = new CallSettings(driver);
    }

    async callAppealIcon () {
        await this.waitAndClick(this.selectors.appealIcon);
    }

    async selectAppeal ({ btnID, name }) {
        const btnAppeal = await this.waitAndFind(btnID, 2000);
        if (!btnAppeal) throw new Error (`⚠️ Appeal button not found: ${btnID}`);
        await btnAppeal.click();
       
        const isVisible = await this.elementExists(this.selectors.callSettingsVisible, 2000);
        if (isVisible) {
            console.log("🛠️ call settings is off, turning on....");
            await callSettings.setCallSettings("enableAudioVideo");
        } 

        const toast = await this.waitAndFind(this.selectors.toastMessage, 2000);
        if (toast) {
            const toastText = await toast.getAttribute("text").catch(() => "(no toast text)" );
            console.log(`Appeal "${name}" set successfully — Toast: ${toastText}`)
        } else {
            console.warn("⚠️ Toast message not visible or disappeared too quickly.");
        }
    }

    async setAppeal (settingIndex) {
        const appeal = AppealOption[settingIndex];
        if (!appeal) {
            throw new Error (`⚠️ Unknown call setsting: ${settingIndex}`);
        } 
        await this.selectAppeal(appeal);
    }
    
}

export class TemplateSettings extends BasePage{ 
    constructor(driver) {
        super(driver);
        this.driver = driver;
        this.selectors = TemplateSelectors;
        this.cameraHelper = new CameraHelper(
            this.driver, 
            this.waitAndClick.bind(this), 
            this.waitAndFind.bind(this), 
            this.waitAndFind$$.bind(this),
        );
        this.callSettings = new CallSettings(driver);
    }

    async navTemplateCard () {
       try {
            await this.callSettings.navSearchPage();
            await this.waitAndClick(this.selectors.templateIcon, 5000);
        } catch {
            return;
        }
    }

    async templateTitle (expectedTitle) {
        const title = await this.waitAndGetText(this.selectors.templateTitle);

        if (title !== expectedTitle) {
            throw new Error (`Incorrect wording is displayed. Expected: "${expectedTitle}", got: "${title}"`);
        } else {
            console.log(`${title} is displayed`);
        }
        // edit テンプレート編集
        // new テンプレート作成
    } 
   
    async closeTemplate () {
        await this.waitAndClick(this.selectors.closedTemplate);
    }

    async deletionModal (expectedText) {
        const title = await this.waitAndGetText(this.selectors.deletionModalText);
        if (title !== expectedText) {
            throw new Error (`unexpected error occurs!! "${expectedText}" show: "${title}"`); 
        } else {
            console.log(`deletion modal is displayed, wording: "${title}"`);
        }
    }
    async deleteTemplate () {
        await this.navTemplateCard();
        const template = await this.waitAndFind$$(this.selectors.deleteTemplate, 3000);
        if (template.lenght === 0) throw new Error ("No templates found to delete");
        console.log("deleting template...")
        await template[0].click();
        await this.deletionModal("テンプレートを削除");
        await this.waitAndClick(this.selectors.confirmDeletion);
        console.log("secessfully deleted template...")
    }

    async saveAndConfirm () {
        console.log("saving template....");
        await this.waitAndClick(this.selectors.saveTemplate);

        const success = await this.elementExists(this.selectors.successModal, 10000);
        if (!success) throw new Error ("Unexpected error occurs or modal is not displayed!");
        console.log("modal for template creation is displayed");
        await this.waitAndClick(this.selectors.confirmBtn);
    }

    async fillTemplateImgText ({ description, uploadAction }) {
        console.log("input random template description....");
        await this.setValue(this.selectors.templateDescription, description);
        console.log("description entered");
        console.log("uploading image...");
        await uploadAction(this.selectors);
        await this.elementExists(this.selectors.iconThumbImage, 3000);
        console.log("image thumbnail is displayed...");
    }

    // -- Text Only --
    async createTextTemplate ({content}) {
        await this.navTemplateCard();
        console.log("opening template creation screen....");
        await this.waitAndClick(this.selectors.createTemplate);
        await this.templateTitle("テンプレート作成");
        console.log("input random template description....");
        await this.setValue(this.selectors.templateDescription, content);
        console.log("successfully inputted description...");
        await this.saveAndConfirm();
    }

    // -- via camera roll --
    async createImageAndTextTemplate ({content}) {
        await this.navTemplateCard();
        console.log("opening template creation screen....");
        await this.waitAndClick(this.selectors.createTemplate);
        await this.templateTitle("テンプレート作成");
        await this.fillTemplateImgText ({
            description: content,
            uploadAction: this.cameraHelper.captureImage.bind(this.cameraHelper),
        });
        await this.saveAndConfirm();
        await this.closeTemplate();
    }

    // -- via device gallery --
    async createTemplateImageGallery ({content}) {
        await this.navTemplateCard();
        console.log("opening template creation screen....");
        await this.waitAndClick(this.selectors.createTemplate);
        await this.templateTitle("テンプレート作成");
        await this.fillTemplateImgText({
            description: content,
            uploadAction: this.cameraHelper.uploadFromGallery.bind(this.cameraHelper),
        });
        await this.saveAndConfirm();
        
    }
    // -- edit function --
    async editTemplate ({content, uploadAction}) {
        await this.navTemplateCard();
        const item = await this.waitAndFind$$(this.selectors.templateItem, 3000);
        console.log("opening template editing screen....");
        await item[1].click();
        await this.templateTitle("テンプレート編集");
        await this.fillTemplateImgText ({
            description: content, 
            uploadAction: this.cameraHelper.captureImage.bind(this.cameraHelper),
        });
        await this.saveAndConfirm();
    }

}