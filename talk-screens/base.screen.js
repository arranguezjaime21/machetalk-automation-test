export class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async waitAndClick(selector, timeout = 5000) {
        const element = await this.driver.$(selector);
        await element.waitForDisplayed({ timeout });
        await element.click();
    }
    async waitAndFind$$(selector, timeout = 5000) {
        const elements = await this.driver.$$(selector);

        if (elements.length === 0) {
            throw new Error(`No elements found for selector: ${selector}`);
        }
        for (const el of elements) {
            await el.waitForDisplayed({ timeout });
        }
        return elements;
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
    async elementExists(selector, timeout = 3000) {
        try {
            const element = await this.waitAndFind(selector, timeout);
            return element ? await element.isDisplayed().catch(() => false) : false;
        } catch {
            return false;
            }
    }

    async waitAndGetText (selector, timeout = 3000) {
        try {
            const el = await this.waitAndFind(selector);
            const text = await el.getText();
            return text;
        } catch {
            return null;
        }
    }

    async isButtonEnable (selector, timeout = 3000) {
        try {
            const el = await this.waitAndFind(selector, timeout);
            const btnStats = await el.getAttribute("checked");
            return btnStats === "true";
        } catch {
            return false;
        }
    }

}