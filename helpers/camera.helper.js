export class CameraHelper {
    constructor(driver, waitAndClick, waitAndFind, waitAndFind$$) {
        this.driver = driver;
        this.waitAndClick = waitAndClick;
        this.waitAndFind$$ = waitAndFind$$;
        this.waitAndFind = waitAndFind;
    }
    async captureImage(selectors) {
        const steps = [
            selectors.btnIDCam,
            selectors.btnCamera,
            selectors.btnCapture,
            selectors.btnConfirm,
            selectors.btnUpload
        ];

        for (const step of steps) {
            await this.waitAndClick(step);
        }

        console.log("Successfully captured image template");
    }
    async uploadFromGallery (selectors) {
        await this.waitAndClick(selectors.btnIDCam);
        await this.waitAndClick(selectors.btnGallery);
        
        const permissionDialog = await this.waitAndFind(selectors.libraryDialog, 3000);
        if (permissionDialog) {
        console.log("Permission dialog detected — granting access...");
        await this.waitAndClick(selectors.allowLibrary);
        await this.driver.pause(1000);
        await this.waitAndClick(selectors.btnIDCam);
        await this.waitAndClick(selectors.btnGallery);
        } else {
        console.log("Permission for device library already granted");
        }
        
        await this.waitAndClick(selectors.deviceFile);
        const gallery = await this.waitAndFind(selectors.deviceGallery);
        const picture = await this.waitAndFind$$(selectors.galleryItems, 5000);
        await picture[2].click();

        await this.waitAndClick(selectors.btnUpload);
        console.log("Successfully upload image template");
    }
}