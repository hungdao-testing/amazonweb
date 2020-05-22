const { I } = inject();

module.exports = {
  // insert your locators and methods here
  leftBarFilterSection:
    '//span[text()="<sectionName>"]/parent::div/following-sibling::ul',

  chooseLeftFilterOption: function (sectionName, text) {
    let sectionLoc = this.leftBarFilterSection.replace(
      "<sectionName>",
      sectionName
    );
    let locator = locate(sectionLoc).find("li").withText(text).find("a");
    I.click(locator);
  },
};
