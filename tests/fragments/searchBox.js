const { I } = inject();

module.exports = {
  // insert your locators and methods here

  searchBarInputField: "#nav-search #twotabsearchtextbox",
  searchDropDownIcon: '#nav-search div[class="nav-search-facade"]',
  departmentOptionList:
    '#nav-search [aria-describedby="searchDropdownDescription"]',
  searchBtn: '#nav-search input[type="submit"]',

  selectDepartment: function (department) {
    I.click(this.searchDropDownIcon);
    I.selectOption(this.departmentOptionList, department);
    I.seeTextEquals(department, this.searchDropDownIcon);
  },

  inputKeyword: function (keyword) {
    I.clearField(this.searchBarInputField)
    I.fillField(this.searchBarInputField, keyword);
  },

  submit: function () {
    I.click(this.searchBtn);
  },
};
