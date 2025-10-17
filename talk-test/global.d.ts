import { CallAppeal, CallSettings, TemplateSettings } from "talk-screens/search.screen.js";
import { LoginScreen } from "../talk-screens/login.screen.js";
import { PermissionModal } from "../talk-screens/permission.screen.js";
import { Logout, MyPage } from "talk-screens/mypage.screen.js";

declare global {
  var loginScreen: LoginScreen;
  var permissionModal: PermissionModal;
  var callSettings: CallSettings;
  var callAppeal: CallAppeal;
  var myPage: MyPage;
  var logout: Logout;
  var driver: WebdriverIO.Browser; 
  var templateSettings: TemplateSettings;
}

export {};
