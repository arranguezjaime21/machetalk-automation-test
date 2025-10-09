
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
    }
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