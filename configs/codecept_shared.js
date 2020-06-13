const { setHeadlessWhen } = require("@codeceptjs/configure");
const SUT = require("./../SUT");

let config = {
  tests: SUT.testSpecFolder,
  output: SUT.outputFolder,
  include: {
    I: SUT.IObject,
    PageFactory: SUT.pageFactory, // factory pattern to handle pages and common components
  },
  bootstrap: SUT.bootstrapFile,
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
      output: SUT.outputFolder,
    },
    rerun: {
      // run 4 times until 1st success
      minSuccess: 1,
      maxReruns: 3,
    },
  },
};

module.exports = config