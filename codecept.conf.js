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
        args: ["--incognito"],
      },
    },
    ChaiWrapper: {
      require: "codeceptjs-chai",
    },
    MailSlurp: {
      require: "@codeceptjs/mailslurp-helper",
      apiKey:
        "d944c88eb6bfa80faa26fa1c8bbf89f4c4da00b1a6004bc1238ab0e5346f1c5e",
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
  bootstrap: null,
  mocha: {},
  name: "amazon",
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
