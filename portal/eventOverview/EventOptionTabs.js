    const BasePage = require('../../BasePage');
    const TICKETING_TAB = { xpath: "//*[text()='Ticketing']"}
    
    class EventOptionTabs extends BasePage {
        constructor(driver) {
            super(driver);
        }
       
        async ticketingTabIsDisplayed(){
            await this.isDisplayed(TICKETING_TAB,5000, "ticketingTab");
        }

        async clickTicketingTab(){
            await this.click(TICKETING_TAB);
        }
       
    }
    module.exports = EventOptionTabs;
