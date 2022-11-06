    const BasePage = require('../../BasePage');
    const NAV_LINKS = { xpath: "(//ul[@role='tablist'])[1]//a"}
    const SUB_NAVS = { xpath: "(//ul[@role='tablist'])[2]//a" }
    
    
    class SectionsNavs extends BasePage {
        constructor(driver) {
            super(driver);
        }
        
       
        async clickNavByIndex(index){
            await this.isDisplayed(NAV_LINKS, 5000);
            await this.timeout(1000);
            await this.clickElementReturnedFromAnArray(NAV_LINKS,index);
        }

        async clickNavByText(text){
            await this.isDisplayed(NAV_LINKS, 5000);
            await this.timeout(500);
            await this.clickElementByLinkText(text);
        }

        async taxesAndFeesNavIsDisplayed(){
            await this.isDisplayed(SUB_NAVS, 5000);
        }
        
        async subNavsAreDisplayed(){
            await this.isDisplayed(SUB_NAVS, 5000);
        }

        async clickSubNavByText(text){
            await this.isDisplayed(SUB_NAVS, 5000);
            await this.timeout(500);
            await this.clickElementByLinkText(text);
        }
        
    }
    module.exports = SectionsNavs;