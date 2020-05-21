const { I } = inject();

module.exports = {
  // insert your locators and methods here
  paginationBar: 'ul[class="a-pagination"]',

  getSearchResultHeader: function () {},

  countItemPerPage: function () {},

  navigateToPage: function (pageNumber) {
    
  },

  isPaginationEnabled: function () {
    I.seeElementInDOM(this.paginationBar);
  },
};
