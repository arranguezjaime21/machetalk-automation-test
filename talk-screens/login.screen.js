import { BasePage } from "./base.screen.js";

export class LoginScreen extends BasePage {
    constructor(driver) {
        super(driver);

        this.selectors = {
            mailLoginNav: 'id=com.fdc_machetalk_broadcaster:id/tvLogin',
            maillSNS: 'id=com.fdc_machetalk_broadcaster:id/btnOtherMethod',
            loginMailBtn: 'id=com.fdc_machetalk_broadcaster:id/btnLogin',
            submitBtn: 'id=com.fdc_machetalk_broadcaster:id/btnLogin',
            inputEmail: 'id=com.fdc_machetalk_broadcaster:id/txtEmail',
            inputPassword: 'id=com.fdc_machetalk_broadcaster:id/txtPassword',
            getErrMsg: 'id=com.fdc_machetalk_broadcaster:id/tvErrorMsg',
            submitBtnStats: 'id=com.fdc_machetalk_broadcaster:id/btnLogin'
        };
    }

    async gotoMailLogin ()  {
        await this.waitAndClick(this.selectors.mailLoginNav);
        await this.waitAndClick(this.selectors.maillSNS);
        await this.waitAndClick(this.selectors.loginMailBtn);
    }

    async submit () {
        await this.waitAndClick(this.selectors.submitBtn);
    }

    async setCredentials ({email, password}) {
        await this.setValue(this.selectors.inputEmail, email);
        await this.setValue(this.selectors.inputPassword, password);
    }
    
    async errMessage () {
        const el = await this.$(this.selectors.getErrMsg, 10000);
        return await el.getText();
    }


    async verifySubmitBtn () {
        const button = await this.$(this.selectors.submitBtnStats);
        const isEnabled = await button.getAttribute("enabled");

        if (isEnabled === "true") {
            throw new Error("login button should be disabled")
        } else {
            console.log("login button remains disabled");
        }
    }
}