    const BasePage = require('../../BasePage');
    const NAV_LINKS = { xpath: "(//ul[@role='tablist'])[1]//a"}
    
    
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
        
    }
    module.exports = SectionsNavs;