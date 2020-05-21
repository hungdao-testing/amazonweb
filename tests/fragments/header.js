const { I } = inject();

module.exports = {
  // insert your locators and methods here
  hamburgerIcon: "##nav-hamburger-menu",
  searchArea: "#nav-search",
  accountOption: '#nav-tools [data-nav-role="signin"]',
  signInFlyOut: 'a[data-nav-ref="nav_signin"]',

  openCategories: function () {
    I.click(this.hamburgerIcon);
    I.seeTextEquals("SHOP BY CATEGORY", "#hmenu-content");
  },

  goToSignIn: function () {
    I.moveCursorTo(this.accountOption);
    I.waitForClickable(this.signInFlyOut);
    I.click(this.signInFlyOut);
  },
};
