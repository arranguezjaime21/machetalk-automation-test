export class Gestures {
    constructor(driver) {
        this.driver = driver;
    }

    async swipeDownToRefresh() {
        // Get screen size
        const { width, height } = await this.driver.getWindowRect();
         // Start and end positions — adjust to fit your app layout
        const startX = width / 2;
        const startY = height * 0.3;  // start somewhere near top-middle
        const endY = height * 0.8;    // pull downward

        await this.driver.execute('mobile: dragGesture', {
            startX,
            startY,
            endX: startX,
            endY,
            speed: 1400, // optional, try 400–800
        });
    }

    async scrollDown(speed = 1200) {
        const { width, height } = await this.driver.getWindowRect();
        const startX = width / 2;
        const startY = height * 0.8; // near bottom
        const endY = height * 0.3;   // near top

        console.log(">>> Scrolling down...");
        await this.driver.execute('mobile: dragGesture', {
            startX,
            startY,
            endX: startX,
            endY,
            speed,
        });

        await this.driver.pause(2000); // wait for list to settle
    }

    async scrollUp(speed = 1200) {
        const { width, height } = await this.driver.getWindowRect();
        const startX = width / 2;
        const startY = height * 0.3;
        const endY = height * 0.8;

        console.log(">>> Scrolling up...");
        await this.driver.execute('mobile: dragGesture', {
            startX,
            startY,
            endX: startX,
            endY,
            speed,
        });

        await this.driver.pause(2000);
    }
}