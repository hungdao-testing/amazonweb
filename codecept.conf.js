const { setHeadlessWhen } = require("@codeceptjs/configure");
const dotenv = require("dotenv").config();
// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: "./tests/specs/**/*.spec.js",
  output: "./output",
  helpers: {
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
  },
  include: {
    I: "./steps_file.js",
    searchPage: "./tests/pages/searchPage.js",
    loginPage: "./tests/pages/loginPage.js",
    searchBoxFrag: "./tests/fragments/searchBox.js",
    searchResultFrag: "./tests/fragments/searchResult.js",
    filterOptionFrag: "./tests/fragments/filterOption.js",
    sortOptionFrag: "./tests/fragments/sortOption.js",
    headerFrag: "./tests/fragments/header.js",
  },
  bootstrap: "./run_server.js",
  mocha: {},
  name: "amazon",
  multiple: {
    parallel: {
      chunks: 2,
    },
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
    allure: {
      enabled: true,
    },
    stepByStepReport: {
      enabled: false,
      output: "./output",
    },
    rerun: {
      // run 4 times until 1st success
      minSuccess: 1,
      maxReruns: 3,
    },
  },
};
