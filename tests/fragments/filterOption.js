const { I } = inject();

let leftBarFilterSection =
  '//span[text()="<sectionName>"]/parent::div/following-sibling::ul';

module.exports = {
  // insert your locators and methods here

  chooseLeftFilterOption: function (sectionName, text) {
    let sectionLoc = leftBarFilterSection.replace("<sectionName>", sectionName);
    let locator = locate(sectionLoc).find("li").withText(text).find("a");
    I.click(locator);
  },
};
