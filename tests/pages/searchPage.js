const { I, searchBoxFrag, sortOptionFrag, filterOptionFrag } = inject();

module.exports = {
  // insert your locators and methods here
  paginationBar: '//ul[@class="a-pagination"]',
  pageNumberToGo:
    '//ul[@class="a-pagination"]//li[@class="a-normal"]//a[text()="<number>"]',
  pageSelected:
    '//ul[@class="a-pagination"]//li[@class="a-selected"]//a[text()="<number>"]',
  lastPageIndex:
    '(//ul[@class="a-pagination"]//li[@class = "a-disabled"])[last()]',
  searchedResultItems: '[data-component-type="s-search-result"]',

  searchFor: function (keyword, department) {
    searchBoxFrag.inputKeyword(keyword);
    searchBoxFrag.selectDepartment(department);
    searchBoxFrag.submit();
  },

  filterByValues: function (criteria) {
    let leftFilterOpt = criteria.filter;
    leftFilterOpt.forEach((el) => {
      filterOptionFrag.chooseLeftFilterOption(
        Object.keys(el)[0],
        Object.values(el)[0]
      );
    });
  },

  sortByValue: function (criteria) {
    let sortByOpt = criteria.sortBy;
    sortOptionFrag.sortByOption(sortByOpt);
  },

  getSearchResultHeader: async function () {
    let keyWordInTitle = await I.grabTextFrom("h1  span");
    return keyWordInTitle;
  },

  countItemPerPage: async function () {
    return await I.grabNumberOfVisibleElements(this.searchedResultItems);
  },

  navigateToPage: function (pageNumber) {
    if (!this.isPaginationEnabled()) {
      return;
    }
    let pageIndex = this.pageNumberToGo.replace("<number>", pageNumber);
    let pageSelected = this.pageSelected.replace("<number>", pageNumber);
    I.click(pageIndex);
    I.waitForElement(pageSelected);
  },

  getNumberPageIndexs: async function () {
    let totalPages = await I.grabTextFrom(this.lastPageIndex);
    return totalPages * 1; // convert to number;
  },

  isPaginationEnabled: async function () {
    let numEl = await I.grabNumberOfVisibleElements(this.paginationBar);
    if (numEl == 0) {
      I.say("No pagination");
      return false;
    }
    I.say("There is pagination");
    return true;
  },
};
