export const LoginScreen =  {

    driver: null, 

    async gotoMailLogin ()  {
        const loginNav = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/tvLogin');
        await loginNav.waitForDisplayed({ timeout: 5000}); 
        await loginNav.click();
    },

    async gotoMailSNS() {
        const mailSNS = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/btnOtherMethod');
        await mailSNS.waitForDisplayed({timeout: 3000});
        await mailSNS.click();

    },

    async loginMailButton() {
        const mailLogin = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/btnLogin');
        await mailLogin.waitForDisplayed({ timeout: 3000});
        await mailLogin.click();

    },

    async cancelLoginButton() {
        const cancelLoginButton = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/btnCancel');
        await cancelLoginButton.waitForDisplayed({ timeout:3000 });
        console.log("cancel button successfully clicked!");

    },

    async submit() {
        const loginButton = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/btnLogin');
        await loginButton.waitForDisplayed({ timeout: 5000});
        await loginButton.click();
    },

    

    async setCredentials ({email, password}) {
        const inputEmail = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/txtEmail');
        const inputPassword = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/txtPassword');
        await inputEmail.waitForDisplayed ({ timeout: 3000});
        await inputEmail.clearValue();
        await inputEmail.setValue(email);
        await inputPassword.clearValue();
        await inputPassword.setValue(password);
    }, 

    async getErrorMessage ()  {
        const errorMessage = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/tvErrorMsg');
        await errorMessage.waitForDisplayed({timeout: 10000});
        return await errorMessage.getText();
    },

    async submitButtonStatus () {
        const button = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/btnLogin');
        await button.waitForDisplayed({timeout:3000});
        const isEnabled = button.getAttribute("enabled");

        if (isEnabled === "true") {
            throw new Error("login button is enabled even thou user inputted email/pass")
        } else {
            console.log("login button remains disabled, waiting for user to input email and pass");
        }
    }


}