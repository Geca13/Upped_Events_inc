    const BasePage = require('../../BasePage');
    const assert = require('assert')
    const SummaryComponent = require('../components/SummaryComponent')
    const DONATION_INPUT = { name: 'donation'};
    const DONATE_HEADER = { className: 'donate-heading' };
    const DONATE_TO_HEADER = { xpath: "//div[@class='text-container']//span" };
    const DONATE_ORGANIZATION = { xpath: "(//div[@class='single-donation']//div)[1]" };
    const ORGANIZATION_DESCRIPTION = { xpath: "(//div[@class='single-donation']//div)[2]" };
    const DOLLAR_INPUT_SYMBOL = { xpath: "(//div[@class='single-donation']//div)//span" }
    const USD_TEXT = { xpath: "(//div[@class='single-donation']//div)[6]" };
    const MINIMUM_DONATION_TEXT = { xpath: "(//div[@class='single-donation']//div)[8]" };
    const USD_TEXT_BOX = { xpath: "(//div[@class='single-donation']//div)[10]" };
    const MINIMUM_DONATION_TEXT_BOX = { xpath: "(//div[@class='single-donation']//div)[11]" };
    const DONATE_BUTTONS = { className: 'donations-button' }; //list
    const ADD_DONATION_BUTTON = { className: 'donation-order-button' };
    const RESET_DONATION_BUTTON = { className: 'donation-reset-button' };
    const SAVE_DONATION_BUTTON = { className: 'donation-save-button' };
    const RESET_ALL_DONATION_BUTTON = { className: 'donation-reset-all-button' };



    class DonateComponent extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async assertElementsOnDonateTab(eventName, message){
            await this.donateScreenIsVisible()
            let donate = await this.returnElementsCount(DONATE_HEADER)
                if(donate > 0 ){
                    let donateHeader = await this.getElementText(DONATE_HEADER);
                    assert.equal(donateHeader, "Donate");
                    let donateToHeader = await this.getElementText(DONATE_TO_HEADER);
                    if(donateToHeader.length < 10 ){
                        assert.equal(donateToHeader, "Donate to");
                    }else {
                        assert.equal(donateToHeader, "Donate to the");
                    }
                }

            let event = await this.getElementText(DONATE_ORGANIZATION);
            assert.equal(event, eventName);
            let donateMessage = await this.getElementText(ORGANIZATION_DESCRIPTION);
            assert.equal(donateMessage, message);
            let donationButtonsCount = await this.returnElementsCount(DONATE_BUTTONS);
            assert.equal(donationButtonsCount, 4);
            let $1 = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS ,0);
            assert.equal($1, "$1");
            let $10 = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS ,1);
            assert.equal($10, "$10");
            let $20 = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS ,2);
            assert.equal($20, "$20");
            let $30 = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS ,3);
            assert.equal($30, "$30");
            let input = await this.getEnteredTextInTheInput(DONATION_INPUT);
            assert.equal(input, "0");
            let $ = await this.getElementText(DOLLAR_INPUT_SYMBOL);
            assert.equal($, "$");
            if(donate > 0 ){
                let usdText = await this.getElementText(USD_TEXT);
                assert.equal(usdText, "USD");
                let minimum = await this.getElementText(MINIMUM_DONATION_TEXT);
                assert.equal(minimum, "($1 minimum donation)");
            }else{
                let usdText = await this.getElementText(USD_TEXT_BOX);
                assert.equal(usdText, "USD");
                let minimum = await this.getElementText(MINIMUM_DONATION_TEXT_BOX);
                assert.equal(minimum, "($1 minimum donation)");
                let resetAllButton = await this.getElementText(RESET_ALL_DONATION_BUTTON);
                assert.equal(resetAllButton, "Reset All");
                let saveButton = await this.getElementText(SAVE_DONATION_BUTTON);
                assert.equal(saveButton, "Save");
            }

            let resetButtonDisplayed = await this.returnElementsCount(RESET_DONATION_BUTTON)
            if(resetButtonDisplayed > 0 ){
                let resetButton = await this.getElementText(RESET_DONATION_BUTTON);
                assert.equal(resetButton, "Reset");
            }
            let addButton = await this.getElementText(ADD_DONATION_BUTTON);
            assert.equal(addButton, "Add to Order");

        }

        async assertCorrectValuesInInputAfterDonationButtonIsClickedInBoxOffice(index){
            await this.donateScreenIsVisible()
            await this.clickElementReturnedFromAnArray(DONATE_BUTTONS,index);
            let buttonText = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS,index);
            await this.timeout(500);
            let $ = await this.getElementText(DOLLAR_INPUT_SYMBOL);
            let inputValue = await this.getEnteredTextInTheInput(DONATION_INPUT);
            assert.equal($+inputValue,buttonText);
            await this.timeout(500);
        }


        async assertCorrectValuesInInputAfterDonationButtonIsClicked(index){
            await this.donateScreenIsVisible()
            await this.clickElementReturnedFromAnArray(DONATE_BUTTONS,index);
            let buttonText = await this.getElementTextFromAnArrayByIndex(DONATE_BUTTONS,index);
            await this.timeout(500);

            let inputValue = await this.getEnteredTextInTheInput(DONATION_INPUT);
            assert.equal("$"+inputValue,buttonText);
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
            await this.donateScreenIsVisible()
            let parsedEntered = await this.addCustomDonationAndReturnValue();
            let summary = new SummaryComponent(this.driver);
            let addedDonation = await summary.getDonationValue();
            assert.equal(parsedEntered.toFixed(2),addedDonation);
        }

        async addCustomDonationAndReturnValue() {
            await this.donateScreenIsVisible()
            await this.clearInputField(DONATION_INPUT);
            await this.clickBackspaceKey(DONATION_INPUT);
            await this.clickBackspaceKey(DONATION_INPUT);
            await this.timeout(1000)
            await this.sentKeys(DONATION_INPUT, "1.1");
            await this.timeout(500);
            let enteredDonation = await this.getEnteredTextInTheInput(DONATION_INPUT);
            let parsedEntered = parseFloat(enteredDonation);
            assert.equal(enteredDonation, "11");
            await this.click(ADD_DONATION_BUTTON);
            return parsedEntered;
        }

        async addCustomDonation() {
            await this.donateScreenIsVisible();
            await this.clearInputField(DONATION_INPUT);
            await this.clickBackspaceKey(DONATION_INPUT);
            await this.clickBackspaceKey(DONATION_INPUT);
            await this.timeout(1000)
            await this.sentKeys(DONATION_INPUT, "1");
            await this.timeout(500);
            await this.click(ADD_DONATION_BUTTON);

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
            await this.isDisplayed(DONATE_BUTTONS, 5000);
            await this.timeout(500)
        }

        async addCustomDonationToInputAndAddItToOrder(){
            await this.donateScreenIsVisible()
            await this.clearInputField(DONATION_INPUT);
            await this.sentKeys(DONATION_INPUT, "1");
            await this.click(ADD_DONATION_BUTTON);
            await this.timeout(500);
        }

        async assertOnceSetDonationIsSavedCorrectlyInBox_OfficeModal(value){
            await this.isDisplayed(DONATION_INPUT,5000)
            let input = await this.getEnteredTextInTheInput(DONATION_INPUT);
            assert.equal(input, value);
            await this.timeout(500)
        }

        async isOnDonationScreen(){
            await this.isDisplayed(DONATE_BUTTONS,5000);
        }

        async click$10DonationButtonForBoxOffice(){
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

        async enterCustomAmountInInput(donation){
            let input = await this.find(DONATION_INPUT);
            input.clear();
            await this.timeout(500);
            await input.sendKeys(donation);
        }

        async clickSaveDonationButtonInBoxOffice(){
            await this.isDisplayed(SAVE_DONATION_BUTTON, 5000);
            await this.click(SAVE_DONATION_BUTTON);
        }
    }
    module.exports = DonateComponent;