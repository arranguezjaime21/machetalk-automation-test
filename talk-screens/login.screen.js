import { LoginScreenSelectors } from "../talk-selectors/selectors.js";
import { BasePage } from "./base.screen.js";
import { PermissionModal } from "./permission.screen.js";

export class LoginScreen extends BasePage {
    constructor(driver) {
        super(driver);
        this.selectors = LoginScreenSelectors;
    }
    // --- Navigation ---
    async gotoMailLogin ()  {
        try {
            await this.waitAndClick(this.selectors.mailLoginNav);
            await this.waitAndClick(this.selectors.maillSNS);
            await this.waitAndClick(this.selectors.loginMailBtn);
        } catch {
            return null;
        }
    }
    // --- Login Button ---
    async submit () {
        await this.waitAndClick(this.selectors.submitBtn);
    }
    // --- Input Credentials ---
    async loginMailFlow ({email, password}) {
        console.log("Inputting username and password...");
        await this.setValue(this.selectors.inputEmail, email);
        await this.setValue(this.selectors.inputPassword, password);
        console.log("Clicking on login button...");
        await this.waitAndClick(this.selectors.submitBtn);
    }
    // --- Error Handling ---
    async errMessage (expectedError) {
        try {
            const msg = await this.waitAndGetText(this.selectors.getErrMsg, 10000);
            if (msg !== expectedError) {
                console.log(`Incorrect wording is displayed: ${msg}`);
                return false;
            } else {
                console.log(`login failed and error wording is displayed: ${msg}`);
                return true;
            }
        } catch (error) {
            console.log(`Unexpected error or wording is not exist -- "${error.message || error}"`);
            return false;
        }
    }
    // --- to check if user successfully login ----
    async permissionisVisible () {
        try {
            const dialog = await this.elementExists(this.selectors.permissionDialog, 5000);
            if (!dialog) {
                await this.errMessage("•メールアドレスまたは、パスワードに誤りがあります。");
            } else {
                console.log("User successfully login and dialog is displayed!");
            }
        } catch (error) {
            console.log("Unexpected error or modal is not found or exist");
        }
    }
    // --- Button State Verification ---
    async verifySubmitBtn () {
        const button = await this.waitAndFind(this.selectors.submitBtnStats);
        const isEnabled = await button.getAttribute("enabled");

        if (isEnabled === "true") {
            throw new Error("⚠️ login button should be disabled")
        } else {
            console.log("login button remains disabled");
        }
    }
}