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
        
    }
    module.exports = CreateTicketModal;