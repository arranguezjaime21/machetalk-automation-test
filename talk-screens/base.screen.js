export class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async waitAndClick(selector, timeout = 5000) {
        const el = await this.driver.$(selector);
        await el.waitAndClick({timeout})
        
    }
}