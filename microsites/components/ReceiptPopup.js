    const BasePage = require("../../BasePage");
    const { expect } = require('chai');
    const assert = require('assert');
    const EVENT_NAME = { xpath: "//p[@id='eventName']" };
    const PURCHASE_DETAILS = { id: 'purchaseTime' };
    const TICKETS_NAMES_QUANTITY_DISCOUNT = { id: 'itemName' }; //list
    const TAXES_TOTAL = { id: "taxAmt" }
    

    class ReceiptPopup extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async receiptPopupIsVisible(){
            await this.isDisplayed(TAXES_TOTAL, 5000);
        }

        async assertTicketsOnReceipt(ticketOneName,ticketTwoName,ticketThreeName){
            let names = await this.getCleanTicketNames();
            expect(names[0]).to.equal(ticketOneName);
            expect(names[1]).to.equal(ticketTwoName);
            expect(names[2]).to.equal(ticketThreeName);
            let qty = await this.getCleanTicketQuantity()
            expect(qty[0]).to.equal("1");
            expect(qty[1]).to.equal("3");
            expect(qty[2]).to.equal("2");
        }

        async getCleanTicketNames(){
            let cleaned = [];
            let tickets = await this.findAll(TICKETS_NAMES_QUANTITY_DISCOUNT);
            for(let i = 0; i < tickets.length; i++){
                let ticket = await this.getElementTextFromAnArrayByIndex(TICKETS_NAMES_QUANTITY_DISCOUNT, i);
                cleaned.push(ticket.split(' ')[1])
            }
            return cleaned;
        }

        async getCleanTicketQuantity(){
            let cleaned = [];
            let tickets = await this.findAll(TICKETS_NAMES_QUANTITY_DISCOUNT);
            for(let i = 0; i < tickets.length; i++){
                let ticket = await this.getElementTextFromAnArrayByIndex(TICKETS_NAMES_QUANTITY_DISCOUNT, i);
                let ticketQty = ticket.split(' ')[2]
                cleaned.push(ticketQty.substring(1, ticketQty.length - 1))
            }
            return cleaned;
        }

        async timeDateAndEventName(timeDate, eventName){
            let publishedEventName = await this.getElementText(EVENT_NAME);
            expect(publishedEventName).to.equal(eventName);
            let publishedTimeDate = await this.getElementText(PURCHASE_DETAILS);
            assert.equal(publishedTimeDate ,"Purchased on " + timeDate);
        }
        
    }
    module.exports = ReceiptPopup;
