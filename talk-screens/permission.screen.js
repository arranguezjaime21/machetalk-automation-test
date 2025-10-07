import { PERMISSION_CONFIG } from "../config/permission.config";


export const PermissionModal = {
    driver: null,

    async allowPermission () { 
        const dialog = await this.driver.$('id=com.fdc_machetalk_broadcaster:id/ll_permission_dialog');
        if (!(await dialog.isDisplayed().catch(() => false))) {
            console.log("all app permission already allowed!");
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

         //allow notif
        const allowNotification = await this.driver.$('id=com.android.permissioncontroller:id/permission_allow_button');
        if (await allowNotification.isDisplayed().catch(() => false)) {
            console.log("Notification Modal is displayed");
            await allowNotification.click();
            } else {
                console.log("Notification already allowed!");
            }
    
    }
}