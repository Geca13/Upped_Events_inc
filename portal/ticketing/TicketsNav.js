    const BasePage = require('../../BasePage');
    const assert = require('assert')
    const ADD_TICKET_BUTTON = { xpath: "//*[text()='Add']" }
    const DEACTIVATED_TICKET_TOGGLE = {className: 'lc_off' }
    const ACTIVATED_TICKET_TOGGLE = {className: 'lc_on' }
    const TICKET_ACTIVATION_MODAL = { tagName: 'response-message-popup' }
    const TICKET_ACTIVATION_YES_BUTTON = { xpath: "//*[text()='Yes']" }
    const TICKETS_NAMES = { className: "column-name" };
    const TICKETS_START_DATES = { className: "column-startdate" }
    const TICKETS_END_DATES = { className: "column-enddate" }
    const TICKETS_PRICES = { className: "column-price" };
    const TICKETS_QUANTITIES = { className: "column-quantity" };
    const SOLD_TICKETS_NUMBER = { className: 'column-sold'} //list
    const EDIT_TICKET_BUTTONS = { className: 'text-second'} 



    class TicketsNav extends BasePage {
        constructor(driver) {
            super(driver);
        }
        
        async addTicketButtonIsDisplayed(){
            await this.isDisplayed(ADD_TICKET_BUTTON, 15000)
            await this.timeout(1000);
        }
        async activateTicketModalIsDisplayed(){
            await this.isDisplayed(TICKET_ACTIVATION_MODAL, 15000)
        }
        

        async assertCorrectDataIsDisplayedInTableAfterCreatingFirstTicket(name,start,end,price,quantity){
            await this.isDisplayed(TICKETS_NAMES,5000);
            await this.timeout(500)
            let i = await this.returnIndexWhenTextIsKnown(TICKETS_NAMES, name);
            await this.timeout(2000)
            let savedName = await this.getElementTextFromAnArrayByIndex(TICKETS_NAMES, i);
            let savedStartDateTime = await this.getElementTextFromAnArrayByIndex(TICKETS_START_DATES, i);
            let savedEndDateTime = await this.getElementTextFromAnArrayByIndex(TICKETS_END_DATES, i);
            let savedPrice = await this.getElementTextFromAnArrayByIndex(TICKETS_PRICES, i);
            let savedQuantity = await this.getElementTextFromAnArrayByIndex(TICKETS_QUANTITIES, i);
            let soldQuantity = await this.getElementTextFromAnArrayByIndex(SOLD_TICKETS_NUMBER, i);
            assert.equal(savedName,name);
            assert.equal(savedStartDateTime,start);
            assert.equal(savedEndDateTime,end);
            assert.equal(savedPrice,price);
            assert.equal(savedQuantity,quantity);
            assert.equal(soldQuantity,'0');
            await this.clickEditTicketButton(i);
            await this.timeout(1500)
        }

        async clickEditTicketButton(index){
            await this.isDisplayed(EDIT_TICKET_BUTTONS,5000);
            await this.clickElementReturnedFromAnArray(EDIT_TICKET_BUTTONS,index)
        }
        
        async clickActivateTicketToggle(ticketName){
            await this.isDisplayed(TICKETS_NAMES,5000);
            let i = await this.returnIndexWhenTextIsKnown(TICKETS_NAMES, ticketName);
            await this.timeout(2000);
            await this.clickElementReturnedFromAnArray(DEACTIVATED_TICKET_TOGGLE,i);
            await this.activateTicketModalIsDisplayed();
            await this.confirmActivationButton();
            await this.timeout(2000);
        }

        async confirmActivationButton(){
            await this.click(TICKET_ACTIVATION_YES_BUTTON);
            await this.isDisplayed(ACTIVATED_TICKET_TOGGLE,5000);
        }
        
        async clickAddTicketButton(){
            await this.addTicketButtonIsDisplayed();
            await this.click(ADD_TICKET_BUTTON);
        }

        async clickEditTicketButtonByTicketName(ticketOneName){
            await this.isDisplayed(TICKETS_NAMES,5000);
            let i = await this.returnIndexWhenTextIsKnown(TICKETS_NAMES, ticketOneName);
            await this.timeout(2000);
            await this.clickElementReturnedFromAnArray(EDIT_TICKET_BUTTONS,i);
            await this.timeout(1000);
        }

        async assertQuantityEqualsSoldColumnByTicket(ticketName){
            await this.addTicketButtonIsDisplayed();
            await this.isDisplayed(TICKETS_NAMES,5000);
            let i = await this.returnIndexWhenTextIsKnown(TICKETS_NAMES, ticketName);
            let quantity = await this.getElementTextFromAnArrayByIndex(TICKETS_QUANTITIES,i);
            let sold = await this.getElementTextFromAnArrayByIndex(SOLD_TICKETS_NUMBER,i);
            assert.equal(quantity, sold);
        }

        async calculateAvailableTicketsByTicket(ticketOneName){
            let i = await this.returnIndexWhenTextIsKnown(TICKETS_NAMES, ticketOneName);
            let quantity = await this.getElementTextFromAnArrayByIndex(TICKETS_QUANTITIES,i);
            let parsedQty = parseInt(quantity);
            let sold = await this.getElementTextFromAnArrayByIndex(SOLD_TICKETS_NUMBER,i);
            let parsedSold = parseInt(sold);
            return parsedQty - parsedSold;
        }
        

    }
    module.exports = TicketsNav;


 