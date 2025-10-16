import { AppealOption } from "../config/callappeal.config.js";
import { callSettingsConfig } from "../config/callsettings.js";
import { BasePage } from "./base.screen.js";


// call settings 
export class CallSettings extends BasePage { 
    constructor(driver) {
        super(driver);
    

        this.selectors = {
            searchPageNav: '(//android.widget.ImageView[@resource-id="com.fdc_machetalk_broadcaster:id/icon"])[1]',
            callSettingsBtn: 'id=com.fdc_machetalk_broadcaster:id/image_button_settings',
            callSettingsStatus: 'id=com.fdc_machetalk_broadcaster:id/tv_status_info',
            closedBtn: 'id=com.fdc_machetalk_broadcaster:id/btnCancel',


        };
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
                console.log(`unexpected error state: ${getStatus}`);
            }
    }

    async setCallSettings (settingName) {
        if (!callSettingsConfig[settingName]) {
            throw new Error (`unknown call setting: ${settingName}`);
        } 
        await this.handleCallSettings(callSettingsConfig[settingName]);
    }
}

// --- Set Call Appeal ---
export class CallAppeal extends BasePage {
    constructor(driver) {
        super(driver);

        this.callSettings = new CallSettings(driver);

        this.selectors = {
           appealIcon: 'id=com.fdc_machetalk_broadcaster:id/rlStrength',
            callSettingsVisible: 'id=com.fdc_machetalk_broadcaster:id/rl_options',
            toastMessage: 'id=com.fdc_machetalk_broadcaster:id/tv_message',
        };
    }

    async callAppealIcon () {
        await this.waitAndClick(this.selectors.appealIcon);
    }

    async selectAppeal ({ btnID, name }) {
        const btnAppeal = await this.waitAndFind(btnID, 2000);
        if (!btnAppeal) throw new Error (`Appeal button not found: ${btnID}`);
        await btnAppeal.click();
       
        const isVisible = await this.elementExists(this.selectors.callSettingsVisible, 2000);
        if (isVisible) {
            console.log("call settings is off, turning on....");
            await callSettings.setCallSettings("enableAudioVideo");
        } 

        const toast = await this.waitAndFind(this.selectors.toastMessage, 2000);
        if (toast) {
            const toastText = await toast.getAttribute("text").catch(() => "(no toast text)" );
            console.log(`Appeal "${name}" set successfully — Toast: ${toastText}`)
        } else {
            console.warn("Toast message not visible or disappeared too quickly.");
        }
    }

    async setAppeal (settingIndex) {
        const appeal = AppealOption[settingIndex];
        if (!appeal) {
            throw new Error (`unknown call setsting: ${settingIndex}`);
        } 
        await this.selectAppeal(appeal);
    }
    
}