Feature("Search");

Before(() => {
  I.amOnPage("/");
});

let criteria = {
  keyword: "apple",
  department: "Books",
  filter: [
    {
      "Book Language": ["English"],
    },
  ],
  sortBy: "Publication Date",
};

Scenario(
  "Verify the number of item on each page is 16",
  async (I, searchPage) => {
    searchPage.searchFor(criteria.keyword, criteria.department);
    let maxNumPages = await searchPage.getNumberPageIndexs();
    for (let i = 1; i < maxNumPages; i++) {
      searchPage.navigateToPage(i + 1);
      let count = await searchPage.countItemPerPage();
      I.assertEqual(count, 16);
    }
  }
);

Scenario(
  "Verify user could sort by 'Publication Date'",
  async (I, searchPage) => {
    searchPage.searchFor(criteria.keyword, criteria.department);
    searchPage.sortByValue(criteria);
  }
);
