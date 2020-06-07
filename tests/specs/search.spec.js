const fileManager = require("../utils/fileManage");
Feature("Search").tag("@search");

Before((I, searchPage) => {
  I.amOnPage("/");
  searchPage.searchFor(data.keyword, data.department);
});

let data = fileManager.fetchDataFile("valid_search.json");

Scenario(
  "Verify the number of item on each page is 16",
  async (I, searchPage) => {
    let maxNumPages = await searchPage.getNumberPageIndexs();

    //Assert item in page_1
    I.say("Verify number of item is first page");
    let iteminPageOne = await searchPage.countItemPerPage();
    I.assertEqual(iteminPageOne, 16);

    if (maxNumPages >= 2) {
      I.say("Verify number of item in second page");
      searchPage.navigateToPageByClickingPagination(2);
      let iteminPageTwo = await searchPage.countItemPerPage();
      I.assertEqual(iteminPageTwo, 16);

      //Go to final page and verify number of items in last page
      I.say("Verify number of item in last page");
      searchPage.navigateToPageByUrl(maxNumPages);
      let iteminPageFinal = await searchPage.countItemPerPage();
      I.assertEqual(iteminPageFinal, 16);
    }
  }
).tag("@maxItem").tag("@smoke");

Scenario(
  "Verify user could sort by 'Publication Date'",
  async (I, searchPage) => {
    searchPage.sortByValue(data);
  }
).tag("@sort");
