import { BasePage } from "./base.screen.js";


export class MyPage extends BasePage {
    constructor(driver) {
        super(driver);

        this.selectors = {
            myPageNav: '(//android.widget.ImageView[@resource-id="com.fdc_machetalk_broadcaster:id/icon"])[5]',
            myPageSettings: 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("com.fdc_machetalk_broadcaster:id/rl_settings"))',
            myPageTemplateSettings: 'id=com.fdc_machetalk_broadcaster:id/linear_layout_template_settings',
        };
    }

    async navMyPage () {
        await this.waitAndClick(this.selectors.myPageNav);
    }

    async variousSettings () {
        await this.waitAndClick(this.selectors.myPageSettings);
    }

    async templateSettings () {
        await this.waitAndClick(this.selectors.myPageTemplateSettings);
    }
}

//logout function
export class Logout extends BasePage {
    constructor(driver) {
        super(driver);

        this.myPage = new MyPage(driver);

        this.selectors = {
            logoutBtn: '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.fdc_machetalk_broadcaster:id/rv_settings_menu"]/android.widget.RelativeLayout[9]',
            logoutModal: 'id=com.fdc_machetalk_broadcaster:id/rl_message',
            logoutConfirm: 'id=com.fdc_machetalk_broadcaster:id/rl_dialog_confirm',
        };
    }

    async userLogout () {
        await myPage.navMyPage();
        await myPage.variousSettings();

        const logout = await this.waitAndFind(this.selectors.logoutBtn, 3000);
        for (let i =0; i < 10; i++) {
            await logout.click();
            await this.driver.pause(50);
        } 

        const logoutModal = await this.elementExists(this.selectors.logoutModal);
        if (!logoutModal) throw new Error("⚠️ Logout modal did not appear after 10 taps");
            await this.waitAndClick(this.selectors.logoutConfirm);
        }
}

// //template settings function 
// export const TemplateSettings = {
//     driver: null,

//     async templateScreen() {

//         MyPage.driver = this.driver;
//         await MyPage.navMyPage();
//         await MyPage.templateSettings();

//         const createTemplate = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/create_template_layout');
//         await createTemplate.waitForDisplayed({timeout:3000});
//         await createTemplate.click();

//         const templateScreenHeader = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/tv_header_title');
//         const templateHeaderText = await templateScreenHeader.getText("text");
//         if (templateHeaderText !== "テンプレート作成" ) {
//             throw new Error (`Unexpected error message ${templateHeaderText}`);
//         } else {
//             console.log("Template Settings screen is successfully displayed");
//         }
//     },

//     async setTemplateDescription ({description}) {
//         const templateDescription = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/et_template_content');
//         await templateDescription.waitForDisplayed({timeout:3000});
//         await templateDescription.setValue(description);
//     },

//     async setTemplateImage () {
//         const imageIcon = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/rl_template_image');
//         await imageIcon.waitForDisplayed({timeout:3000});
//         await imageIcon.click();

//         const uploadCamera = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/tv_camera');
//         await uploadCamera.waitForDisplayed({timeout:3000});
//         await uploadCamera.click();

//         const captureImage = await this.driver.$('id=com.android.camera2:id/shutter_button');
//         await captureImage.waitForDisplayed({timeout:5000});
//         await captureImage.click();

//         const upload = await this.driver.$('id=com.android.camera2:id/done_button');
//         await upload.waitForDisplayed({timeout:5000});
//         await upload.click();

//         const uploadPhoto = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/tv_use_photo');
//         await uploadPhoto.waitForDisplayed({timeout:5000});
//         await uploadPhoto.click();
//     },

//     async saveTemplate () {
//         const save = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/right_button');
//         await save.waitForDisplayed({timeout:3000});
//         await save.click();

//         const succesModal = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/message');
//         await succesModal.waitForDisplayed({timeout:4000});
//         const successMessage = await succesModal.getText("text");

//         if(successMessage !== "テンプレートを保存しました") {
//             throw new Error (`Unexpected error is displayed ${successMessage}`);
//         } else {
//             console.log("successfully created template");
//         }

//     }
// }
