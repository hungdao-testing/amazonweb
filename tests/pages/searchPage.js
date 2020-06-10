const { I, PageFactory } = inject();
const BasePage = require("./basePage");

class SearchPage extends BasePage {
  #paginationBar = '//ul[@class="a-pagination"]';
  #pageNumberToGo = '//ul[@class="a-pagination"]//li[@class="a-normal"]//a[text()="<number>"]';
  #pageSelected = '//ul[@class="a-pagination"]//li[@class="a-selected"]//a[text()="<number>"]';
  #lastPageIndex = '(//ul[@class="a-pagination"]//li[@class = "a-disabled"])[last()]';
  #searchedResultItems = '[data-component-type="s-search-result"]';

  constructor() {
    super();
    this.searchBox = PageFactory.getComponent("searchComp");
    this.filterOpt = PageFactory.getComponent("filterComp");
    this.sortOpt = PageFactory.getComponent("sortComp");
  }
  /**
   *
   * @param {*} keyword  searched keyword (e.g. apple)
   * @param {*} department searched department or category
   */
  searchFor(keyword, department) {
    this.searchBox.inputKeyword(keyword);
    this.searchBox.selectDepartment(department);
    this.searchBox.submit();
  }

  /**
   *
   * @param {*} pageNumber navigate to a page by clicing on a number in pagination
   */
  navigateToPageByClickingPagination(pageNumber) {
    if (!this.isPaginationEnabled()) {
      return;
    }
    let pageIndex = super
      .getSelector(this.#pageNumberToGo)
      .replace("<number>", pageNumber);
    let pageSelectedNew = super
      .getSelector(this.#pageSelected)
      .replace("<number>", pageNumber);
    I.click(pageIndex);
    I.waitForElement(pageSelectedNew);
  }

  /**
   *
   * @param {*} pageNumber navigate to a page by directly accessing by URL
   */
  async navigateToPageByUrl(pageNumber) {
    let currentUrl = await I.grabCurrentUrl();
    let pageUrl = currentUrl.replace(/(&page=\d{1})/, `&page=${pageNumber}`);
    pageUrl = pageUrl.replace(/(&ref=sr_pg_\d{1})/, `&ref=sr_pg_${pageNumber}`);
    let pageSelectedNew = super
      .getSelector(this.#pageSelected)
      .replace("<number>", pageNumber);
    I.amOnPage(pageUrl);
    I.waitForElement(pageSelectedNew);
  }

  /**
   *
   * @param {*} criteria criteria to sort, the sameple please access to /fixture/data
   */
  sortByValue(criteria) {
    this.sortOpt.sortByOption(criteria.sortBy);
  }

  /**
   *
   * @param {*} criteria list of criterias to filter, the sameple please access to /fixture/data
   */
  filterByValues(criteria) {
    let leftFilterOpt = criteria.filter;
    leftFilterOpt.forEach((el) => {
      this.filterOpt.chooseLeftFilterOption(
        Object.keys(el)[0],
        Object.values(el)[0]
      );
    });
  }

  /**
   * Count items on search result page
   */
  async countItemPerPage() {
    return await I.grabNumberOfVisibleElements(
      super.getSelector(this.#searchedResultItems)
    );
  }

  /**
   * Count the number of indexes in pagination
   */
  async getNumberPageIndexs() {
    let totalPages = await I.grabTextFrom(
      super.getSelector(this.#lastPageIndex)
    );
    return totalPages * 1; // convert to number;
  }

  /**
   * Check the result page has pagination
   */
  async isPaginationEnabled() {
    let numEl = await I.grabNumberOfVisibleElements(
      super.getSelector(this.#paginationBar)
    );
    if (numEl == 0) {
      I.say("No pagination");
      return false;
    }
    I.say("There is pagination");
    return true;
  }
}

module.exports = SearchPage;