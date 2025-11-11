import { AppealOption } from "../config/callappeal.config.js";
import { callSettingsConfig } from "../config/callsettings.js";
import { BasePage } from "./base.screen.js";
import { CameraHelper } from "../helpers/camera.helper.js";
import { AttackTabSelectors, SearchScreenSelectors, TemplateSelectors } from "../talk-selectors/selectors.js";


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

        
        try {
            const toast = await this.waitAndFind(this.selectors.toastMessage, 2000);
            if (toast) {
                const toastText = await toast.getText();
                console.log(`Appeal "${name}" set successfully — Toast: ${toastText}`)
            } else {
                console.warn("⚠️ Toast message not visible or disappeared too quickly.");
            }
            
        } catch (err) {
            console.log(`unexpected error occured: ${err.message}`);
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

    // --NAVIGATION--
    async navTemplateCard () {
       try {
            await this.callSettings.navSearchPage();
            await this.waitAndClick(this.selectors.templateIcon, 5000);
        } catch {
            return;
        }
    }

    // --TEMPLATE FILLER--
    async fillTemplate({ description, uploadAction }) {
        await this.setValue(this.selectors.templateDescription, description);
        await uploadAction(this.selectors);
        await this.elementExists(this.selectors.iconThumbImage, 5000);
    }

    // --TEMPLATE CREATION--
    async templateCreation ({ content, templateType = "text"}) {
        await this.navTemplateCard();
        await this.waitAndClick(this.selectors.createTemplate);

        switch(templateType) {
            case "text":
                await this.setValue(this.selectors.templateDescription, content);
            break;

            case "camera":
                await this.fillTemplate({
                    description: content,
                    uploadAction: this.cameraHelper.templateCameraRoll.bind(this.cameraHelper),
                });
            break;

            case "gallery":
                await this.fillTemplate({
                    description: content,
                    uploadAction: this.cameraHelper.templateGallery.bind(this.cameraHelper),
                });
            break;

            default:
                throw new Error(`Inputted templateType: "${templateType} is invalid. use "text" | "camera" | "gallery"`);
        }

        const templatePostText = await this.waitAndGetText(this.selectors.templateDescription);
        console.log(`Template Content: "${templatePostText}"`);
        await this.saveAndConfirm(templatePostText);
    }

    // --SAVE TEMPLATE--
    async saveAndConfirm (expectedText) {
        await this.waitAndClick(this.selectors.saveTemplate);
        try {
            const success = await this.elementExists(this.selectors.successModal, 10000);
            if (!success) throw new Error (">>> Unexpected error occurs or modal is not displayed!");
            await this.waitAndClick(this.selectors.confirmBtn);
            await this.driver.pause(2000);

        
            const templateList = await this.waitAndFind$$(this.selectors.templateList, 5000);
            const totalTemplate = templateList.length;

            if(totalTemplate === 0) return console.log(">>> Template list is empty");
            const recentTemplateCreated = templateList[1];

            const textEl = await recentTemplateCreated.$(this.selectors.postedText);
            const postExist = textEl.isExisting();
            if (!postExist) {
                console.log(">>> Template not found or recent post dont have content");
            } else {
                const postedText = await textEl.getText();
                if (postedText.trim() === expectedText.trim()) {
                    console.log(">>> Created template successfully displayed in template list");
                } else {
                    console.log(`>>> Template display is mismatch:
                    Actual Text: "${postedText}"
                    Expcted Text: "${expectedText}"`);
                }
            }
        } catch (err) {
            console.log(`>>> Unexpected error: ${err.message}`);
        }
    }

    // --TEMPLATE EDITING--
    async editTemplate ({content, uploadAction}) {
        await this.navTemplateCard();
        const item = await this.waitAndFind$$(this.selectors.templateItem, 5000);
        await item[1].click();
        await this.fillTemplate ({
            description: content, 
            uploadAction: this.cameraHelper.templateCameraRoll.bind(this.cameraHelper),
        });
        await this.saveAndConfirm();
    }

}
// --- attack tab ---
export class AttackTab extends BasePage{
    constructor (driver) {
        super(driver);
        this.selectors = {
            ...TemplateSelectors,
            ...AttackTabSelectors,
        };

        this.callSettings = new CallSettings(driver);

    }

    async sendTemplate () {
        await this.callSettings.navSearchPage();
        await this.userList(8);
        const templateSetisVisible = await this.elementExists(this.selectors.templateOFF, 3000);
        if (templateSetisVisible) {
            console.log("User has no active template. Template Preview displayed.");
            await this.enableTemplate(1);
        } else {
            console.log("user successfully sent template.");
        }
        
    }

    async enableTemplate (index) {
        await this.waitAndClick(this.selectors.closedImg);
        const templateList = await this.waitAndFind$$(this.selectors.tempList, 3000);
        if (!templateList) {
            throw new Error(`unable to find ${templateList} or user dont have template`);
        } else {
            const enable = await this.waitAndFind$$(this.selectors.setTemplate);
            if (!enable[index]) {
                throw new Error(`unable to find ${templateList} or user dont have template`);
            } 
            console.log("enabling user template...")
            await enable[index].click();
            await this.driver.pause(3000);
            await this.waitAndClick(this.selectors.closedTemplate);
            await this.userList(8);
        }
    }

    async userList(index) {
        //get target user nickname
        const userList = await this.waitAndFind$$(this.selectors.userList, 3000);
        if (!userList[index]) {
            throw new Error(`User at index ${index} not found`);
        }

        const userEl = await userList[index].$(this.selectors.userNickName, 3000);
        const userNn = await userEl.getText();

        console.log(`Sending template for user: "${userNn}"`);

        // send template for target user
        const sndBtn = await this.waitAndFind$$(this.selectors.sendTemplateBtn, 3000);
        if (!sndBtn[index]) {
            throw new Error(`Send button for index ${index} not found`);
        }
        await sndBtn[index].click();

    }
}