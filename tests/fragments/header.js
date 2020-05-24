const { I } = inject();

let hamburgerIcon = "##nav-hamburger-menu";
let searchArea = "#nav-search";
let accountOption = '#nav-tools [data-nav-role="signin"]';
let signInFlyOut = 'a[data-nav-ref="nav_signin"]';

module.exports = {
  // insert your locators and methods here

  openCategories: function (category) {
    I.click(hamburgerIcon);
    I.seeTextEquals("SHOP BY CATEGORY", "#hmenu-content");
    I.click(category);
  },

  goToSignIn: function () {
    I.click(accountOption);
    I.waitInUrl("/ap/signin");
  },
};
