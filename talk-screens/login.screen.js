import { LoginScreenSelectors } from "../talk-selectors/selectors.js";
import { BasePage } from "./base.screen.js";

export class LoginScreen extends BasePage {
    constructor(driver) {
        super(driver);
        this.selectors = LoginScreenSelectors;
    }
    // --- Navigation ---
    async gotoMailLogin ()  {
        await this.waitAndClick(this.selectors.mailLoginNav);
        await this.waitAndClick(this.selectors.maillSNS);
        await this.waitAndClick(this.selectors.loginMailBtn);
    }
    // --- Login Button ---
    async submit () {
        await this.waitAndClick(this.selectors.submitBtn);
    }
    // --- Input Credentials ---
    async loginMailFlow ({email, password}) {
        await this.setValue(this.selectors.inputEmail, email);
        await this.setValue(this.selectors.inputPassword, password);
        await this.waitAndClick(this.selectors.submitBtn);
    }
    // --- Error Handling ---
    async errMessage () {
        const el = await this.waitAndFind(this.selectors.getErrMsg, 10000);
        return await el.getText();
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