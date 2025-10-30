import { MyPageSelectors, TemplateSelectors } from "../talk-selectors/selectors.js"
import { BasePage } from "./base.screen.js";
import { TemplateSettings } from "../talk-screens/search.screen.js";
import { CameraHelper } from "../helpers/camera.helper.js";


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

    async starsOwned () {
        await this.waitAndClick(this.selectors.mypageStar);
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

// liver owned stars -- cashout web view 
export class Stars extends BasePage {
    constructor(driver) {
        super(driver);
        this.selectors = MyPageSelectors;
        this.myPage = new MyPage(driver);
    }

    async userStars () {
        await myPage.navMyPage();
        const stars = await this.waitAndGetText(this.selectors.ownStars);
        console.log(`Users acquired stars: ${stars}`);
        await myPage.starsOwned();
     
        try {
            const webviewDisplay = await this.elementExists(this.selectors.successDisplay, 10000);

            if (webviewDisplay) {
                console.log("Webview successfully displayed.")
                await driver.pause(3000);
                const webstars = await this.waitAndGetText(this.selectors.starwebV);

                //trim the value by removing comma, or any string in the number
                const starDisplay = value => String(value).replace(/,/g, '').trim();
                const mypageStars = starDisplay(stars);
                const webviewStars = starDisplay(webstars);
               
                if (mypageStars === webviewStars) {
                    console.log("webview stars displayed is the same on mypage")
                } else {
                    console.log("incorrect stars displayed in webview screen")
                }
                
            } else {
                console.warn("webview still not displayed, continuing without error...")
            }
             await this.waitAndClick(this.selectors.closeWebView);
        } catch (err) {
            throw new Error(`unexpected error, ${err.message}`);
        }
   }
}

export class MyPageTemplate extends BasePage {
    constructor(driver) {
        super(driver);
        this.selectors = {
            ...MyPageSelectors,
            ...TemplateSelectors
        };
        this.myPage = new MyPage(driver);
        this.cameraHelper = new CameraHelper(
            this.driver, 
            this.waitAndClick.bind(this), 
            this.waitAndFind.bind(this), 
            this.waitAndFind$$.bind(this),
        );
    }

    async templateTitle (expectedText) { 
        try {
            const title = await this.waitAndGetText(this.selectors.templateTitle);
            if (title !== expectedText) {
                //return falseif title did not match the expected title
                console.log(`Incorrect wording title is displayed, expected "${expectedText}", display is: "${title}"`);
                return false;
            } else {
            // edit テンプレート編集
            // new テンプレート作成
                //return true if title matches the expected title
                console.log(`${title} is displayed correctly`);
                return true;
            }
        } catch (error) {
            //return false and continuation even if element is not exist or not found
            console.log(`Unable to verify template title. Expected "${expectedText}" - ${error.message || error}`);
        }
    }

    async navMyPageTemplate () {
        try {
            await this.myPage.navMyPage();
            await this.myPage.templateSettings();
        } catch {
            console.log("User already in template settings screen")
        }
    }

    async saveAndConfirm () {
        console.log("Saving template....")
        await this.waitAndClick(this.selectors.saveTemplate);
        try {
            const modal = await this.elementExists(this.selectors.successModal, 5000);
            if (!modal) {
                console.log("success modal is not displayed after saving template");
                return false;
            } else {
                console.log("Success modal is displayed")
                await this.waitAndClick(this.selectors.confirmBtn);
                return true;
            }
        } catch (error) {
            console.log(`Unable to find modal or does not exist after saving template, - ${error.message || error}`);
            return false;
        }
        // const modal = await this.elementExists(this.selectors.successModal, 5000);
        // if (!modal) throw new Error ("Unexpected error or modal is not displayed");
        // console.log("Success modal is displayed")
        // await this.waitAndClick(this.selectors.confirmBtn);
    }

    async fillTemplate ({ description, uploadImage}){
        console.log("Inputting template description...");
        await this.setValue(this.selectors.templateDescription, description);
        console.log("Successfully inputted template description...");
        console.log("Uploading image template...");
        await uploadImage(this.selectors);
        await this.elementExists(this.selectors.iconThumbImage, 3000);
    }
    
    async createTextCaptureTemplate ({content}) { 
        await this.navMyPageTemplate();
        await this.waitAndClick(this.selectors.createTemplate);
        await this.templateTitle("テンプレート作成");
        await this.fillTemplate({
            description: content,
            uploadImage: this.cameraHelper.captureImage.bind(this.cameraHelper),
        });
        await this.saveAndConfirm();
    }
    async creatTextGalleryTemplate ({content}) {
        await this.navMyPageTemplate();
        await this.waitAndClick(this.selectors.createTemplate);
        await this.templateTitle("テンプレート作成");
        await this.fillTemplate ({
            description: content,
            uploadImage: this.cameraHelper.uploadFromGallery.bind(this.cameraHelper),
        });
        await this.saveAndConfirm();
    }

    async deletionModal (expectedText) {
        const title = await this.waitAndGetText(this.selectors.deletionModalText);
        if (title !== expectedText) {
            throw new Error (`unexpected error occurs!! "${expectedText}" show: "${title}"`); 
        } else {
            console.log(`deletion modal is displayed, wording: "${title}"`);
        }
    }
    async deleteTemplate (index) {
        const template = await this.waitAndFind$$(this.selectors.deleteTemplate, 3000);
        if (template.length === 0) throw new Error ("No templates found to delete");
        console.log("deleting template...")
        await template[index].click();
        await this.deletionModal("テンプレートを削除");
        await this.waitAndClick(this.selectors.confirmDeletion);
        console.log("secessfully deleted template...")
    }

    async templateList() {
        return this.waitAndFind$$(this.selectors.deleteTemplate, 3000);
    }

    async deleteAllTemplate (index = 0) {
        const templates = await this.templateList();
        if (templates.length === 0) {
            console.warn("no templates found to delete");
            return;
        }
        const target = templates[index];
        await target.click();
        console.log(`deleting template at index ${index}`);

        await this.waitAndClick(this.selectors.confirmDeletion);
        console.log("secessfully deleted template...")

    }
}
