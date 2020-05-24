const { I, searchBoxFrag, sortOptionFrag, filterOptionFrag } = inject();

let paginationBar = '//ul[@class="a-pagination"]';
let pageNumberToGo =
  '//ul[@class="a-pagination"]//li[@class="a-normal"]//a[text()="<number>"]';
let pageSelected =
  '//ul[@class="a-pagination"]//li[@class="a-selected"]//a[text()="<number>"]';
let lastPageIndex =
  '(//ul[@class="a-pagination"]//li[@class = "a-disabled"])[last()]';
let searchedResultItems = '[data-component-type="s-search-result"]';

module.exports = {
  // insert your locators and methods here

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
    return await I.grabNumberOfVisibleElements(searchedResultItems);
  },

  navigateToPageByClickingPagination: function (pageNumber) {
    if (!this.isPaginationEnabled()) {
      return;
    }
    let pageIndex = pageNumberToGo.replace("<number>", pageNumber);
    let pageSelectedNew = pageSelected.replace("<number>", pageNumber);
    I.click(pageIndex);
    I.waitForElement(pageSelectedNew);
  },
  navigateToPageByUrl: async function (pageNumber) {
    let currentUrl = await I.grabCurrentUrl();
    let pageUrl = currentUrl.replace(/(&page=\d{1})/, `&page=${pageNumber}`);
    pageUrl = pageUrl.replace(/(&ref=sr_pg_\d{1})/, `&ref=sr_pg_${pageNumber}`);
    let pageSelectedNew = pageSelected.replace("<number>", pageNumber);
    I.amOnPage(pageUrl);
    I.waitForElement(pageSelectedNew);
  },
  getNumberPageIndexs: async function () {
    let totalPages = await I.grabTextFrom(lastPageIndex);
    return totalPages * 1; // convert to number;
  },

  isPaginationEnabled: async function () {
    let numEl = await I.grabNumberOfVisibleElements(paginationBar);
    if (numEl == 0) {
      I.say("No pagination");
      return false;
    }
    I.say("There is pagination");
    return true;
  },
};
