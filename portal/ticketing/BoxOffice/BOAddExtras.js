    const BasePage = require('../../../BasePage');
    const assert = require('assert')
    const Alerts = require('../../portalComponents/Alerts')
    const EXTRAS_HEADER = { xpath: "//h2[text()='Extras']" }
    const EXTRAS_OPTIONS = { className: "text-center" } //list of three
    const DonateComponent = require('../../../microsites/components/DonateComponent');
    const BOStepper = require("./BOStepper");
    const NEXT_BUTTON = { xpath: "//button[text()='Next']" }
    const ADD_ONS_TOOLTIP = { className: "tooltip-inner" }




    class BOAddExtras extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async isOnExtrasScreen(){
            await this.isDisplayed(EXTRAS_HEADER,5000);
        }

        async clickDonationOptionAndAssertWhenDonationButtonClickedValueAddedToInput(){
           
            await this.isOnExtrasScreen();
            await this.isDisplayed(EXTRAS_OPTIONS, 5000);
            await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
            let donation = new DonateComponent(this.driver);
            await donation.assertCorrectValuesInInputAfterDonationButtonIsClicked(0);
            await donation.assertCorrectValuesInInputAfterDonationButtonIsClicked(1);
            await donation.assertCorrectValuesInInputAfterDonationButtonIsClicked(2);
            await donation.assertCorrectValuesInInputAfterDonationButtonIsClicked(3);
        }

        async clickDonationOptionAddCustomDonationAndAssertAddedDonationMessage(){
            
            await this.isOnExtrasScreen();
            await this.isDisplayed(EXTRAS_OPTIONS, 5000);
            await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
            let donation = new DonateComponent(this.driver);
            await donation.addCustomDonationToInputAndAddItToOrder();
            let alert = new Alerts(this.driver);
            await alert.correctInfoMessageIsDisplayed("Donation Added for UPPED EVENTS INC")
            
        }

        async clickDonationOptionAddCustomDecimalDonationAndAssertOnlyFullNumberIsDisplayed(){
            
            await this.isOnExtrasScreen();
            await this.isDisplayed(EXTRAS_OPTIONS, 5000);
            await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
            let donation = new DonateComponent(this.driver);
            let value = await donation.addCustomDonationAndReturnValue();
            assert.equal(value, "777");
            
        }

        async checkDonationAmountIsSavedInDonationModal(){
            
            await this.isOnExtrasScreen();
            await this.isDisplayed(EXTRAS_OPTIONS, 5000);
            await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
            let donation = new DonateComponent(this.driver);
            let value = await donation.addCustomDonationAndReturnValue();
            await donation.clickSaveDonationButtonInBoxOffice();
            await this.isDisplayed(EXTRAS_OPTIONS, 5000);
            await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
            await donation.assertOnceSetDonationIsSavedCorrectlyInBox_OfficeModal(value);
            
        }

        async clickOnDonationOptionAndAssertElements(eventName){
            
           await this.isOnExtrasScreen();
           await this.isDisplayed(EXTRAS_OPTIONS, 5000);
           await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
           let donation = new DonateComponent(this.driver);
           await donation.assertElementsOnDonateModal("UPPED EVENTS INC", "UPPED EVENTS INC DESCRIPTION");

        }

        async clickDonationOptionAndReceiveDonationNotEnabledMessage(){
            
            await this.isDisplayed(EXTRAS_OPTIONS, 5000);
            await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
            let alert = new Alerts(this.driver);
            await alert.correctInfoMessageIsDisplayed("Event does not have active charity organizations")
            
        }

        async assertElementsOnExtrasPage(){
            await this.isOnExtrasScreen();
            let extrasOptionsCount = await this.returnElementsCount(EXTRAS_OPTIONS);
            assert.equal(extrasOptionsCount, 3);
            let addOns = await this.getElementTextFromAnArrayByIndex(EXTRAS_OPTIONS, 0);
            let donation = await this.getElementTextFromAnArrayByIndex(EXTRAS_OPTIONS, 1);
            let merch = await this.getElementTextFromAnArrayByIndex(EXTRAS_OPTIONS, 2);
            assert.equal(addOns, 'Add-Ons');
            assert.equal(donation, 'Donation');
            assert.equal(merch, 'Merch\n' + '(Coming Soon)');
            await this.moveToElementFromArrayByIndex(EXTRAS_OPTIONS, 0);
            await this.isDisplayed(ADD_ONS_TOOLTIP, 5000);
            let soon = await this.getElementText(ADD_ONS_TOOLTIP);
            assert.equal(soon, 'COMING SOON');
            
        }

        async clickNextButton(){
            await this.isDisplayed(NEXT_BUTTON,5000,);
            await this.click(NEXT_BUTTON);
        }

        async clickNavButtonByIndexWhenOnExtrasPage(index){
            await this.isOnExtrasScreen();
            let stepper = new BOStepper(this.driver);
            await stepper.clickNavElementByIndex(index);
        }

        async add10$ToOrderOnExtrasPage(){
            await this.isOnExtrasScreen();
            await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
            let donation = new DonateComponent(this.driver);
            await donation.isOnDonationScreen();
            await donation.click$10DonationButtonForBoxOffice();
            await this.timeout(500);
            await donation.clickAddDonationToOrderButton();
            await donation.clickSaveDonationButtonInBoxOffice();
            await this.clickNextButton()
        }

        async add35$ToOrderOnExtrasPage(){
            await this.isOnExtrasScreen();
            await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
            let donation = new DonateComponent(this.driver);
            await donation.isOnDonationScreen();
            await donation.click$35DonationButton();
            await this.driver.sleep(500);
            await donation.clickAddDonationToOrderButton();
            await this.clickNextButton()
        }
        async add50$ToOrderOnExtrasPage(){
            await this.isOnExtrasScreen();
            await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
            let donation = new DonateComponent(this.driver);
            await donation.isOnDonationScreen();
            await donation.click$50DonationButton();
            await this.timeout(500);
            await donation.clickAddDonationToOrderButton();
            await this.clickNextButton()
        }
        async addCustom$ToOrderOnExtrasPage(){
            await this.isOnExtrasScreen();
            await this.clickElementReturnedFromAnArray(EXTRAS_OPTIONS,1);
            let donation = new DonateComponent(this.driver);
            await donation.isOnDonationScreen();
            await donation.enterCustomAmountInInput("1");
            await this.timeout(500);
            await donation.clickAddDonationToOrderButton();
            await this.clickNextButton();
        }
    }
    module.exports = BOAddExtras;