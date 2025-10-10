import { AppealOption } from "../config/callappeal.config.js";
import { callSettingsConfig } from "../config/callsettings.js";


// call settings 
export const CallSettings = { 

    driver: null,

    async searchNavOption () { 
        const navIcon1 = this.driver.$('(//android.widget.ImageView[@resource-id="com.fdc_machetalk_broadcaster:id/icon"])[1]');
        await navIcon1.waitForDisplayed({timeout:3000});
        await navIcon1.click();
    },

    async searchCallSettings() {
        const searchScreenCallSettings = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/image_button_settings');
        await searchScreenCallSettings.waitForDisplayed({ timeout: 5000});
        await searchScreenCallSettings.click();
    },   

    async handleCallSettings({ buttonID, enableStatus, disableStatus, currentStatus }) {                        
        const button = await this.driver.$(`id=${buttonID}`);
        const statusState = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/tv_status_info');
        await statusState.waitForDisplayed({timeout:5000});
        const getStatus = await statusState.getAttribute("text");
        const closeModal = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/btnCancel');

            if (enableStatus.includes(getStatus)) {
                await button.waitForDisplayed({timeout:5000});
                await button.click();
            } else if (disableStatus.includes(getStatus)) {
                console.log(currentStatus);
                await closeModal.click();
            } else {
                console.log(`unexpected error state: ${getStatus}`);
            }
    },

    async setCallSettings (settingName) {
        if (!callSettingsConfig[settingName]) {
            throw new Error (`unknown call setting: ${settingName}`);
        } 
        await this.handleCallSettings(callSettingsConfig[settingName]);
    }, 
}

//set call appeal 
export const CallAppeal = {

    driver: null,


    async callAppealIcon () {
        const icon = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/rlStrength');
        await icon.waitForDisplayed({timeout:5000});
        await icon.click();
    },

    async selectAppeal ({ btnID, name }) {
        const btnAppeal = await this.driver.$(`${btnID}`);
        await btnAppeal.click();
       
        const callSettings = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/rl_options');
        const isVisible = await callSettings.isDisplayed().catch(() => false);

        //select appeal
        if (isVisible) {
            console.log("user call settings is off");
            //calling the call settings function
            CallSettings.driver = this.driver;
            await CallSettings.setCallSettings("enableAudioVideo");
            console.log("users call settings successfully enabled");
        }
            console.log("user call settings already turned on")
            const toast = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/tv_message');
            await toast.waitForDisplayed({ timeout: 3000 });
            const toastText = await toast.getAttribute("text");
            console.log(`Appeal "${name}" set successfully — Toast: ${toastText}`);

    },

     async setAppeal (settingIndex) {
        const appeal = AppealOption[settingIndex];
        if (!appeal) {
            throw new Error (`unknown call setting: ${settingIndex}`);
        } 
        await this.selectAppeal(appeal);
    }, 
    
}