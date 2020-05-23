const { I } = inject();
const constants = require("../../fixtures/constants");

module.exports = {
  // insert your locators and methods here
  sortDropDown: ".a-dropdown-container",
  filterOption: '//li[@role="option"]//a',

  sortByOption: async function (option) {
    I.click(this.sortDropDown);
    I.moveCursorTo(this.filterOption);
    I.click(`${this.filterOption}[text()='${option}']`);
    let url = await I.grabCurrentUrl();
    I.assertTrue(url.includes(constants.sortOptions[option]));
  },
};
