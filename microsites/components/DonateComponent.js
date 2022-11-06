    const BasePage = require('../../BasePage');
    const assert = require('assert')
    const SummaryComponent = require('../embedComponents/SummaryComponent')
    const DONATION_INPUT = { name: 'donation'};
    const DONATE_HEADER = { className: 'donate-heading' };
    const DONATE_TO_HEADER = { xpath: "//div[@class='text-container']//span" };
    const DONATE_EVENT_NAME = { xpath: "//div[@class='text-container']//div[2]" };
    const DONATION_MESSAGE = { xpath: "//div[@class='text-container']//div[3]" };
    const OTHER_TEXT = { xpath: "//div[@class='text-container']//div[5]" };
    const DOLLAR_INPUT_SYMBOL = { xpath: "//div[@class='text-container']//div[6]//span" }
    const USD_TEXT = { xpath: "//div[@class='text-container']//div[7]" };
    const MINIMUM_DONATION_TEXT = { xpath: "//div[@class='text-container']//div[8]" };
    const DONATE_BUTTON_CONTAINER = { className: 'donations-buttons-box' };
    const DONATE_BUTTONS = { className: 'donations-button' }; //list
    const ADD_DONATION_BUTTON = { className: 'donation-order-button' };
    const RESET_DONATION_BUTTON = { className: 'donation-reset-button' };


    class DonateComponent extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async assertElementsOnDonateTab(eventName, message){
            await this.donateScreenIsVisible()
            let donateHeader = await this.getElementText(DONATE_HEADER);
            assert.equal(donateHeader, "Donate");
            let donateToHeader = await this.getElementText(DONATE_TO_HEADER);
            if(donateToHeader.length < 10 ){
                assert.equal(donateToHeader, "Donate to");
            }else {
                assert.equal(donateToHeader, "Donate to the");
            }
            let event = await this.getElementText(DONATE_EVENT_NAME);
            assert.equal(event, eventName);
            let donateMessage = await this.getElementText(DONATION_MESSAGE);
            assert.equal(donateMessage, message);
            let donationButtonsCount = await this.returnElementsCount(DONATE_BUTTONS);
            assert.equal(donationButtonsCount, 4);
            let $20 = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS ,0);
            assert.equal($20, "$20");
            let $35 = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS ,1);
            assert.equal($35, "$35");
            let $50 = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS ,2);
            assert.equal($50, "$50");
            let $100 = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS ,3);
            assert.equal($100, "$100");
            let other = await this.getElementText(OTHER_TEXT);
            assert.equal(other, "Other:");
            let input = await this.getEnteredTextInTheInput(DONATION_INPUT);
            assert.equal(input, "0");
            let $ = await this.getElementText(DOLLAR_INPUT_SYMBOL);
            assert.equal($, "$");
            let usdText = await this.getElementText(USD_TEXT);
            assert.equal(usdText, "USD");
            let minimum = await this.getElementText(MINIMUM_DONATION_TEXT);
            assert.equal(minimum, "($1 minimum donation)");
            let resetButtonDisplayed = await this.returnElementsCount(RESET_DONATION_BUTTON)
            if(resetButtonDisplayed > 0 ){
                let resetButton = await this.getElementText(RESET_DONATION_BUTTON);
                assert.equal(resetButton, "Reset");
            }
            let addButton = await this.getElementText(ADD_DONATION_BUTTON);
            assert.equal(addButton, "Add to Order");

        }


        async assertCorrectValuesInInputAfterDonationButtonIsClicked(index){
            await this.donateScreenIsVisible()
            await this.clickElementReturnedFromAnArray(DONATE_BUTTONS,index);
            let buttonText = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS,index);
            await this.timeout(500);
            let $ = await this.getElementText(DOLLAR_INPUT_SYMBOL);
            let inputValue = await this.getEnteredTextInTheInput(DONATION_INPUT);
            assert.equal($+inputValue,buttonText);
            await this.timeout(500);
        }

        async clickOneDonationValueButton(index){
            await this.donateScreenIsVisible()
            await this.clickElementReturnedFromAnArray(DONATE_BUTTONS, index);
        }

        async clickResetDonationButtonAndAssertInputIsReset(){
            await this.timeout(500);
            await this.click(RESET_DONATION_BUTTON);
            await this.timeout(500);
            let inputValue = await this.getEnteredTextInTheInput(DONATION_INPUT);
            assert.equal(inputValue, "0")
        }

        async clickAddDonationButton(){
            await this.timeout(500);
            await this.click(ADD_DONATION_BUTTON);
            await this.timeout(500);

        }

        async addDonationToOrderAndAssertDataInOrderTotal(index){
            await this.donateScreenIsVisible()
            await this.clickElementReturnedFromAnArray(DONATE_BUTTONS,index);
            let buttonText = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS,index);
            let stringValue = buttonText.substring(1);
            let converted = parseFloat(stringValue);
            let fixed = converted.toFixed(2);
            await this.timeout(500);
            await this.click(ADD_DONATION_BUTTON);
            await this.timeout(500);
            let summary = new SummaryComponent(this.driver);
            let addedDonation = await summary.getDonationValue();
            assert.equal(fixed,addedDonation);
        }

        async addCustomDonationAndAssertIsAddedInOrderTotal(){
            let parsedEntered = await this.addCustomDonationAndReturnValue();
            let summary = new SummaryComponent(this.driver);
            let addedDonation = await summary.getDonationValue();
            assert.equal(parsedEntered.toFixed(2),addedDonation);
        }

        async addCustomDonationToInputAndAddItToOrder(){
            await this.donateScreenIsVisible()
            await this.clearInputField(DONATION_INPUT);
            await this.sentKeys(DONATION_INPUT, "7.77");
            await this.click(ADD_DONATION_BUTTON);
            await this.timeout(500);
        }

        async addCustomDonationAndReturnValue() {
            await this.donateScreenIsVisible()
            await this.clearInputField(DONATION_INPUT);
            await this.sentKeys(DONATION_INPUT, "7.77");
            await this.timeout(500);
            let enteredDonation = await this.getEnteredTextInTheInput(DONATION_INPUT);
            let parsedEntered = parseFloat(enteredDonation);
            assert.equal(enteredDonation, "777");
            await this.click(ADD_DONATION_BUTTON);
            return parsedEntered;
        }

        async assertOnceSetDonationIsSavedCorrectlyInBox_OfficeModal(value){
            let input = await this.getEnteredTextInTheInput(DONATION_INPUT);
            assert.equal(input, value);
            await this.timeout(500)
        }

        async calculateTheOrderTotalAfterDonationIsAdded(){
            await this.donateScreenIsVisible()
            await this.clickElementReturnedFromAnArray(DONATE_BUTTONS,2);
            await this.timeout(500);
            await this.clickAddDonationButton();
            let summary = new SummaryComponent(this.driver);
            await summary.calculateSubtotalAndTotalAfterDonationIsAdded();
        }

        async checkWhenInputValue0AddDonationButtonIsDisabledAndResetEnabled(){
            await this.donateScreenIsVisible()
            let input = await this.getEnteredTextInTheInput(DONATION_INPUT);
            assert.equal(input, "0");
            let addButtonStatus = await this.checkIfClassIsApplied(ADD_DONATION_BUTTON, 0, "disabled");
            assert.equal(addButtonStatus, true);
        }

        async checkWhenInputValueNot0AddDonationButtonIsEnabledAndResetDisabled(){
            await this.donateScreenIsVisible()
            let input = await this.getEnteredTextInTheInput(DONATION_INPUT);
            assert.notEqual(input, "0");
            let addButtonStatus = await this.checkIfClassIsApplied(RESET_DONATION_BUTTON, 0, "disabled");
            assert.equal(addButtonStatus, true);
        }

        async donateScreenIsVisible(){
            await this.isDisplayed(DONATION_INPUT, 5000);
            await this.timeout(500)
        }
    }
    module.exports = DonateComponent;