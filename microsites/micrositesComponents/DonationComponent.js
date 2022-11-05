    const { By } = require("selenium-webdriver");
    const BasePage = require("../../BasePage");
    const DONATION_INPUT = { name: 'donation'};
    const DONATE_EVENT_NAME = { className: 'donate-event' };
    const DONATION_MESSAGE = { className: 'donations-message' };
    const DONATE_BUTTONS = { className: 'donations-button' }; //list
    const ADD_DONATION_BUTTON = { className: 'donation-order-button' };
    const RESET_DONATION_BUTTON = { className: 'donation-reset-button' };



    class DonationComponent extends BasePage {
        constructor(driver) {
            super(driver);
        }
        async isOnDonationScreen(){
            await this.isDisplayed(ADD_DONATION_BUTTON,5000);
        }
        async donateEventNameIsDisplayed(){
            await this.isDisplayed(DONATE_EVENT_NAME,5000);
        }
        async donationMessageIsDisplayed(){
            await this.isDisplayed(DONATION_MESSAGE,5000);
        }

        async click$20DonationButton(){
            await this.clickElementReturnedFromAnArray(DONATE_BUTTONS,0)
        }
        async click$35DonationButton(){
            await this.clickElementReturnedFromAnArray(DONATE_BUTTONS,1)
        }
        async click$50DonationButton(){
            await this.clickElementReturnedFromAnArray(DONATE_BUTTONS,2)
        }
        async click$100DonationButton(){
            await this.clickElementReturnedFromAnArray(DONATE_BUTTONS,3)
        }
        async clickAddDonationToOrderButton(){
            await this.click(ADD_DONATION_BUTTON);
            await this.timeout(500);
        }
        async clickResetDonationButton(){
            await this.click(RESET_DONATION_BUTTON);
        }
        async enterCustomAmountInInput(donation){
            let input = await this.find(DONATION_INPUT);
            input.clear();
            await this.timeout(500);
            await input.sendKeys(donation);
        }
        

        async makeCustom$Donations(){
            await this.donateEventNameIsDisplayed();
            await this.donationMessageIsDisplayed();
            await this.enterCustomAmountInInput("13");
            await this.timeout(500);
            //await this.inputHasValueOf('500');
            await this.clickAddDonationToOrderButton();
            await this.timeout(500);
            //await this.inputHasValueOf('500');
            await this.clickResetDonationButton();
            await this.timeout(500);
            //await this.inputHasValueOf('0');
            await this.enterCustomAmountInInput("13");
            await this.timeout(500);
            //await this.inputHasValueOf('500');
            await this.clickAddDonationToOrderButton();
            await this.timeout(500);
            //await this.inputHasValueOf('500');
        }

        async make20$Donations(){
            await this.donateEventNameIsDisplayed();
            await this.donationMessageIsDisplayed();
            await this.click$20DonationButton();
            //await this.inputHasValueOf('20');
            await this.timeout(500);
            await this.clickAddDonationToOrderButton();
            await this.timeout(500);
            //await this.inputHasValueOf('20');
            await this.clickResetDonationButton();
            await this.timeout(500);
            //await this.inputHasValueOf('0');
            await this.click$20DonationButton();
            await this.timeout(500);
            //await this.inputHasValueOf('20');
            await this.clickAddDonationToOrderButton();
            await this.timeout(500);
            //await this.inputHasValueOf('20');
        }

        async make35$Donations(){
            await this.donateEventNameIsDisplayed();
            await this.donationMessageIsDisplayed();
            await this.click$35DonationButton();
            await this.timeout(500);
            //await this.inputHasValueOf('35');
            await this.clickAddDonationToOrderButton();
            await this.timeout(500);
            //await this.inputHasValueOf('35');
            await this.clickResetDonationButton();
            await this.timeout(500);
            //await this.inputHasValueOf('0');
            await this.click$35DonationButton();
            await this.timeout(500);
            //await this.inputHasValueOf('35');
            await this.clickAddDonationToOrderButton();
            await this.timeout(500);
            //await this.inputHasValueOf('35');
        }

        async make50$Donations(){
            await this.donateEventNameIsDisplayed();
            await this.donationMessageIsDisplayed();
            await this.click$50DonationButton();
            //await this.inputHasValueOf('50');
            await this.timeout(500);
            await this.clickAddDonationToOrderButton();
            //await this.inputHasValueOf('50');
            await this.timeout(500);
            await this.clickResetDonationButton();
            //await this.inputHasValueOf('0');
            await this.timeout(500);
            await this.click$50DonationButton();
            await this.timeout(500);
            //await this.inputHasValueOf('50');
            await this.clickAddDonationToOrderButton();
            await this.timeout(500);
            //await this.inputHasValueOf('50');
        }


        async make100$Donations(){
            await this.donateEventNameIsDisplayed();
            await this.donationMessageIsDisplayed();
            await this.click$100DonationButton();
            await this.timeout(500);
            //await this.inputHasValueOf('100');
            await this.clickAddDonationToOrderButton();
            await this.timeout(500);
            //await this.inputHasValueOf('100');
            await this.clickResetDonationButton();
            await this.timeout(500);
            //await this.inputHasValueOf('0');
            await this.click$100DonationButton();
            await this.timeout(500);
            //await this.inputHasValueOf('100');
            await this.clickAddDonationToOrderButton();
            await this.timeout(500);
            //await this.inputHasValueOf('100');
        }
    }
    module.exports = DonationComponent;