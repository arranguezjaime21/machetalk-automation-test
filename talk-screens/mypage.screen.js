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
