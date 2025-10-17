export class CameraHelper {
    constructor(driver, waitAndClick) {
        this.driver = driver;
        this.waitAndClick = waitAndClick;
    }

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

    async selectFromGallery(selectors) {
        await this.waitAndClick(selectors.imgIconDefault);
        await this.waitAndClick(selectors.gallery);

        const firstImage = await this.driver.$('//android.widget.ImageView[1]');
        await firstImage.waitForDisplayed({ timeout: 5000 });
        await firstImage.click();

        console.log("Image selected from gallery successfully");
    }
}