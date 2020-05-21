const { setHeadlessWhen } = require("@codeceptjs/configure");

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
      waitForNavigation: "networkidle0",
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
