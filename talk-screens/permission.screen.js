import { PERMISSION_CONFIG } from "../config/permission.config.js";
import { BasePage } from "./base.screen.js";


export class PermissionModal extends BasePage {
    constructor(driver) {
        super(driver);

        this.selectors = {
            dialogDisplay: 'id=com.fdc_machetalk_broadcaster:id/ll_permission_dialog',
            allowNotif: 'id=com.android.permissioncontroller:id/permission_allow_button' 
        };
    }

    async allowPermission () { 
        const dialog = await this.$(this.selectors.dialogDisplay, 3000)
        if (!(await dialog.isDisplayed().catch(() => false))) {
            console.log("permission already allowed!");
            return;
        }

        await dialog.waitForDisplayed({timeout:3000});

        for (const { btnID,btnAllow, name } of PERMISSION_CONFIG ) {
             const btn = await this.driver.$(`id=${btnID}`);
             if (!(await btn.isEnabled())) continue;

             await btn.click();
             const allowBtn = await this.driver.$(`id=${btnAllow}`);
             if (await allowBtn.isDisplayed().catch(() => false)) {
                console.log(`${name} permission dialog is displayed `);
                await allowBtn.click();
             }
        }
         // --- Allow Notification Permission ---
        const allowNotification = await this.$(this.selectors.allowNotif, 3000);
        if (await allowNotification.isDisplayed().catch(() => false)) {
            console.log("Notification permission is displayed");
            await allowNotification.click();
        } else {
            console.log("Notification already allowed!");
        }
    
    }
}