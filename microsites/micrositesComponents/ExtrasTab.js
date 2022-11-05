    const BasePage = require("../../BasePage");
    const ADD_MONEY_TAB = { xpath: "//*[text()='Add Money to Wallet']"};
    const DONATE_TAB = { xpath: "//*[text()='Donate']"};
    const DonationComponent = require('../micrositesComponents/DonationComponent')


    class ExtrasTab extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async clickDonateTab(){
            await this.click(DONATE_TAB);
        }

        async addMoneyTabIsDisplayed() {
             await this.isDisplayed(ADD_MONEY_TAB,5000);
        }

        async donateTabIsDisplayed(){
            let donationComponent = new DonationComponent(this.driver);
            await donationComponent.donateEventNameIsDisplayed();
        }
        async clickAddMoneyTab(){
            await this.click(DONATE_TAB);
        }

        async make$20Donation(){
            let donation = new DonationComponent(this.driver);
            await donation.make20$Donations()
        }

        async make$35Donation(){
            let donation = new DonationComponent(this.driver);
            await donation.make35$Donations()
        }
        async makeCustomDonation(){
            let donation = new DonationComponent(this.driver);
            await donation.makeCustom$Donations()
        }

        async make$50Donation(){
            let donation = new DonationComponent(this.driver);
            await donation.make50$Donations()
        }

        async make$100Donation(){
            let donation = new DonationComponent(this.driver);
            await donation.make100$Donations()
        }

    }

    module.exports = ExtrasTab;