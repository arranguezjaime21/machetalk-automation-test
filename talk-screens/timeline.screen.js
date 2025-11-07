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

    // -- navigation for timeline posting screen --
    async navTimeline () { 
        try {
            await this.waitAndClick(this.selectors.timelineNav);
            await this.waitAndClick(this.selectors.tab3);
        } catch {
            return;
        }
    }

    // -- fill timeline post screen --
    async fillTimelineImgText ({ description, uploadAction }) { 
        await this.setValue(this.selectors.postText, description);
        await uploadAction(this.selectors);
        await this.elementExists(this.selectors.uploadImagePreview);
    }

    // -- posting timeline flow via camera roll--
    async postImage ({content}) {
        await this.navTimeline();
        await this.waitAndClick(this.selectors.newPost);
        await this.fillTimelineImgText ({ 
            description: content,
            uploadAction: this.cameraHelper.timelineCameraRoll.bind(this.cameraHelper),
        });
        
        await driver.pause(3000);
        await this.waitAndClick(this.selectors.saveTemplate);
    }

    // -- posting timeline flow via device gallery --
    async postGallery ({content}) {
        await this.navTimeline();
        await this.waitAndClick(this.selectors.newPost);
        await this.fillTimelineImgText({
            description: content,
            uploadAction: this.cameraHelper.timelineGallery.bind(this.cameraHelper),
        });

        await driver.pause(3000);
        await this.waitAndClick(this.selectors.saveTemplate);
    }

    // -- posting text only and checking the display for timeline posted --
    async postTextOnly ({ content }) {
        await this.navTimeline();
        await this.waitAndClick(this.selectors.newPost);
        await this.setValue(this.selectors.postText, content);
        const timelinePostText = await this.waitAndGetText(this.selectors.postText);
        await this.waitAndClick(this.selectors.saveTemplate);
        await this.driver.pause(5000);
        await this.checkUploadedPost(timelinePostText);
    }

    // -- checker if timeline list is empty --
    async emptyList () {
        const empty = await this.elementExists(this.selectors.emptyTimeline, 5000);
         if (empty) {
            const textDisplay = await this.waitAndGetText(this.selectors.emptyText);
            console.log(`>>> Timeline list is empty and wording is displayed: "${textDisplay}`);
            return true;
        } 
        return false;
    }

    // -- checker for timeline list, approval and approve post --
    async postStatuses () {
        const isEmpty = await this.emptyList();
        if (isEmpty) {
            console.log(">>> No post found in timeline list");
            return;
        }

        const postList = await this.waitAndFind$$(this.selectors.timelineList, 5000);
        const totalPost = postList.length;
        
        let approvalCount = 0;

       
        for (const post of postList){
            const forApproval = await post.$(this.selectors.approval);
            if (await forApproval.isDisplayed().catch(() => false)) {
            approvalCount++;
            }
        }

        const latestUpload = postList[0];

        const inReview = await latestUpload.$(this.selectors.approval, 3000);
        const isDisplayed = await inReview.isDisplayed().catch(() => false);
        if (isDisplayed) {
            console.log(`>>> Found ${approvalCount} post waiting for approval out of ${totalPost}`);
        } else {
            console.log(">>> All post are already approve");
        } 
    }

    // -- checker if posted timeline successfully displayed in the list -- 
    async checkUploadedPost (expectedText) {
         const isEmpty = await this.emptyList();

        if (isEmpty) {
            console.log(">>> No post found in timeline list");
            return;
        }
        
        const postList = await this.waitAndFind$$(this.selectors.timelineList, 5000);
        const latestPost = postList[0];

        const inReview = await latestPost.$(this.selectors.approval);
        if (!inReview) {
            console.log(">>> No for approval post in the latest post");
            return;
        }

        try {

            await this.gesture.swipeDownToRefresh();
            const isDisplayed = await inReview.isDisplayed().catch(() => false);
            if (isDisplayed) {
                console.log(">>> Timeline post is successfully displayed and waiting for review");
            } else {
                console.log(">>> Timeline post is not displayed");
            } 

            const textElement =  await latestPost.$(this.selectors.postedText);
            const textExist = await textElement.isExisting();
            if (!textExist) {
                console.log(">>> Latest post has no text");
            } else {
                const textDisplay = await textElement.getText();
                console.log(`>>> Timeline Post: "${textDisplay}"`);

                if (textDisplay.trim() === expectedText.trim()) {
                    console.log(`>>> The uploaded post text matches the user input in timeline post screen`);
                } else {
                    console.log(`Posted text is mismatch. 
                        Expected: "${expectedText}" 
                        Found: "${textDisplay}"`);
                }
            }

        } catch (err) {
            throw new Error(`>>> Unexpected error or post failed ${err.message}`);
        } 
    }

    // -- timeline deletion -- 
    async postDeletion (index) {
        await this.gesture.swipeDownToRefresh();
     try {
            const isEmpty = await this.emptyList();
            if(isEmpty) {
                console.log("No post found in timeline list nothing to delete");
                return;
            }

            const postList = await this.waitAndFind$$(this.selectors.timelineList, 5000);
            if(!postList || postList.length === 0) {
                console.log("No post found in timeline list nothing to delete");
                return;
            }

            if(index >= postList.length) {
                console.warn(`>>> Invalid index (${index}). Only ${postList.length} is available`);
                return;
            }

            const recentPost = postList[index];
            const postItem = await recentPost.$(this.selectors.approval);
            const isInReview = await postItem.isExisting().catch(() => false);
            
            if (isInReview) {
                console.info("Post is in review and nothing to delete")
                return;
            }

            await this.waitAndClick(this.selectors.postOption);

            const isModalDisplayed = await this.elementExists(this.selectors.postDelModalText, 3000);
            if (!isModalDisplayed) {
                throw new Error("Unexpected error or modal is not displayed");  
            }

            const modalText = await this.waitAndGetText(this.selectors.postDelModalText);
            console.log(`>>> Deletion modal is displayed with wording: "${modalText}"`)

            await this.waitAndClick(this.selectors.postDelConfirm);

            const toastMsg = await this.elementExists(this.selectors.postDelToast);
            if(toastMsg) {
                console.info("Post successfully deleted and toast is displayed");
            } else {
                console.warn("Post successfully deleted but toast is might delay or not displayed");
            }
        } catch (err) {
            throw new Error(`Unexpected error: "${err.message}"`);
        }
    }

}