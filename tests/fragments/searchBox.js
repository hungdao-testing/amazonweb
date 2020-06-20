const { I } = inject();

let searchBarInputField = "#nav-search #twotabsearchtextbox";
let selectedDepartment = '#nav-search div[class="nav-search-facade"] span';
let searchBtn = '#nav-search input[type="submit"]';

module.exports = {
  // insert your locators and methods here

  selectDepartment: async function (department) {

    //Using executeScript to handle dropdown in Firefox.
    await I.executeScript(function (opt) {
      //1. Remove default selected value in dropdown which is "All department"/"All"
      document
        .querySelector("#searchDropdownBox>option[selected='selected']")
        .removeAttribute("selected");

      //2. Set selected value to an option because we could not click or scroll to select.
      document.querySelectorAll("#searchDropdownBox>option").forEach((el) => {
          if (el.innerText === opt) {
            el.setAttribute("selected", "selected");
          }
        });
      
    }, department);

    //3. Change the default text value "All" to new one by entering something.
    I.fillField(searchBarInputField, 'abc');
    
    let selectedOptInDom = await I.grabTextFrom(selectedDepartment);
    I.assertEqual(selectedOptInDom, department);
    
  },
  
  inputKeyword: function (keyword) {
    I.clearField(searchBarInputField);
    I.fillField(searchBarInputField, keyword);
  },

  submit: function () {
    I.click(searchBtn);
  },
};
