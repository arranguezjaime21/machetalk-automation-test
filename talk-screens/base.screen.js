export class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async waitAndClick(selector, timeout = 5000) {
        const element = await this.driver.$(selector);
        await element.waitForDisplayed({ timeout });
        await element.click();
    }
    async setValue(selector, value, timeout = 3000) {
        const element = await this.driver.$(selector, timeout);
        await element.clearValue();
        await element.setValue(value);
    }

    async waitAndFind(selector, timeout = 3000) {
        try {
            const element = await this.driver.$(selector);
            await element.waitForDisplayed({ timeout });
            return element;
        } catch {
            return null;
        }
        
  }
}