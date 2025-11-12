import { Gestures } from "../helpers/gestures.helper.js";
import { CameraHelper } from "../helpers/camera.helper.js";
import { TimelinePageSelectors } from "../talk-selectors/selectors.js";
import { BasePage } from "./base.screen.js";

export class TimelinePosting extends BasePage {
    constructor(drive) {
        super(driver);
        this.selectors = TimelinePageSelectors;
        this.gesture = new Gestures(driver);
        this.cameraHelper = new CameraHelper (
            this.driver, 
            this.waitAndClick.bind(this), 
            this.waitAndFind.bind(this), 
            this.waitAndFind$$.bind(this),
        )
    }

    // --- TIMELINE POST SCREEN NAVIGATOR ---
    async navTimelinePostScreen () { 
        try {
            await this.waitAndClick(this.selectors.timelineNav);
            await this.waitAndClick(this.selectors.tab3); 
        } catch {
            return;
        }
    }

    // --- TIMELINE POST FILLER ---
    async fillTimelineImgText ({ description, uploadAction }) {
        await this.setValue(this.selectors.postText, description);
        await uploadAction(this.selectors);
        await this.elementExists(this.selectors.uploadImagePreview, 10000);
    }

    // --- TIMELINE POST ---
    async postTimeline ({ content, postType = "text"}) {
        await this.navTimelinePostScreen();
        await this.waitAndClick(this.selectors.newPost);

        const postCategory = {
            text: async () => await this.setValue(this.selectors.postText, content),
            camera: async () => await this.fillTimelineImgText({
                description: content,
                uploadAction: this.cameraHelper.timelineCameraRoll.bind(this.cameraHelper),
            }),
            gallery: async () => await this.fillTimelineImgText({
                description: content,
                uploadAction: this.cameraHelper.timelineGallery.bind(this.cameraHelper),
            }),
        };

        const action = postCategory[postType];
        if (!action) throw new Error(`>>> Invalid postType: "${postType}" - user "text" | "camera" | "gallery"`);
        
        await action();
        const timelinePostText = await this.waitAndGetText(this.selectors.postText);
        console.log(`>>> Timeline created post: "${timelinePostText}"`);
        await this.submitAndVerifyUploadedPost(timelinePostText);
        await this.postStatuses();
}
    // --- CHECKER IF TIMELINE LIST IS EMPTY ---
    async emptyList () {
        const empty = await this.elementExists(this.selectors.emptyTimeline, 5000);
         if (empty) {
            const textDisplay = await this.waitAndGetText(this.selectors.emptyText);
            console.log(`>>> Timeline list is empty and wording is displayed: "${textDisplay}`);
            return true;
        } 
        return false;
    }

    // --- CHECKER FOR TIMELINE STATUSES --- 
    async postStatuses () {
        if (await this.emptyList()) return;

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

        const inReview = await latestUpload.$(this.selectors.approval);
        const isDisplayed = await inReview.isDisplayed().catch(() => false);
        console.log (
            isDisplayed
            ? `>>> Found ${approvalCount} post waiting for approval out of ${totalPost} in timeline pagination`
            : ">>> All post are already approve"
        );
    }

    // --- VERIFY UPLOADED POST IN TIMELINE SCREEN ---
    async submitAndVerifyUploadedPost (expectedText) {
        await this.waitAndClick(this.selectors.submitPost);
        await driver.pause(2000);
        await this.gesture.swipeDownToRefresh();
        if (await this.emptyList()) return console.log(">>> Timeline list is empty");
        try {
            const postList = await this.waitAndFind$$(this.selectors.timelineList, 5000);
            const latestPost = postList[0];

            const inReview = await latestPost.$(this.selectors.approval);
            if (!inReview) return console.log(">>> No for approval post in the latest post");

            const isDisplayed = await inReview.isDisplayed().catch(() => false);
            console.log(
                isDisplayed
                ? ">>> Timeline post is successfully displayed and waiting for review"
                : ">>> Timeline post is not displayed"
            );

            // --CHECKER IF POST MATCHES ON THE LIST SCREEN--
            const textElement =  await latestPost.$(this.selectors.postedText);
            const textExist = await textElement.isExisting();
            if (!textExist) {
                console.log(">>> Latest post has no text");
            } else {
                const textDisplay = await textElement.getText();

                if (textDisplay.trim() === expectedText.trim()) {
                    console.log(`>>> The uploaded post text matches the user input in timeline post screen`);
                } else {
                    console.log(`>>> Posted text is mismatch. 
                        Expected: "${expectedText}" 
                        Found: "${textDisplay}"`);
                }
            }

        } catch (err) {
            throw new Error(`>>> Unexpected error or post failed ${err.message}`);
        } 
    }

