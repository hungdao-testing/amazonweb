const { I } = inject();

module.exports = {
  // insert your locators and methods here
  sortDropDown: ".a-dropdown-container",
  filterOption: '//li[@role="option"]//a',

  sortByOption: function (option) {
    I.click(this.sortDropDown);
    I.moveCursorTo(this.filterOption);
    I.click(`${this.filterOption}[text()='${option}']`);
  },
};
