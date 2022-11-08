    const BasePage = require("../../BasePage");
    const assert = require('assert');
    const TICKETS_TOTAL = { id: "ticketCountTotal" }
    const SUBTOTAL_TOTAL = { xpath: "//div[contains(@class , 'sub-total')]//div[@id='subtotalAmt']" }
    const TAXES_TOTAL = { id: "taxesAmt" }
    const FEES_TOTAL = { id: "feesAmt" }
    const TOTAL_TOTAL = { id: "totalDuesAmt" }
    const DONATIONS_TOTAL = { id: "donationsTotal" }
    const DISCOUNT_TITLE = { id: "discount"}
    const DISCOUNT_VALUE = { id: "discountAmt" }
    const APPLIED_DISCOUNT_CODE = { id: "promocode" }
    const TICKETS_COUNT = { id: "ticketCount" }


    class SummaryComponent extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async calculateSubtotalAndTotalBeforeDonationIsAdded(){
           let ticketsTotal = await this.getTicketsTotal();
           let subTotal = await this.getSubtotalValue();
           assert.equal(ticketsTotal,subTotal);
           let taxes = await this.getTaxesValue();
           let fees = await this.getFeesValue();
           let calculatedTotal = parseFloat(subTotal) + parseFloat(taxes) + parseFloat(fees);
           let total = await this.getTotalValue();
           assert.equal(calculatedTotal.toFixed(2),total);
           await this.timeout(1000);

        }
        
        async getTicketsTotal(){
            let rawTickets =  await this.getSubstringOfPriceString(TICKETS_TOTAL);
            let tickets = parseFloat(rawTickets);
            return tickets.toFixed(2);

        }

        async getSubtotalValue(){
            await this.timeout(1000)
            let rawSubtotal =  await this.getSubstringOfPriceString(SUBTOTAL_TOTAL)
            let subtotal = parseFloat(rawSubtotal);
            return subtotal.toFixed(2);
            
        }
        async getTaxesValue(){
            let rawTaxes =  await this.getSubstringOfPriceString(TAXES_TOTAL);
            let taxes = parseFloat(rawTaxes);
            return taxes.toFixed(2);
        }
        async getFeesValue(){
            let rawFees =  await this.getSubstringOfPriceString(FEES_TOTAL);
            let fees = parseFloat(rawFees);
            return  fees.toFixed(2);
        }
        async getTotalValue(){
            let rawTotal =  await this.getSubstringOfPriceString(TOTAL_TOTAL);
            let total = parseFloat(rawTotal);
            return total.toFixed(2);
        }

        async assertSummaryEqualsBeforeSignIn( ticketsTotal, ticketsSubtotal, taxes, fees, total){
            let afterTicketsTotal = await this.getTicketsTotal();
            let afterSubTotal = await this.getSubtotalValue();
            let afterTaxes = await this.getTaxesValue();
            let afterFees = await this.getFeesValue();
            let afterTotal = await this.getTotalValue();
            assert.equal(afterTicketsTotal,ticketsTotal);
            assert.equal(afterSubTotal,ticketsSubtotal);
            assert.equal(afterTaxes,taxes);
            assert.equal(afterFees,fees);
            assert.equal(afterTotal,total);
            await this.timeout(1000);
        }

        async getDonationValue(){
            await this.timeout(1000)
            let rawDonation = await this.getSubstringOfPriceString(DONATIONS_TOTAL)
            let donation = parseFloat(rawDonation);
            return  donation.toFixed(2);
        }

        async calculateSubtotalAndTotalAfterDonationIsAdded(){
            let ticketsTotal = await this.getTicketsTotal();
            let donation = await this.getDonationValue();
            let calculatedDonation = parseFloat(ticketsTotal) + parseFloat(donation);
            let subTotal = await this.getSubtotalValue();
            assert.equal(calculatedDonation.toFixed(2),subTotal);
            let taxes = await this.getTaxesValue();
            let fees = await this.getFeesValue();
            let calculatedTotal = parseFloat(subTotal) + parseFloat(taxes) + parseFloat(fees);
            let total = await this.getTotalValue();
            assert.equal(calculatedTotal.toFixed(2),total);

        }

        async assertDiscountElementsAreNotDisplayed(){
            let title = await this.returnElementsCount(DISCOUNT_TITLE);
            let value = await this.returnElementsCount(DISCOUNT_VALUE);
            let code = await this.returnElementsCount(APPLIED_DISCOUNT_CODE);
            assert.equal(title, 0);
            assert.equal(value, 0);
            assert.equal(code, 0);
        }

        async assertDiscountElementsAreDisplayed(promoCodeOne){
            let title = await this.returnElementsCount(DISCOUNT_TITLE);
            let value = await this.returnElementsCount(DISCOUNT_VALUE);
            let code = await this.returnElementsCount(APPLIED_DISCOUNT_CODE);
            let appliedMessage = await this.getElementText(APPLIED_DISCOUNT_CODE);
            assert.equal(appliedMessage, "Discounts Code: " + promoCodeOne);
            assert.equal(title, 1);
            assert.equal(value, 1);
            assert.equal(code, 1);
        }

        async assertNewPricePlusDiscountEqualTicketPrice(ticketOnePrice){
            let ticket = await this.getTicketsTotal();
            let discount = await this.getDiscountValue();
            let total = (parseFloat(ticket) + parseFloat(discount));
            let ticketParsed = parseFloat(ticketOnePrice);
            assert.equal(total.toFixed(2),ticketParsed.toFixed(2) )
        }

        async getDiscountValue(){
            let rawDiscount = await this.getSubstringOfPriceString(DISCOUNT_VALUE);
            let discount = parseFloat(rawDiscount);
            return discount.toFixed(2);
        }

        async returnTicketCount(){
            let tickets = await this.getElementText(TICKETS_COUNT);
            return tickets.substring(0, 1);
        }

       
    }
    module.exports = SummaryComponent;
