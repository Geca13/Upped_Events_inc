    const BasePage = require('../../../BasePage');
    const EVENT_SECURITY_SUBNAV = { xpath: "//*[text()='Event Security']"}
    const EVENT_PAYMENTS_SUBNAV = { xpath: "//*[text()='Event Payments']"}
    const NOTIFICATIONS_SUBNAV = { xpath: "//*[text()='Notifications']"}
    const DONATIONS_SUBNAV = { xpath: "//*[text()='Donations']"}
    const DonationPage = require('../SettingsNav/DonationsPage');


    class SettingsNavs extends BasePage {
        constructor(driver) {
            super(driver);
        }
        
        async donationsSubNavIsDisplayed(){
            await this.isDisplayed(DONATIONS_SUBNAV,5000, "donationSub");
            await this.timeout(500);
        }
        
    }
    module.exports = SettingsNavs;