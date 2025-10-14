import { LoginScreen } from "../talk-screens/login.screen.js";
import { PermissionModal } from "../talk-screens/permission.screen.js";

declare global {
  var loginScreen: LoginScreen;
  var permissionModal: PermissionModal;
  var driver: WebdriverIO.Browser; 
}

export {};
