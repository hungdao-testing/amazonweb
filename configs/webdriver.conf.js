const { setHeadlessWhen } = require("@codeceptjs/configure");
const dotenv = require("dotenv").config();
const sharedConfig = require("./codecept_shared.js");

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run

//setHeadlessWhen(process.env.HEADLESS);
let helpers = {
  WebDriver: {
    browser: "chrome",
    url: "https://www.amazon.com",
    restart: false,
    show: true,
    timeouts: {
      script: 60000,
      pageLoad: 10000,
    },
    //browser: "chrome",
    smartWait: 5000,
    waitForTimeout: 5000,
    desiredCapabilities: {
      chromeOptions: {
        args: [
          "--incognito",
          "--disable-extensions",
          "--disable-gpu",
          "--no-sandbox",
          "--disable-dev-shm-usage",
        ],
      },
    },
  },
  ChaiWrapper: {
    require: "codeceptjs-chai",
  },
};

let wdio = {
  enabled: true,
  services: ["selenium-standalone"],
};

sharedConfig.helpers = helpers;
sharedConfig.plugins.wdio = wdio;

exports.config = sharedConfig;
