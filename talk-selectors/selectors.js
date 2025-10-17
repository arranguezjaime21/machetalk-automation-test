export const LoginScreenSelectors = {
    mailLoginNav: 'id=com.fdc_machetalk_broadcaster:id/tvLogin',
    maillSNS: 'id=com.fdc_machetalk_broadcaster:id/btnOtherMethod',
    loginMailBtn: 'id=com.fdc_machetalk_broadcaster:id/btnLogin',
    submitBtn: 'id=com.fdc_machetalk_broadcaster:id/btnLogin',
    inputEmail: 'id=com.fdc_machetalk_broadcaster:id/txtEmail',
    inputPassword: 'id=com.fdc_machetalk_broadcaster:id/txtPassword',
    getErrMsg: 'id=com.fdc_machetalk_broadcaster:id/tvErrorMsg',
    submitBtnStats: 'id=com.fdc_machetalk_broadcaster:id/btnLogin',
};

export const SearchScreenSelectors = {
    // ---call settings---
    searchPageNav: '(//android.widget.ImageView[@resource-id="com.fdc_machetalk_broadcaster:id/icon"])[1]',
    callSettingsBtn: 'id=com.fdc_machetalk_broadcaster:id/image_button_settings',
    callSettingsStatus: 'id=com.fdc_machetalk_broadcaster:id/tv_status_info',
    closedBtn: 'id=com.fdc_machetalk_broadcaster:id/btnCancel',

    // -- call appeal --
    appealIcon: 'id=com.fdc_machetalk_broadcaster:id/rlStrength',
    callSettingsVisible: 'id=com.fdc_machetalk_broadcaster:id/rl_options',
    toastMessage: 'id=com.fdc_machetalk_broadcaster:id/tv_message',
}; 

export const TemplateSelectors = { 

    // -- template screen --
    templateIcon: 'id=com.fdc_machetalk_broadcaster:id/template_button',
    createTemplate: 'id=com.fdc_machetalk_broadcaster:id/create_template_clickable',
    templateTitle: 'id=com.fdc_machetalk_broadcaster:id/tv_header_title',
    templateDescription: 'id=com.fdc_machetalk_broadcaster:id/et_template_content',

    // -- camera thumbnail status --
    iconThumbImage: 'id=img com.fdc_machetalk_broadcaster:id/template_img',
    iconThumbDefault: 'id=com.fdc_machetalk_broadcaster:id/img_empty_template',
    
    // -- save function -- 
    saveTemplate: 'id=com.fdc_machetalk_broadcaster:id/rl_confirm',
    successModal: 'id=com.fdc_machetalk_broadcaster:id/message',
    confirmBtn: 'id=com.fdc_machetalk_broadcaster:id/confirmButton',

    // -- camera capture --
    btnID: 'id=com.fdc_machetalk_broadcaster:id/rl_template_image',
    btnCamera: 'id=com.fdc_machetalk_broadcaster:id/tv_camera',
    btnCapture: 'id=com.android.camera2:id/shutter_button',
    btnConfirm: 'id=com.android.camera2:id/done_button',
    btnUpload: 'id=com.fdc_machetalk_broadcaster:id/tv_use_photo',

}