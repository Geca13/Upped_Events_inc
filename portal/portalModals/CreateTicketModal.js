    const BasePage = require('../../BasePage');
    const DateTimePickerModal = require('../portalModals/DateTimePickerModal');
    const TicketsNav = require('../ticketing/TicketsNav');
    const assert = require("assert");
    const TICKET_NAME_INPUT = { xpath: "//input[@id='name']" };
    const TICKET_DESCRIPTION_INPUT = { id: 'description' }
    const TICKET_RULES_INPUT = { id: 'rules' }
    const TICKET_QUANTITY_INPUT = { id: 'quantity'}
    const TICKET_PRICE_INPUT = { id: 'price' }
    const TICKET_START_DATE_INPUT = { id: 'startDate' }
    const TICKET_END_DATE_INPUT = { id: 'endDate' }
    const SAVE_TICKET_BUTTON = { xpath: "//*[text()=' Save ']"};
    const CANCEL_BUTTON = { xpath: "//button[@type='reset']" };
    const BUYER_TOTAL_VALUE = { xpath: "//span[contains(@class , 'price')]" }




    class CreateTicketModal extends BasePage {
        constructor(driver) {
            super(driver);
        }


        async ticketNameInputIsDisplayed(){
            await this.isDisplayed(TICKET_NAME_INPUT, 5000)
            await this.timeout(1000);
        }
        async saveTicketButtonIsVisible(){
            await this.isDisplayed(SAVE_TICKET_BUTTON, 5000)
            await this.timeout(500)
        }
        async clickStartDateTimeInput(){
            await this.click(TICKET_START_DATE_INPUT);
        }

        async clickEndDateTimeInput(){
            await this.click(TICKET_END_DATE_INPUT);
        }

        async clickSaveTicketButton(){
            await this.click(SAVE_TICKET_BUTTON);
            await this.timeout(1500);
        }

        async createFirstTicketAndAssertDataOnTicketsAndUpdate(ticketName,ticketPrice,ticketOneQuantity){
            await this.ticketNameInputIsDisplayed();
            await this.sentKeys(TICKET_NAME_INPUT, ticketName);
            await this.sentKeys(TICKET_DESCRIPTION_INPUT, ticketName + ' description');
            await this.sentKeys(TICKET_RULES_INPUT, ticketName + ' rules');
            await this.clearInputField(TICKET_QUANTITY_INPUT);
            await this.sentKeys(TICKET_QUANTITY_INPUT, ticketOneQuantity.toString());
            await this.sentKeys(TICKET_PRICE_INPUT, ticketPrice);
            await this.click(TICKET_START_DATE_INPUT);
            await this.timeout(1500)
            let startDatePicker = new DateTimePickerModal(this.driver);
            await startDatePicker.datePickerIsVisible();
            await startDatePicker.selectTodayDate();
            await startDatePicker.enterTimeNow();
            await this.timeout(1500)
            await startDatePicker.clickSetButton();
            await this.timeout(1500)
            await this.saveTicketButtonIsVisible();
            let name = await this.getEnteredTextInTheInput(TICKET_NAME_INPUT)
            let description = await this.getEnteredTextInTheInput(TICKET_DESCRIPTION_INPUT);
            let rules = await this.getEnteredTextInTheInput(TICKET_RULES_INPUT);
            let origStart = await this.getEnteredTextInTheInput(TICKET_START_DATE_INPUT)
            let origEnd = await this.getEnteredTextInTheInput(TICKET_END_DATE_INPUT);
            let origAtt = await this.getEnteredTextInTheInput(TICKET_QUANTITY_INPUT);
            let origPrice = await this.getEnteredTextInTheInput(TICKET_PRICE_INPUT);
            let price = await this.returnNumberWith$Sign(TICKET_PRICE_INPUT);
            let start = await this.getOnlyFullDateFromDateTimeInput(TICKET_START_DATE_INPUT);
            let end =await this.getOnlyFullDateFromDateTimeInput(TICKET_END_DATE_INPUT);
            let quantity = await this.numberWithCommas(TICKET_QUANTITY_INPUT);
            await this.timeout(1500)
            await this.click(SAVE_TICKET_BUTTON);
            await this.timeout(1500)
            let ticketNav = new TicketsNav(this.driver);
            await ticketNav.assertCorrectDataIsDisplayedInTableAfterCreatingFirstTicket(name,start,end,price,quantity);
            await this.ticketNameInputIsDisplayed();
            let descriptionOnUpdate = await this.getEnteredTextInTheInput(TICKET_DESCRIPTION_INPUT);
            let rulesOnUpdate = await this.getEnteredTextInTheInput(TICKET_RULES_INPUT);
            let origStartOnUpdate = await this.getEnteredTextInTheInput(TICKET_START_DATE_INPUT)
            let origEndOnUpdate = await this.getEnteredTextInTheInput(TICKET_END_DATE_INPUT);
            let nameOnUpdate = await this.getEnteredTextInTheInput(TICKET_NAME_INPUT)
            let origAttOnUpdate = await this.getEnteredTextInTheInput(TICKET_QUANTITY_INPUT);
            let origPriceOnUpdate = await this.getEnteredTextInTheInput(TICKET_PRICE_INPUT);
            assert.equal(nameOnUpdate,name);
            assert.equal(origStartOnUpdate,origStart);
            assert.equal(origEndOnUpdate,origEnd);
            assert.equal(origAttOnUpdate,origAtt);
            assert.equal(parseFloat(origPriceOnUpdate).toFixed(2),origPrice);
            assert.equal(descriptionOnUpdate,description);
            assert.equal(rulesOnUpdate,rules);

        }

        async assertBuyerTotalEqualsTicketPricePlus$Fee(saved$FeeValue){
            let price = await this.getTicketPriceValue();
            let priceFloated = parseFloat(price);
            let substringFee = saved$FeeValue.substring(1);
            let feeFloated = parseFloat(substringFee);
            let calculatedBuyer = priceFloated + feeFloated;
            let fixedFee = calculatedBuyer.toFixed(2);
            let buyerTotal = await this.getTicketBuyerPriceValue();
            assert.equal(fixedFee, buyerTotal )
        }

        async assertTicketPriceEqualsBuyerTotalPriceWhenNoTaxesOrFees(){
            let price = await this.getTicketPriceValue();
            let buyerTotal = await this.getTicketBuyerPriceValue();
            assert.equal(price, buyerTotal);
        }

        async closeCreateUpdateTicketModal(){
            await this.click(CANCEL_BUTTON);
            await this.timeout(1500);
        }

        async assertBuyerTotalEqualsTicketPriceMultipliedByTaxPercentage(savedTaxValue){
            await this.ticketNameInputIsDisplayed();
            let price = await this.getTicketPriceValue();
            let buyerCalculated = parseFloat(price) + parseFloat(price) / 100 * savedTaxValue ;
            let fixedBuyerCalculated = buyerCalculated.toFixed(2);
            let buyerTotal = await this.getTicketBuyerPriceValue();
            assert.equal(fixedBuyerCalculated, buyerTotal);

        }

        async assertBuyerTotalEqualsTicketPriceMultipliedByTaxPercentageAndAdded$Fee(savedTaxValue, saved$FeeValue){
            await this.ticketNameInputIsDisplayed();
            let price = await this.getTicketPriceValue();
            let feeSubstring = saved$FeeValue.substring(1);
            let feeParsed = parseFloat(feeSubstring);
            let buyerCalculated = (parseFloat(price) + parseFloat(price) / 100 * savedTaxValue) + feeParsed ;
            let buyerTotal = await this.getTicketBuyerPriceValue();
            assert.equal(buyerCalculated.toFixed(2), buyerTotal )
        }

        async getTicketPriceValue(){
            let price = await this.getEnteredTextInTheInput(TICKET_PRICE_INPUT);
            let float = parseFloat(price);
            return float.toFixed(2);
        }

        async getTicketBuyerPriceValue(){
            let rawBuyerTotal = await this.getElementText(BUYER_TOTAL_VALUE);
            let buyerTotalString = rawBuyerTotal.substring(1);
            return parseFloat(buyerTotalString);
        }

        async updateTicketQuantity(quantity){
            await this.isDisplayed(TICKET_QUANTITY_INPUT,5000);
            await this.clearInputFieldByIndexAndSendKeys(TICKET_QUANTITY_INPUT,0, quantity);
            await this.click(SAVE_TICKET_BUTTON);
            await this.timeout(1000);
        }

        async createNewTicket(ticketName,ticketPrice,ticketQuantity){
            await this.ticketNameInputIsDisplayed();
            await this.sentKeys(TICKET_NAME_INPUT, ticketName);
            await this.sentKeys(TICKET_DESCRIPTION_INPUT, ticketName + ' description');
            await this.sentKeys(TICKET_RULES_INPUT, ticketName + ' rules');
            await this.clearInputField(TICKET_QUANTITY_INPUT);
            await this.sentKeys(TICKET_QUANTITY_INPUT, ticketQuantity);
            await this.sentKeys(TICKET_PRICE_INPUT, ticketPrice);
            await this.click(TICKET_START_DATE_INPUT);
            await this.timeout(1500)
            let startDatePicker = new DateTimePickerModal(this.driver);
            await startDatePicker.datePickerIsVisible();
            await startDatePicker.selectTodayDate();
            await startDatePicker.enterTimeNow();
            await this.timeout(1500)
            await startDatePicker.clickSetButton();
            await this.timeout(1500)
            await this.saveTicketButtonIsVisible();
            await this.click(SAVE_TICKET_BUTTON);
            await this.timeout(1500);

        }
        
    }
    module.exports = CreateTicketModal;