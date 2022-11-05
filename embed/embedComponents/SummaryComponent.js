    const BasePage = require("../../BasePage");
    const assert = require('assert');
    const TICKETS_TOTAL = { id: "ticketCountTotal" }
    const SUBTOTAL_TOTAL = { xpath: "//div[contains(@class , 'sub-total')]//div[@id='subtotalAmt']" }
    const TAXES_TOTAL = { id: "taxesAmt" }
    const FEES_TOTAL = { id: "feesAmt" }
    const TOTAL_TOTAL = { id: "totalDuesAmt" }


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

       
    }
    module.exports = SummaryComponent;
