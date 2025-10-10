import { CssSpace } from "@faker-js/faker";

export const MyPage = {
    driver: null,

    async navMyPage () {
        const mypage = await this.driver.$('(//android.widget.ImageView[@resource-id="com.fdc_machetalk_broadcaster:id/icon"])[5]');
        await mypage.waitForDisplayed({timeout:5000});
        await mypage.click();
    },

    async variousSettings () {
        const settings = await this.driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("com.fdc_machetalk_broadcaster:id/rl_settings"))');
        await settings.waitForDisplayed({ timeout:3000 });
        await settings.click();
    },

    async templateSettings () {
        const template = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/linear_layout_template_settings');
        await template.waitForDisplayed({timeout: 3000});
        await template.click();
    },
}
//logout function
export const Logout = {
    driver: null,

    async userLogout () {

        MyPage.driver = this.driver;
        await MyPage.navMyPage();
        await MyPage.variousSettings();

        const logout = await this.driver.$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.fdc_machetalk_broadcaster:id/rv_settings_menu"]/android.widget.RelativeLayout[9]');
        await logout.waitForDisplayed({timeout:3000});
        for (let i =0; i < 10; i++) {
            await logout.click();
            await this.driver.pause(50);
        } 

        const logoutModal = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/rl_message');
        const isLogoutModalVisible = await logoutModal.isDisplayed().catch(() => false);

        if (!isLogoutModalVisible) throw new Error("Logout modal did not appear after 10 taps");
            const confirmLogout = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/rl_dialog_confirm');
            await confirmLogout.click();
        }
}

//template settings function 
export const TemplateSettings = {
    driver: null,

    async templateScreen() {

        MyPage.driver = this.driver;
        await MyPage.navMyPage();
        await MyPage.templateSettings();

        const createTemplate = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/create_template_layout');
        await createTemplate.waitForDisplayed({timeout:3000});
        await createTemplate.click();

        const templateScreenHeader = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/tv_header_title');
        const templateHeaderText = await templateScreenHeader.getText("text");
        if (templateHeaderText !== "テンプレート作成" ) {
            throw new Error (`Unexpected error message ${templateHeaderText}`);
        } else {
            console.log("Template Settings screen is successfully displayed");
        }
    },

    async setTemplate ({description}) {
        const templateDescription = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/et_template_content');
        await templateDescription.waitForDisplayed({timeout:3000});
        await templateDescription.setValue(description);
    },

    async saveTemplate () {
        const save = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/right_button');
        await save.waitForDisplayed({timeout:3000});
        await save.click();

        const succesModal = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/message');
        await succesModal.waitForDisplayed({timeout:4000});
        const successMessage = await succesModal.getText("text");

        if(successMessage !== "テンプレートを保存しました") {
            throw new Error (`Unexpected error is displayed ${successMessage}`);
        } else {
            console.log("successfully created template");
        }

    }
}
