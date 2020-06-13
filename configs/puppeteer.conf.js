const { setHeadlessWhen } = require("@codeceptjs/configure");
const dotenv = require("dotenv").config();
const sharedConfig = require("./codecept_shared.js");


// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run

setHeadlessWhen(process.env.HEADLESS);
let helpers = {
  Puppeteer: {
    url: "https://www.amazon.com",
    show: true,
    windowSize: "1200x900",
    waitForNavigation: ["domcontentloaded", "networkidle0"],
    waitForTimeout: 5000,
    chrome: {
      args: [
        "--incognito",
        "--disable-extensions",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
      ],
    },
  },
  ChaiWrapper: {
    require: "codeceptjs-chai",
  },
};
sharedConfig.helpers = helpers;
exports.config = sharedConfig



