const { I, searchBoxFrag, sortOptionFrag, filterOptionFrag } = inject();

module.exports = {
  // insert your locators and methods here
  paginationBar: 'ul[class="a-pagination"]',
  searchedResultItems: '[data-component-type="s-search-result"]',

  searchFor: function (keyword, department) {
    searchBoxFrag.inputKeyword(keyword);
    searchBoxFrag.selectDepartment(department);
    searchBoxFrag.submit();
  },

  tailorResults: function (criteria) {
    let leftFilterOpt = criteria.filter;
    let sortByOpt = criteria.sortBy;
    leftFilterOpt.forEach((el) => {
      filterOptionFrag.chooseLeftFilterOption(
        Object.keys(el)[0],
        Object.values(el)[0]
      );
    });

    sortOptionFrag.sortByOption(sortByOpt);
  },

  getSearchResultHeader: async function () {
    let keyWordInTitle = await I.grabTextFrom("h1  span");
    return keyWordInTitle;
  },

  countItemPerPage: async function () {
    return await I.grabNumberOfVisibleElements(this.searchedResultItems);
  },

  navigateToPage: function (pageNumber) {},

  isPaginationEnabled: function () {
    I.seeElementInDOM(this.paginationBar);
  },
};
