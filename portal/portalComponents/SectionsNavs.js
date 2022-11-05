    const BasePage = require('../../BasePage');
    const assert = require('assert');
    const NAV_LINKS = { xpath: "(//ul[@role='tablist'])[1]//a"}
    const SUB_NAVS = { xpath: "(//ul[@role='tablist'])[2]//a" }
    
    
    class SectionsNavs extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async returnNavLinksCount(){
            await this.isDisplayed(NAV_LINKS, 5000);
            return await this.returnElementsCount(NAV_LINKS);
        }

        async returnSubNavLinksCount(){
            await this.isDisplayed(SUB_NAVS, 5000);
            return await this.returnElementsCount(SUB_NAVS);
        }
        
        async assertNavLinksCount(count){
            assert.equal(await this.returnNavLinksCount(), count);
        }

        async assertNavLinkTextByIndex(text , index){
            assert.equal(await this.getElementTextFromAnArrayByIndex(NAV_LINKS, index), text);
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

        async getNavNameByIndex(index){
            await this.isDisplayed(NAV_LINKS, 5000);
            return await this.getElementTextFromAnArrayByIndex(NAV_LINKS, index);
        }

        async moveToEventNavs(){
            await this.moveToElement(NAV_LINKS);
            await this.isDisplayed(NAV_LINKS, 5000);
        }
        
        async assertSectionSubNavsCount(count){
            await this.isDisplayed(SUB_NAVS,5000);
            assert.equal(await this.returnSubNavLinksCount(), count);
        }
        
        async assertSubNavLinkTextByIndex(text , index){
            assert.equal(await this.getElementTextFromAnArrayByIndex(SUB_NAVS, index), text);
        }
        

        
        async taxesAndFeesNavIsDisplayed(){
            await this.isDisplayed(SUB_NAVS, 5000);
        }

        

        async clickSubNavByIndex(index){
            await this.isDisplayed(SUB_NAVS, 5000);
            await this.timeout(1000);
            await this.clickElementReturnedFromAnArray(SUB_NAVS,index);
        }

        async getSubNavNameByIndex(index){
            await this.isDisplayed(SUB_NAVS, 5000);
            return await this.getElementTextFromAnArrayByIndex(SUB_NAVS, index);
        }

        async clickSubNavByText(text){
            await this.isDisplayed(SUB_NAVS, 5000);
            await this.timeout(500);
            await this.clickElementByLinkText(text);
        }
        
         

    }
    module.exports = SectionsNavs;