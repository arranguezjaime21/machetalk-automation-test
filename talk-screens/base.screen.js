export class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async waitAndClick(selector, timeout = 5000) {
        const element = await this.driver.$(selector);
        await element.waitForDisplayed({ timeout });
        await element.click();
    }
}