    const BasePage = require('../../BasePage')
    const assert = require('assert');
    const PaymentPage = require('../embedPages/PaymentPage');
    const ORDER_DETAILS_HEADER = { xpath: "//div[@class='order-heading']//div"};
    const ORDER_DETAILS_SUBTITLE = { xpath: "//div[@class='ord-desc']"};
    const PAYMENT_INFO = { xpath: "//div[@class='payment-info']"};
    const TICKETS_SECTION_HEADER = { xpath: "//div[@class='ticket']"}
    const TICKETS_NAMES_AND_EDIT_CONTAINER = { xpath: "//div[@class='ticket-container']//div[contains(@class , 'wd-60')]" }
    const TICKETS_PRICES = { id: "ticketPrice" }
    const SUBTOTAL_TEXT = { id: "subtotal" }
    const SUBTOTAL_VALUE = { id: "subtotalAmt" }
    const EDIT_PAYMENT_INFO_LINK = { id: "editInfo"};
    const PLACE_ORDER_BUTTON = { xpath: "//*[text()='Place your order']"};
    const WALLET_AS_PAYMENT = { xpath : "//ng-conatiner//div[@class='ng-star-inserted']"};
    const CARD_AS_PAYMENT = { xpath: "//div[contains(@class , 'selected-card')]"}
    const CARD_BRAND = { id: "serviceName"}
    const CARD_NUMBER= { id: "cardNumber"};
    const EDIT_TICKET_LINK = { id: "editDetail" }
    const EDIT_DONATION_LINK = { id: "editDonations"}




    class EmbedOrderDetailsPage extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async isOnOrderDetailsPage(){
            await this.isDisplayed(ORDER_DETAILS_HEADER,5000);
        }

        async clickPlaceOrderButton(){
            await this.isOnOrderDetailsPage();
            await this.isDisplayed(PLACE_ORDER_BUTTON,5000);
            await this.click(PLACE_ORDER_BUTTON);
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

        async clickEditPaymentLinkAndAssertItIsOnPaymentPage(){
            await this.click(EDIT_PAYMENT_INFO_LINK);
            let payment = new PaymentPage(this.driver);
            await payment.isAtPaymentPage();
        }

        async walletOptionIsDisplayedAndAssertText(){
            await this.isDisplayed(WALLET_AS_PAYMENT, 5000);
            let wallet = await this.getElementText(WALLET_AS_PAYMENT);
            assert.equal(wallet, "Wallet")
        }

        async assertSelectedCardIsDisplayedAndAssertData(cardData){
            await this.isDisplayed(CARD_AS_PAYMENT, 5000);
            let brand = await this.getElementText(CARD_BRAND);
            let number = await this.getElementText(CARD_NUMBER);
            assert.equal(brand + " " + number, cardData);
        }

        async clickEditLinkOnDisplayedTicketAssertIsOnTicketsPage(embedTickets){
            await this.isOnOrderDetailsPage();
            await this.isDisplayed(EDIT_TICKET_LINK,5000);
            await this.timeout(500);
            await this.click(EDIT_TICKET_LINK);
            await embedTickets.ticketListIsDisplayed();
            await this.timeout(1000);
        }

        async clickEditDonationLinkAndAssertItIsOnExtrasPage(embedDonate){
            await this.isOnOrderDetailsPage();
            await this.isDisplayed(EDIT_DONATION_LINK,5000);
            await this.timeout(500);
            await this.click(EDIT_DONATION_LINK);
            await embedDonate.donateScreenIsVisible();
            await this.timeout(1000);
        }

    }
    module.exports = EmbedOrderDetailsPage;