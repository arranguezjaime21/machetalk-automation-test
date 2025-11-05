export const LoginScreenSelectors = {
    mailLoginNav: 'id=com.fdc_machetalk_broadcaster:id/tvLogin',
    maillSNS: 'id=com.fdc_machetalk_broadcaster:id/btnOtherMethod',
    submitBtn: 'id=com.fdc_machetalk_broadcaster:id/btnLogin',
    inputEmail: 'id=com.fdc_machetalk_broadcaster:id/txtEmail',
    inputPassword: 'id=com.fdc_machetalk_broadcaster:id/txtPassword',
    getErrMsg: 'id=com.fdc_machetalk_broadcaster:id/tvErrorMsg',
    permissionDialog: 'id=com.fdc_machetalk_broadcaster:id/ll_permission_dialog',

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

    //camera icon
    btnIDCam: 'id=com.fdc_machetalk_broadcaster:id/rl_template_image',
    // -- video icon --
    btnIDVideo: "id=com.fdc_machetalk_broadcaster:id/rl_template_video",

    // -- capture --
    btnCamera: 'id=com.fdc_machetalk_broadcaster:id/tv_camera',
    btnCapture: 'id=com.android.camera2:id/shutter_button',
    btnConfirm: 'id=com.android.camera2:id/done_button',
    btnUpload: 'id=com.fdc_machetalk_broadcaster:id/tv_use_photo',

     // -- gallery --
     btnGallery: 'id=com.fdc_machetalk_broadcaster:id/tv_gallery',
     //>>>> custom locator <<<<<
     deviceFile: '//*[@resource-id="com.google.android.apps.photos:id/title" and @text="Download"]',
     deviceGallery: 'id=com.google.android.apps.photos:id/recycler_view',
     galleryItems: '//android.support.v7.widget.RecyclerView/android.widget.ImageView',


     
    // -- close/ cancel button -- 
    closedTemplate: 'id=com.fdc_machetalk_broadcaster:id/close_button',
    cancelBtn: 'id=com.fdc_machetalk_broadcaster:id/tv_cancel',

    // -- template deletion --
    deleteTemplate: 'id=com.fdc_machetalk_broadcaster:id/btn_delete',
    deletionModalText: 'id=com.fdc_machetalk_broadcaster:id/tv_title', //テンプレートを削除 
    confirmDeletion: 'id=com.fdc_machetalk_broadcaster:id/rl_dialog_confirm',

    // -- template item -
    templateItem: '(//android.widget.RelativeLayout[@resource-id="com.fdc_machetalk_broadcaster:id/template_item"])',

    // -- library permission --
    libraryDialog: "id=com.android.permissioncontroller:id/grant_singleton",
    allowLibrary: "id=com.android.permissioncontroller:id/permission_allow_all_button",

};

export const MyPageSelectors = {
    // --- My Page Items ---
    myPageNav: '(//android.widget.ImageView[@resource-id="com.fdc_machetalk_broadcaster:id/icon"])[5]',
    myPageSettings: 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("com.fdc_machetalk_broadcaster:id/rl_settings"))',
    myPageTemplateSettings: 'id=com.fdc_machetalk_broadcaster:id/linear_layout_template_settings',
    myPageNotificationSettings: 'id=com.fdc_machetalk_broadcaster:id/linear_layout_notification_settings',
    myPageStremingBonus: 'id=com.fdc_machetalk_broadcaster:id/linear_layout_broadcast_bonus',

    // -- Logout --
    logoutBtn: '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.fdc_machetalk_broadcaster:id/rv_settings_menu"]/android.widget.RelativeLayout[9]',
    logoutModal: 'id=com.fdc_machetalk_broadcaster:id/rl_message',
    logoutConfirm: 'id=com.fdc_machetalk_broadcaster:id/rl_dialog_confirm',

    // -- Acquired Stars -- 
    mypageStar: "id=com.fdc_machetalk_broadcaster:id/rl_stars",
    ownStars: "id=com.fdc_machetalk_broadcaster:id/tvStar",
    closeWebView: "id=com.fdc_machetalk_broadcaster:id/btnClose",
    //to get the stars amount via webview
    starwebV: '//android.webkit.WebView//android.view.View[@text and not(@text="")]',
    //to get element is displaed via webview
    successDisplay: '//android.webkit.WebView//android.widget.TextView[@text="WEBで検索してね！"]',

    // -- Streaming Bonus Webview -- 
    streamingWebview: '//android.widget.TextView[@text="ボーナス獲得状況を確認"]',
 

    // -- Template Settings -- 
    titleTemplateWording: "id=com.fdc_machetalk_broadcaster:id/actionBarTitle",
}

export const AttackTabSelectors = {
    userList: 'id=com.fdc_machetalk_broadcaster:id/listItemHolder',
    sendTemplateBtn: 'id=com.fdc_machetalk_broadcaster:id/linear_layout_template',
    userNickName: 'id=com.fdc_machetalk_broadcaster:id/nickName',
    templateOFF: 'id=com.fdc_machetalk_broadcaster:id/error_content',
    closedImg: 'id=com.fdc_machetalk_broadcaster:id/image_button_close',
    tempList: 'id=com.fdc_machetalk_broadcaster:id/rv_template',
    setTemplate: 'id=com.fdc_machetalk_broadcaster:id/btn_template_setting',
}

export const MessagePageSelectors = {
    navMessage: '(//android.widget.ImageView[@resource-id="com.fdc_machetalk_broadcaster:id/icon"])[2]',
}

export const NotificationSettingsSelectors = {
    vibrateToggle: 'id=com.fdc_machetalk_broadcaster:id/cb_viber_setting',
    soundToggle: 'id=com.fdc_machetalk_broadcaster:id/cb_sound_setting',
    notificationsToggle: 'id=com.fdc_machetalk_broadcaster:id/cb_inn_app_general',

    backBtn: 'id=com.fdc_machetalk_broadcaster:id/btn_backs',
}

export const TimelinePageSelectors = { 
    timelineNav: '(//android.widget.ImageView[@resource-id="com.fdc_machetalk_broadcaster:id/icon"])[4]',
    newPost: 'id=com.fdc_machetalk_broadcaster:id/fl_new_post',
    postText: 'id=com.fdc_machetalk_broadcaster:id/et_post_text',
    postCamera: '(//android.widget.FrameLayout[@resource-id="com.fdc_machetalk_broadcaster:id/fl_image_container"])[1]',
    postGallery: '(//android.widget.FrameLayout[@resource-id="com.fdc_machetalk_broadcaster:id/fl_image_container"])[2]',
    uploadImagePreview: 'id=com.fdc_machetalk_broadcaster:id/iv_selected_photo',
    uploadImageCancel: 'id=com.fdc_machetalk_broadcaster:id/iv_selected_photo_dismiss',
} 