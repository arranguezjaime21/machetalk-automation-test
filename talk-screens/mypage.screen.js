import { MyPageSelectors } from "../talk-selectors/selectors.js"
import { BasePage } from "./base.screen.js";


export class MyPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.selectors = MyPageSelectors;
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
        this.selectors = MyPageSelectors;
        this.myPage = new MyPage(driver);
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
