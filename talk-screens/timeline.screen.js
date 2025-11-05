import { commonSelectors } from "../talk-selectors/common.selectors.js";
import { BasePage } from "./base.screen.js";
import { TimelinePageSelectors } from "../talk-selectors/selectors.js";
import { TimelineCameraHelper } from "../helpers/camera.timeline.helper.js";

export class TimelinePage extends BasePage { 
    constructor (driver) { 
        super(driver);
        this.selectors = { 
            ...commonSelectors, 
            ...TimelinePageSelectors
        }; 
        this.timelineCameraHelper = new TimelineCameraHelper(
            this.driver,
            this.waitAndClick.bind(this),
            this.waitAndFind.bind(this),
            this.waitAndFind$$.bind(this)
        );
    }

    async timelinePost ({postMsg}) { 
        await this.waitAndClick(this.selectors.timelineNav);
        await this.waitAndClick(this.selectors.newPost);
        await this.waitAndClick(this.selectors.postCamera);
        await this.fillTimeline({
            description: postMsg,
            uploadImg: this.timelineCameraHelper.camera.bind(this.timelineCameraHelper),
        });
        await this.waitAndClick(this.selectors.saveBtn)
    }

    async fillTimeline ({description, uploadImg}) { 
        await this.setValue(this.selectors.postText, description);
        await uploadImg(this.selectors);
        await this.elementExists(this.selectors.uploadImagePreview, 3000);
    }
}