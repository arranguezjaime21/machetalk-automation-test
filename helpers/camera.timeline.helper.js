export class TimelineCameraHelper { 
    constructor(driver, waitAndClick, waitAndFind, waitAndFind$$) { 
        this.driver = driver; 
        this.waitAndClick = waitAndClick;
        this.waitAndFind = waitAndFind;
        this.waitAndFind$$ = waitAndFind$$;
    }

    async camera (selectors)  { 
        const steps = [
            selectors.postCamera,
            selectors.btnCapture, 
            selectors.btnConfirm,
            selectors.btnUpload
        ],

        for (const step of steps) { 
            await this.waitAndClick(step);
        }
    }
}