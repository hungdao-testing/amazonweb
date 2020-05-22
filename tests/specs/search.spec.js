Feature("login");

Scenario("test something", async (I, searchPage) => {
  let criteria = {
    filter: [
      {
        "Book Language": ["English"],
      },
    ],
    sortBy: "Publication Date",
  };
  I.amOnPage("/");
  searchPage.searchFor("apple", "Books");
  searchPage.tailorResults(criteria);
});
