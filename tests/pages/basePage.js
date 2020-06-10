// const PageFactory = require('./../pageFactory');

class BasePage{

    gotoPage(url){
        I.amOnPage('/'+ url)
    };

    isAt(url){
        I.seeInCurrentUrl(url);
    };

}

module.exports = BasePage;
