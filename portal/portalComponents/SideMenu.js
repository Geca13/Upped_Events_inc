    const BasePage = require('../../BasePage');
    const TICKETING_TAB = { xpath: "//*[text()='Ticketing']"}
    const EVENT_FULL_NAME_TAB = { xpath: "//li[contains(@class , 'nav-subMenu-event-overflow')]//a"}
    const PROMOTIONS_TAB = { xpath: "//*[text()='Promotions']"}


    class SideMenu extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async ticketingTabIsDisplayed(){
            await this.isDisplayed(TICKETING_TAB,5000);
            await this.timeout(500)
        }
        
        async clickEventFullNameTab(){
            await this.isDisplayed(EVENT_FULL_NAME_TAB,5000);
            await this.click(EVENT_FULL_NAME_TAB);
        }
        
        async clickTicketingTab(){
            await this.timeout(500)
            await this.ticketingTabIsDisplayed();
            await this.click(TICKETING_TAB);
        }

        async clickPromotionsTab(){
            await this.isDisplayed(PROMOTIONS_TAB,5000);
            await this.click(PROMOTIONS_TAB);
        }
    }
    module.exports = SideMenu;
