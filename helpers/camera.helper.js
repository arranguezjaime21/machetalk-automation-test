export class CameraHelper {
    constructor(driver, waitAndClick, waitAndFind, waitAndFind$$) {
        this.driver = driver;
        this.waitAndClick = waitAndClick;
        this.waitAndFind$$ = waitAndFind$$;
        this.waitAndFind = waitAndFind;
    }


    // --- TEMPLATE HELPERS ---
    async templateCameraRoll(selectors) {
        const steps = [
            selectors.btnIDCam,
            selectors.btnCamera,
            selectors.btnCapture,
            selectors.btnConfirm,
            selectors.btnUpload
        ];

        for (const step of steps) {
            if (step) {
                await this.waitAndClick(step);
            } else {
                console.warn("!missing selector in step list");
            }
            
        }
        console.log(">>> Image captured and uploaded successfully");
    }

    // --- TEMPLATE HELPERS ---
    async templateGallery (selectors) {
        await this.waitAndClick(selectors.btnIDCam);
        await this.waitAndClick(selectors.btnGallery);
        
        const permissionDialog = await this.waitAndFind(selectors.libraryDialog, 3000);
        if (permissionDialog) {
        console.log(">>> Permission dialog detected — granting access...");
        await this.waitAndClick(selectors.allowLibrary);
        await this.driver.pause(1000);
        await this.waitAndClick(selectors.btnIDCam);
        await this.waitAndClick(selectors.btnGallery);
        } else {
        console.log(">>> Permission for device library already granted");
        }
        
        await this.waitAndClick(selectors.deviceFile);
        const gallery = await this.waitAndFind(selectors.deviceGallery);
        const picture = await this.waitAndFind$$(selectors.galleryItems, 5000);
        await picture[2].click();

        await this.waitAndClick(selectors.btnUpload);
        console.log(">>> Image successfully uploaded");
    }


    // --- TIMELINE HELPERS ----
    async timelineCameraRoll (selectors) { 
        const steps = [
            selectors.postCamera,
            selectors.btnCapture,
            selectors.btnConfirm,
            selectors.btnUpload,
        ];
        for (const step of steps) { 
            if (step) {
                await this.waitAndClick(step);
            } else {
                console.warn("!missing selector in step list");
            }
        }
        //console.log(">>> Image captured and uploaded successfully");
    }

    // --- TIMELINE HELPERS ----
    async timelineGallery (selectors) {
        const elements = await this.waitAndFind$$(selectors.postGallery, 4000);
        const count = elements.length;
       
        if (count === 2) { //permission not allow
            //console.log(">>>Permission not allow, allowing permission...")
            await elements[1].click();
            const permission = await this.waitAndFind(selectors.libraryDialog);
            if (permission) {
                await this.waitAndClick(selectors.allowLibrary);
            }
            await this.waitAndClick(selectors.deviceFile);
            const gallery = await this.waitAndFind(selectors.deviceGallery, 3000);
            const image = await this.waitAndFind$$(selectors.galleryItems);
            await image[2].click()
            await this.waitAndClick(selectors.btnUpload);
        } else if (count > 2) { //permission already allowed
            //console.log(">>>Permission already allowed, selecting picture...")
            await elements[2].click();
            await this.waitAndClick(selectors.btnUpload);
        }

    }
}