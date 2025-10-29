import { MessagePageSelectors } from "../talk-selectors/selectors.js";
import { BasePage } from "./base.screen.js";

export class MessageScreen extends BasePage {
    constructor(driver) {
        super(driver);
        this.selectors = MessagePageSelectors;
    }

    async navMessagePage() {
        await this.waitAndClick(this.selectors.navMessage);
    }
}