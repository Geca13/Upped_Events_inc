    const BasePage = require("../../BasePage");
    const { expect } = require('chai');
    const assert = require('assert')
    const TICKETS_POPUP = { className: 'receipt-modal' };
    const CLOSE_POPUP_BUTTON = { className: 'close-btn' };
    const EVENT_NAME = { xpath: "//p[@id='eventName']" };
    const PURCHASE_DETAILS = { id: 'purchaseTime' };
    const TICKETS_NAMES_QUANTITY_DISCOUNT = { id: 'itemName' }; //list
    const TICKETS_PRICES = { id: 'itemPrice' }; //list
    const DISCOUNT_BY_TICKET_TYPE = { id: "itemAmt" }
    const SUBTOTAL_TOTAL = { xpath: "//span[@id='subtotalAmt']" }
    const DONATIONS_TITLE = { id: "donations" }
    const DONATIONS_TOTAL = { id: "donationAmt" }
    const TAXES_TITLE = { id: "taxes" }
    const TAXES_TOTAL = { id: "taxAmt" }
    const FEES_TITLE = { id: "fees" }
    const FEES_TOTAL = { id: "feesAmt" }
    const DISCOUNT_TITLE = { id: "discount"}
    const DISCOUNT_VALUE = { id: "discountAmt" }
    const SUBTOTAL_TITLE = { id: "subtotal" }
    const REFUND_VALUE = { id: "refundAmt" }
    const REFUND_TITLE = { id: "refund" }
    const TOTAL_VALUE = { id: "grandTotalAmt" }
    const TOTAL_TITLE = { id: "grandTotal" }

    class ReceiptPopup extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async receiptPopupIsVisible(){
            await this.isDisplayed(TAXES_TOTAL, 5000);
        }
        async assertDataFromSummaryEqualReceiptValues(tickets,donations,subtotal,taxes,fees,discount,total){
            await this.timeout(500)
            let extDonation = await this.getElementText(DONATIONS_TOTAL);
            let extSubtotal = await this.getElementText(SUBTOTAL_TOTAL);
            let extFees = await this.getElementText(FEES_TOTAL)
            let extTaxes = await this.getElementText(TAXES_TOTAL);
            let extDiscount = await this.getElementText(DISCOUNT_VALUE);
            let extTotal = await this.getElementText(TOTAL_VALUE);

            expect(extDonation.substring(1)).to.equal(donations);
            expect(extSubtotal.substring(1)).to.equal(tickets);
            expect(extFees.substring(1)).to.equal(fees);
            expect(extTaxes.substring(1)).to.equal(taxes);
            expect(extDiscount.substring(1)).to.equal(discount);
            expect(extTotal.substring(1)).to.equal(total);

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

        async getCleanTicketPrices(){
            let cleaned = []
            let prices = await this.findAll(TICKETS_PRICES);
            for(let i = 0; i < prices.length; i++){
                let price = await this.getElementTextFromAnArrayByIndex(TICKETS_PRICES, i)
                cleaned.push(price.substring(1))
            }
            return cleaned;
        }

        async getCleanedTicketsDiscounts(){
            let cleaned = []
            let rawDiscounts = await this.findAll(DISCOUNT_BY_TICKET_TYPE);
            for(let i = 0; i < rawDiscounts.length; i++){
                let discount = await this.getElementTextFromAnArrayByIndex(DISCOUNT_BY_TICKET_TYPE, i)
                let dis = discount.substring(3,discount.length - 1)
                cleaned.push(dis)
            }
            return cleaned;
        }

        async timeDateAndEventName(timeDate, eventName){
            let publishedEventName = await this.getElementText(EVENT_NAME);
            expect(publishedEventName).to.equal(eventName);
            let publishedTimeDate = await this.getElementText(PURCHASE_DETAILS);
            assert.equal(publishedTimeDate ,"Purchased on " + timeDate);
        }

        async calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketName, notDiscounted){
            await this.isDisplayed(EVENT_NAME, 5000);
            let tickets = await this.getCleanTicketNames();
            let quantities = await this.getCleanTicketQuantity();
            let prices = await this.getCleanTicketPrices();
            let discounts = await this.getCleanedTicketsDiscounts();
            let totalDiscount = 0.00;
            for(let i = 0; i < tickets.length; i++){
                if(tickets[i] === ticketName){
                    let price = parseFloat(prices[i]);
                    let quantity = parseInt(quantities[i]) - parseInt(notDiscounted);
                    for(let i = 0; i < quantity; i++ ){
                        let calculated = (price * 0.75).toFixed(2);
                        let parsed = parseFloat(calculated)
                        totalDiscount = totalDiscount + parsed;
                    }
                    let rawDiscount = await this.getElementTextFromAnArrayByIndex(DISCOUNT_BY_TICKET_TYPE, i);
                    let discount = parseFloat(discounts[i]);
                    assert.equal(discount, totalDiscount.toFixed(2));
                    assert.equal(rawDiscount,"(-$" + totalDiscount.toFixed(2) + ")");

                }
            }
        }

        async assertDiscountedTicketsCount(){
           let discounted =  await this.returnElementsCount(DISCOUNT_BY_TICKET_TYPE);
           assert.equal(discounted, 2);
        }



    }
    module.exports = ReceiptPopup;
