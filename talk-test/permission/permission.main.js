
import { PermissionModal } from "../../talk-screens/permission.screen.js";


describe ("App Permission", function () {
    it ("allowing app permission", async function () {
        await PermissionModal.allowPermission();
    });


});
