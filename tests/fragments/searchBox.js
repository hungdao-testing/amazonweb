const { I } = inject();

let searchBarInputField = "#nav-search #twotabsearchtextbox";
let searchDropDownIcon = '#nav-search div[class="nav-search-scope nav-sprite"]';
let selectedDepartment = '#nav-search div[class="nav-search-facade"]';
let departmentOptionList =
  '#nav-search [aria-describedby="searchDropdownDescription"]';
let searchBtn = '#nav-search input[type="submit"]';

module.exports = {
  // insert your locators and methods here

  selectDepartment: function (department) {
    I.click(searchDropDownIcon);
    I.selectOption(departmentOptionList, department);
    I.seeTextEquals(department, selectedDepartment);
  },

  inputKeyword: function (keyword) {
    I.clearField(searchBarInputField);
    I.fillField(searchBarInputField, keyword);
  },

  submit: function () {
    I.click(searchBtn);
  },
};
