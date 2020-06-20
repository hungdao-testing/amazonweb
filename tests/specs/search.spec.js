const fileManager = require("../utils/fileManage");


Feature("Search").tag("@search");

let data = fileManager.fetchDataFile("valid_search.json");
let page;

Before(async (I, PageFactory) => {
  page = PageFactory.getPage("searchPage");
  I.amOnPage("/");
  await page.searchFor(data.keyword, data.department);
});


Scenario(
  "Verify the number of item on each page is 16",
  async (I) => {
    let maxNumPages = await page.getNumberPageIndexs();

    //Assert item in page_1
    I.say("Verify number of item is first page");
    let iteminPageOne = await page.countItemPerPage();
    I.assertEqual(iteminPageOne, 16);

    if (maxNumPages >= 2) {
      I.say("Verify number of item in second page");
      page.navigateToPageByClickingPagination(2);
      let iteminPageTwo = await page.countItemPerPage();
      I.assertEqual(iteminPageTwo, 16);

      //Go to final page and verify number of items in last page
      I.say("Verify number of item in last page");
      page.navigateToPageByUrl(maxNumPages);
      let iteminPageFinal = await page.countItemPerPage();
      I.assertEqual(iteminPageFinal, 16);
    }
  }
).tag("@maxItem").tag("@smoke");

Scenario(
  "Verify user could sort by 'Publication Date'",
  async () => {
    page.sortByValue(data);
  }
).tag("@sort");
