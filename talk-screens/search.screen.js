import { AppealOption } from "../config/callappeal.config.js";
import { callSettingsConfig } from "../config/callsettings.js";

// call settings 
export const ScreenCallSettings = { 

    driver: null,

    async searchNavOption () { 
        const navIcon1 = this.driver.$('(//android.widget.ImageView[@resource-id="com.fdc_machetalk_broadcaster:id/icon"])[1]');
        await navIcon1.click();
    },

    async searchCallSettings() {
        const searchScreenCallSettings = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/image_button_settings');
        await searchScreenCallSettings.waitForDisplayed({ timeout: 3000});
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

//call appeal 
export const ScreenCallAppeal = {

    driver: null,


    async callAppealIcon () {
        const icon = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/rlStrength');
        await icon.waitForDisplayed({timeout:3000});
        await icon.click();
    },

    async selectAppeal () {
        for (const {btnID, name} of AppealOption) {
            const appealBtn = await this.driver.$(`${btnID}`);
            await appealBtn.click();
            
        }
        const closeAppealOption = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/tvCancel');
    }
    
}