    // --- TIMELINE DELETION ---
    async postDeletion (index) {
        await this.gesture.swipeDownToRefresh();
        if (await this.emptyList()) return console.log(">>> No post found in timeline list nothing to delete");

        // >> timeline is empty <<
        const postList = await this.waitAndFind$$(this.selectors.timelineList, 5000);
        if(!postList || postList.length === 0) {
            console.log(">>> No post found in timeline list nothing to delete");
            return;
        }
        // >> if index is greater than timeline list <<
        if(index >= postList.length) {
            console.warn(`>>> Invalid index (${index}). Only ${postList.length} is available`);
            return;
        }

        try {

            const targetPost = postList[index];
            const textElement = await targetPost.$(this.selectors.postedText);
            const deletedPostItem = await textElement.getText().catch(() => "Unknown text");

            const postItem = await targetPost.$(this.selectors.approval);
            const isInReview = await postItem.isExisting().catch(() => false);
            if (isInReview) return console.info(">>> Post is in review and nothing to delete");

            await this.waitAndClick(this.selectors.postOption);

            const isModalDisplayed = await this.elementExists(this.selectors.postDelModalText, 3000);
            if (!isModalDisplayed) throw new Error(">>> Unexpected error or modal is not displayed");  
        
            const modalText = await this.waitAndGetText(this.selectors.postDelModalText);
            console.log(`>>> Deletion modal is displayed with wording: "${modalText}"`)

            await this.waitAndClick(this.selectors.postDelConfirm);

            const toastMsg = await this.elementExists(this.selectors.postDelToast);
            console.log (
                toastMsg
                ? ">>> Post successfully deleted and toast is displayed"
                : ">>> Post successfully deleted but toast is might delay or not displayed"
            );
        } catch (err) {
            throw new Error(`Unexpected error: "${err.message}"`);
        }
    }

}


export class TimelineCommentLike extends BasePage {
    constructor(driver) {
        super(driver);
        this.selectors = TimelinePageSelectors;
    }

    async timelineSort ({ sort = "recommended"}) {
        const sortList = {
            recommended: {
                label: "おすすめ順",
                oppositeLabel: "新着順",
                btn: this.selectors.sortRecommended,
            },
            latest: {
                label: "新着順",
                oppositeLabel: "おすすめ順",
                btn: this.selectors.sortRecommended,
            }
        };
        try {
            const sortInfo = sortList[sort];
            if(!sortInfo) throw new Error(`Invalid inputted sort text: "${sort}". Use "recommended" | "latest"`);
            const currentSort = await this.waitAndGetText(this.selectors.sortLabel);
        
            if(currentSort === sortInfo.label) return console.log(`${sort} timeline sorting is already displayed`);
            if(currentSort === sortInfo.oppositeLabel) {
                await this.waitAndClick(this.selectors.sortLabel);
                await this.waitAndClick(sortInfo.btn);

                const updatedSort = await this.waitAndGetText(this.selectors.sortLabel);
                console.log(`Timeline list is displayed under ${sort}, sort text: "${updatedSort}"`);
                return;
            }
            console.warn(`Unpexted text: "${currentSort}", expected: "${sortInfo.label}"`);
        } catch (err) {
            throw new Error(`Unexpected error or sorting element not found: ${err.message}`);
        }
    }
}