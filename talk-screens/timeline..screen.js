import { Gestures } from "../helpers/gestures.helper.js";
import { CameraHelper } from "../helpers/camera.helper.js";
import { TimelinePageSelectors } from "../talk-selectors/selectors.js";
import { BasePage } from "./base.screen.js";

export class TimelinePosting extends BasePage {
    constructor(drive) {
        super(driver);
        // this.driver = driver;
        this.selectors = TimelinePageSelectors;
        this.gesture = new Gestures(driver);
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
            await this.waitAndClick(this.selectors.tab3);
            await this.waitAndClick(this.selectors.newPost);
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

    // -- posting timeline flow via camera roll--
    async postImage ({content}) {
        await this.navTimeline();
        await this.fillTimeline ({ 
            description: content,
            uploadAction: this.cameraHelper.timelineCameraRoll.bind(this.cameraHelper),
        });
        
        await driver.pause(3000);
        await this.waitAndClick(this.selectors.saveTemplate);
    }

    // -- posting timeline flow via device gallery --
    async postGallery ({content}) {
        await this.navTimeline();
        await this.fillTimeline({
            description: content,
            uploadAction: this.cameraHelper.timelineGallery.bind(this.cameraHelper),
        });

        await driver.pause(3000);
        await this.waitAndClick(this.selectors.saveTemplate);
    }

    async postTextOnly ({ content }) {
        await this.navTimeline();
        await this.setValue(this.selectors.postText, content);
        await this.saveAndCheckStatus();
    }

    async saveAndCheckStatus () {
        
        await this.waitAndClick(this.selectors.saveTemplate);
        await driver.pause(5000);
        // await this.gesture.swipeDownToRefresh();
        const postList = await this.waitAndFind$$(this.selectors.timelineList, 5000);
        const totalPost = postList.length;
        if (totalPost === 0) {
            console.log("no timeline items found");
            return;
        }
        let approvalCount = 0;

        
        for (const post of postList){
            const forApproval = await post.$(this.selectors.approval);
            if (await forApproval.isDisplayed().catch(() => false)) {
            approvalCount++;
            }
        }

        //select latest post
        const latestUpload = postList[0];
        // check approval status under the latest upload
        const inReview = await latestUpload.$(this.selectors.approval, 3000);
        const isDisplayed = await inReview.isDisplayed().catch(() => false);
        if (isDisplayed) {
            console.log(`>>> Found ${approvalCount} post(s) with approval status out of ${totalPost}`);
        } else {
            console.log("Latest item has no approval status yet.");
        }
        
    }

}