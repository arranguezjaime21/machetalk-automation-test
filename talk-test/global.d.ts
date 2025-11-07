import { AttackTab, CallAppeal, CallSettings, TemplateSettings } from "talk-screens/search.screen.js";
import { LoginScreen } from "../talk-screens/login.screen.js";
import { PermissionModal } from "../talk-screens/permission.screen.js";
import { Logout, MyPage, MyPageTemplate, NotificationSettings, Stars, StreamingBonus } from "talk-screens/mypage.screen.js";
import { MessageScreen } from "../talk-screens/message.screen.js";
import { TimelinePosting } from "../talk-screens/timeline.screen.js";

declare global {
  var loginScreen: LoginScreen;
  var permissionModal: PermissionModal;
  var callSettings: CallSettings;
  var callAppeal: CallAppeal;
  var myPage: MyPage;
  var logout: Logout;
  var stars: Stars;
  var driver: WebdriverIO.Browser; 
  var templateSettings: TemplateSettings;
  var myPageTemplate: MyPageTemplate;
  var attackTab: AttackTab;
  var messageScreen: MessageScreen;
  var notificationSettings: NotificationSettings;
  var streamingBonus: StreamingBonus;
  var timelinePosting: TimelinePosting;
}

export {};
