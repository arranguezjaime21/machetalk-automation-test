export class CameraHelper {
    constructor(driver, waitAndClick, waitAndFind, waitAndFind$$) {
        this.driver = driver;
        this.waitAndClick = waitAndClick;
        this.waitAndFind$$ = waitAndFind$$;
        this.waitAndFind = waitAndFind;
        // this.elementExists = elementExists;
    }


    // async galleryPermission () {
    //     const permission = await this.elementExists(this.selectors.libraryDialog, 3000);
    //     if (!permission) {
    //         console.log("permission for device library is already allowed");
    //     } else {
    //         await this.waitAndClick(this.selectors.allowLibrary);
    //     } 
    //     return
    // }


    async captureImage(selectors) {
        const steps = [
            selectors.btnID,
            selectors.btnCamera,
            selectors.btnCapture,
            selectors.btnConfirm,
            selectors.btnUpload
        ];

        for (const step of steps) {
            await this.waitAndClick(step);
        }

        console.log("Image captured and uploaded successfully");
    }
    async uploadFromGallery (selectors) {
        await this.waitAndClick(selectors.btnID);
        await this.waitAndClick(selectors.btnGallery);
        // await this.galleryPermission();
        await this.waitAndClick(selectors.deviceFile);
        const gallery = await this.waitAndFind(selectors.deviceGallery);
        const picture = await this.waitAndFind$$(selectors.galleryItems, 5000);
        await picture[2].click();
        await this.waitAndClick(selectors.btnUpload);
        console.log("Image successfully uploaded");
    }
}