class PageFactory{

  getPage(pageName) {
    console.log("PageFactory: Go to getPage() function");
    switch (pageName) {
      case "loginPage":
        const LoginPage = require("./pages/loginPage");
        return new LoginPage();
      case "searchPage":
        const SearchPage = require("./pages/searchPage");
        return new SearchPage()
      default:
        console.log("No page matched: ", pageName);
        break;
    }
  }

  getComponent(compName) {
    switch (compName) {
      case "headerComp":
        return require("./fragments/header");
      case "searchComp":
        return require("./fragments/searchBox");
      case "filterComp":
        return require("./fragments/filterOption");
      case "sortComp":
        return require("./fragments/sortOption");
      default:
        console.log("No component matched: ", compName);
    }
  }
}

module.exports = new PageFactory();
