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
        await this.waitAndClick(this.selectors.saveTemplate);
        await this.driver.pause(5000);
        await this.checkUploadedPost();
        
    }

    async emptyList () {
        const empty = await this.elementExists(this.selectors.emptyTimeline, 5000);
         if (empty) {
            const textDisplay = await this.waitAndGetText(this.selectors.emptyText);
            console.log(`>>> Timeline list is empty and wording is displayed: "${textDisplay}`);
            return true;
        } 
        return false;
    }

    async postStatuses () {
        const isEmpty = await this.emptyList();

        if (isEmpty) {
            console.log(">>> No post found in timeline list");
            return;
        }

        const postList = await this.waitAndFind$$(this.selectors.timelineList, 5000);
        const totalPost = postList.length;
        
        let approvalCount = 0;

        // check post list waiting for approval
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
            console.log(`>>> Found ${approvalCount} post waiting for approval out of ${totalPost}`);
        } else {
            console.log(">>> All post are already approve");
        } 
    }

    async checkUploadedPost () {
         const isEmpty = await this.emptyList();

        if (isEmpty) {
            console.log(">>> No post found in timeline list");
            return;
        }
        
        const postList = await this.waitAndFind$$(this.selectors.timelineList, 5000);
        const latestPost = postList[0];

        const inReview = await latestPost.$(this.selectors.approval);
        if (!inReview) {
            console.log(">>> No inreview post in the latest post");
            return;
        }

        try {

            // checking if uploaded timeline is displayed 
            await this.gesture.swipeDownToRefresh();
            const isDisplayed = await inReview.isDisplayed().catch(() => false);
            if (isDisplayed) {
                console.log(">>> Timeline post is successfully displayed and waiting for review");
            } else {
                console.log(">>> Timeline post is not displayed");
            } 

            //checking if posted text matches on users post
            const textElement =  await latestPost.$(this.selectors.postedText);
            const textExist = await textElement.isExisting();
            if (!textExist) {
                console.log(">>> Latest post has no text");
            } else {
                const textDisplay = await textElement.getText();
                console.log(`>>> Timeline Content: "${textDisplay}"`);
            }


        } catch (err) {
            throw new Error(`>>> Unexpected error or post failed ${err.message}`);
        } 
    }

}