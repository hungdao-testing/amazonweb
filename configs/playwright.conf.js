const { setHeadlessWhen } = require("@codeceptjs/configure");
const dotenv = require("dotenv").config();
const sharedConfig = require("./codecept_shared.js");
// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run

setHeadlessWhen(process.env.HEADLESS);

let helpers = {
  Playwright: {
    url: "https://www.amazon.com",
    show: true,
    browser: "chromium",
    windowSize: "1200x900",
    waitForNavigation: "networkidle0",
    waitForTimeout: 5000,
  },
  ChaiWrapper: {
    require: "codeceptjs-chai",
  },
};

sharedConfig.helpers = helpers;
exports.config = sharedConfig;
