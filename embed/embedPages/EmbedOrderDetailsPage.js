    const BasePage = require('../../BasePage')
    const assert = require('assert');
    const ORDER_DETAILS_HEADER = { xpath: "//div[@class='order-heading']//div"};
    const ORDER_DETAILS_SUBTITLE = { xpath: "//div[@class='ord-desc']"};
    const PAYMENT_INFO = { xpath: "//div[@class='payment-info']"};
    const TICKETS_SECTION_HEADER = { xpath: "//div[@class='ticket']"}
    const TICKETS_NAMES_AND_EDIT_CONTAINER = { xpath: "//div[@class='ticket-container']//div[contains(@class , 'wd-60')]" }
    const TICKETS_PRICES = { id: "ticketPrice" }
    const SUBTOTAL_TEXT = { id: "subtotal" }
    const SUBTOTAL_VALUE = { id: "subtotalAmt" }
    

    class EmbedOrderDetailsPage extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async isOnOrderDetailsPage(){
            await this.isDisplayed(ORDER_DETAILS_HEADER,5000);
            await this.timeout(500)
        }

        async assertElementsWhenOneTicketIsSelected(ticketOneName){
            await this.timeout(1000);
            let header = await this.getElementText(ORDER_DETAILS_HEADER);
            assert.equal(header, "Order Details");
            let subheader = await this.getElementText(ORDER_DETAILS_SUBTITLE);
            assert.equal(subheader, "Review your information before placing your order");
            let paymentInfo = await this.getElementText(PAYMENT_INFO);
            assert.equal(paymentInfo, "Payment Info Edit");
            let ticketsHeader = await this.getElementText(TICKETS_SECTION_HEADER);
            assert.equal(ticketsHeader, "Tickets:");
            let selectedTicket = await this.getElementText(TICKETS_NAMES_AND_EDIT_CONTAINER);
            assert.equal(selectedTicket, ticketOneName + " Edit");
            let selectedTicketTotal = await this.getElementText(TICKETS_PRICES);
            assert.equal(selectedTicketTotal,  "$2.00");
            let subtotalText = await this.getElementText(SUBTOTAL_TEXT);
            assert.equal(subtotalText, "Subtotal:");
            let subtotalValue = await this.getElementText(SUBTOTAL_VALUE);
            assert.equal(subtotalValue,  "$2.00");
        }

    }
    module.exports = EmbedOrderDetailsPage;