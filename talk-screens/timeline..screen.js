import { CameraHelper } from "../helpers/camera.helper.js";
import { TimelinePageSelectors } from "../talk-selectors/selectors.js";
import { BasePage } from "./base.screen.js";

export class TimelinePage extends BasePage {
    constructor(drive) {
        super(driver);
        // this.driver = driver;
        this.selectors = TimelinePageSelectors;
        this.cameraHelper = new CameraHelper (
            this.driver, 
            this.waitAndClick.bind(this), 
            this.waitAndFind.bind(this), 
            this.waitAndFind$$.bind(this),
        )
    }

    async navTimeline () { 
        try {
            await this.waitAndClick(this.selectors.timelineNav);
        } catch {
            return;
        }
    }

    // -- fill timeline post screen --
    async fillTimeline ({ description, uploadAction }) { 
        await this.setValue(this.selectors.postText, description);
        await uploadAction(this.selectors);
        await this.elementExists(this.selectors.uploadImagePreview);
    }

    // -- posting timeline flow --
    async postImage ({content}) {
        await this.waitAndClick(this.selectors.newPost);
        await this.fillTimeline ({ 
            description: content,
            uploadAction: this.cameraHelper.timelineCameraRoll.bind(this.cameraHelper)
        });
        
        await driver.pause(3000);
        await this.waitAndClick(this.selectors.saveTemplate);
    }

}