export async function handleSavePass(driver) {
    const savePassPopup = await driver.$('id=android:id/autofill_save');
    const popupVisible = await savePassPopup.isDisplayed().catch(() => false);
        if (!popupVisible)  return false;
        const neverSave = await driver.$('id=android:id/autofill_save_no');
        await neverSave.click();
        console.log("dismissed save password popup");
}