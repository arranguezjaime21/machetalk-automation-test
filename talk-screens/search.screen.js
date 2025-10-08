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

//set call appeal 
export const ScreenCallAppeal = {

    driver: null,


    async callAppealIcon () {
        const icon = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/rlStrength');
        await icon.waitForDisplayed({timeout:3000});
        await icon.click();
    },

    async selectAppeal ({btnID, settingsON, settingsOFF }) {
       
        const closeAppealOption = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/tvCancel');
    }
    
}

//com.fdc_machetalk_broadcaster:id/tv_status_info
// 現在ビデオ・音声通話の受信がONになっています。 [VIDEOAUDIO ON]
// 現在音声通話のみ受信がONになっています。 [AUDIO ON]
// ビデオ通話か音声通話の受信をONしてください。\nONにすると通話待機します。 [AUDIO VIDEO OFF]

