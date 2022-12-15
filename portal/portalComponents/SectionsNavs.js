    const BasePage = require('../../BasePage');
    const DonationPage = require('../eventOverview/eventSettings/DonationsPage');
    const NAV_LINKS = { xpath: "(//ul[@role='tablist'])[1]//a"}
    const SUB_NAVS = { xpath: "(//ul[@role='tablist'])[2]//a" }
    
    
    class SectionsNavs extends BasePage {
        constructor(driver) {
            super(driver);
        }
        
       
        async clickNavByIndex(index){
            await this.isDisplayed(NAV_LINKS, 50000);
            await this.timeout(1000);
            await this.clickElementReturnedFromAnArray(NAV_LINKS,index);
        }

        async clickNavByText(text){
            await this.isDisplayed(NAV_LINKS, 5000);
            await this.timeout(500);
            await this.locateElementByTextAndClick(text)
        }
        
        async scrollAndClickOnNavLinkByText(text){
            await this.isDisplayed(NAV_LINKS, 5000);
            await this.scrollUpOrDown(-150);
            await this.timeout(500);
            await this.locateElementByTextAndClick(text)
        }

        async taxesAndFeesNavIsDisplayed(){
            await this.isDisplayed(SUB_NAVS, 5000);
        }
        
        async subNavsAreDisplayed(){
            await this.isDisplayed(SUB_NAVS, 5000);
        }

        async clickSubNavByText(text){
            await this.timeout(2500);
            await this.locateElementByTextAndClick(text)
            await this.timeout(2500);
            
        }

        async makeDonationActive(){
            let donation = new DonationPage(this.driver);
            await donation.createDonationForEvent();
        }

        async moveToEventNavs(){
            await this.moveToElement(NAV_LINKS);
            await this.isDisplayed(NAV_LINKS, 5000);
        }
        
    }
    module.exports = SectionsNavs;