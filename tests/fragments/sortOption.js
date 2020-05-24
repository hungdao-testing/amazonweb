const { I } = inject();
const constants = require("../../fixtures/constants");

let sortDropDown = ".a-dropdown-container";
let filterOption = '//li[@role="option"]//a';

module.exports = {
  // insert your locators and methods here

  sortByOption: async function (option) {
    I.click(sortDropDown);
    I.moveCursorTo(filterOption);
    I.click(`${filterOption}[text()='${option}']`);
    let url = await I.grabCurrentUrl();
    I.assertTrue(url.includes(constants.sortOptions[option]));
  },
};
