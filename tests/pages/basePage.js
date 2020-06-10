class BasePage{

    gotoPage(url){
        I.amOnPage('/'+ url)
    };

    isAt(url){
        I.seeInCurrentUrl(url);
    };

    getSelector(loc){
        return loc;
    }

}

module.exports = BasePage;
