import { remote } from "webdriverio";
import { emulatorCaps } from "../../helpers/capabilities.js";
import { TemplateSettings } from "../../talk-screens/mypage.screen.js";
import { FakeData } from "../../helpers/faker.helper.js";



describe("Template Settings Screen Test", function () {
  let driver;

  this.timeout(60000);

  before(async function () {
    driver = await remote({
      path: "/",
      port: 4723,
      hostname: "127.0.0.1",
      logLevel: "error",
      capabilities: emulatorCaps,
    });

    TemplateSettings.driver = driver;

  });

  after(async function () {
    if (driver) {
        await driver.deleteSession();
    }
  });

  it ("create text template from template settings screen", async function () {
    await TemplateSettings.templateScreen();
    await TemplateSettings.setTemplateDescription({
        description: FakeData.randomSentence(),
    });
    await TemplateSettings.saveTemplate();
    await driver.pause(5000);

  })

 });