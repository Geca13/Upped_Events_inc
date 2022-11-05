    const BasePage = require('../../BasePage');
    const TICKETS_NAV = { xpath: "//*[text()='Tickets']"}
    const SETTINGS_NAV = { xpath: "//*[text()='Settings']"}
    
    class EventTickets extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async clickTicketsTab(){
            await this.isDisplayed(TICKETS_NAV,5000)
            await this.timeout(500);
            await this.scrollUpOrDown(-150);
            await this.timeout(1500);
            await this.click(TICKETS_NAV);
            await this.timeout(1000);
        }
        async clickSettingsTab(){
            await this.click(SETTINGS_NAV);
        }
    }
    module.exports = EventTickets;