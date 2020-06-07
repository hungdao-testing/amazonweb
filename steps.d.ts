/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type searchPage = typeof import('./tests/pages/searchPage.js');
type loginPage = typeof import('./tests/pages/loginPage.js');
type searchBoxFrag = typeof import('./tests/fragments/searchBox.js');
type searchResultFrag = typeof import('./tests/fragments/searchResult.js');
type filterOptionFrag = typeof import('./tests/fragments/filterOption.js');
type sortOptionFrag = typeof import('./tests/fragments/sortOption.js');
type headerFrag = typeof import('./tests/fragments/header.js');
type ChaiWrapper = import('codeceptjs-chai');

declare namespace CodeceptJS {
  interface SupportObject { I: CodeceptJS.I, searchPage: searchPage, loginPage: loginPage, searchBoxFrag: searchBoxFrag, searchResultFrag: searchResultFrag, filterOptionFrag: filterOptionFrag, sortOptionFrag: sortOptionFrag, headerFrag: headerFrag }
  interface CallbackOrder { [0]: CodeceptJS.I; [1]: searchPage; [2]: loginPage; [3]: searchBoxFrag; [4]: searchResultFrag; [5]: filterOptionFrag; [6]: sortOptionFrag; [7]: headerFrag }
  interface Methods extends CodeceptJS.Puppeteer, ChaiWrapper {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
