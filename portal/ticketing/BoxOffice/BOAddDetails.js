    const BasePage = require('../../../BasePage');
    const assert = require('assert')
    const Alerts = require('../../portalComponents/Alerts')
    const BOReviewAndPay = require('./BOReviewAndPay')
    const TICKET_Q_HEADER = { xpath: "//h1[@class='heading']" }
    const TICKET_Q_SUB_HEADER = { xpath: "//div[@class='sub-heading']" }
    const NEXT_BUTTON = { xpath: "//button[text()='Next']" }
    const DISCOUNT_CODE_HEADER = { className: "discount-code-heading" }
    const PROMO_INPUT = { xpath: "//div[@name='promoCode']//input" }
    const APPLY_BUTTON = { id: "applybtn" }
    const APPLIED_PROMOTION_DIV = { className: "discount-code" }
    const INVALID_DISCOUNT_CODE_ICON = { className: "icon-exclamation-triangle" }
    const DISCOUNT_CODE_MESSAGE = { xpath: "//div[contains(@class, 'discount-code')]" }
    const ORDER_DETAILS_BOX = { id: "Orderdetail" };
    const ORDER_DETAILS_HEADER = { id: "orderheading" };
    const ORDER_DETAILS_SUBHEADER = { xpath: "//h3[@class='order-subheading']" };
    const ORDER_DETAILS_SECTION_TITLES = { xpath: "//div[contains(@class, 'title')]" };
    const TICKETS_NAME_PARENT = {  className:"justify-content-between"} //list
    const TICKETS_NAMES = {  className: "ticket-name-detail"} //list
    const SUBTOTAL_HEADER = { xpath: "//div[@id='orderheading']" }
    const SUBTOTAL = { className: "sub-total"};
    const TOTAL_DUE = { className: "total-due"};
    const TOTAL = { className: "total-due-amount"};
    const PRICING_ADDING_NAMES = { xpath: "//div[contains(@class, 'mt-0')]" }
    const VALUES = { xpath: "//div[contains(@class, 'w-7')]" };



    class BOAddDetails extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async isOnDetailsPage(){
            await this.isDisplayed(ORDER_DETAILS_BOX,5000);
        }

        async assertElementsOnOrderDetailsWithOnlyBasicTicket(ticketOneName, ticketPrice, uppedFee$, uppedFeePercent){
            
            await this.isOnDetailsPage();

            let ticketQHeader = await this.getElementText(TICKET_Q_HEADER);
            let ticketQSubHeader = await this.getElementText(TICKET_Q_SUB_HEADER);
            let orderDetailsHeader = await this.getElementText(ORDER_DETAILS_HEADER);
            let orderDetailsSubHeader = await this.getElementText(ORDER_DETAILS_SUBHEADER);
            let ticketsSectionHeader = await this.getElementTextFromAnArrayByIndex(ORDER_DETAILS_SECTION_TITLES, 0);
            let extrasSectionHeader = await this.getElementTextFromAnArrayByIndex(ORDER_DETAILS_SECTION_TITLES, 1);
            let walletSectionHeader = await this.getElementTextFromAnArrayByIndex(ORDER_DETAILS_SECTION_TITLES, 2);
            let donationSectionHeader = await this.getElementTextFromAnArrayByIndex(ORDER_DETAILS_SECTION_TITLES, 3);
            let subtotalHeader = await this.getElementText(SUBTOTAL_HEADER)
            let taxesName = await this.getElementTextFromAnArrayByIndex(PRICING_ADDING_NAMES, 0);
            let feesName = await this.getElementTextFromAnArrayByIndex(PRICING_ADDING_NAMES, 1);
            let shippingName = await this.getElementTextFromAnArrayByIndex(PRICING_ADDING_NAMES, 2);
            let discountName = await this.getElementTextFromAnArrayByIndex(PRICING_ADDING_NAMES, 3);
            let discountHeader = await this.getElementText(DISCOUNT_CODE_HEADER)
            let inputPlaceholder = await this.getPlaceholderTextFromInputByIndex(PROMO_INPUT, 0);
            let applyBtn = await this.getElementText(APPLY_BUTTON);
            let totalDue = await this.getElementText(TOTAL_DUE);
            let rawTicketOne = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,0,0);
            let ticketsValue = await this.getElementTextFromAnArrayByIndex(VALUES, 0);
            let walletValue = await this.getElementTextFromAnArrayByIndex(VALUES, 1);
            let donationValue = await this.getElementTextFromAnArrayByIndex(VALUES, 2);
            let subtotalValue = await this.getElementTextFromAnArrayByIndex(VALUES, 3);
            let taxesValue = await this.getElementTextFromAnArrayByIndex(VALUES, 4);
            let feesValue = await this.getElementTextFromAnArrayByIndex(VALUES, 5);
            let shippingValue = await this.getElementTextFromAnArrayByIndex(VALUES, 6);
            let discountValue = await this.getElementTextFromAnArrayByIndex(VALUES, 7);
            let totalDueValue = await this.getElementText(TOTAL);
            let ticketFee = ((parseFloat(ticketPrice) + parseFloat(ticketPrice) / 100 * uppedFeePercent) + uppedFee$) - parseFloat(ticketPrice)

            assert.equal( rawTicketOne.substring(0,8), ticketOneName);
            assert.equal( ticketQHeader,"Ticket Questions");
            assert.equal( ticketQSubHeader, "Please have the attendee answer the following questions");
            assert.equal( orderDetailsHeader ,"Order Details");
            assert.equal(orderDetailsSubHeader, "Review your information before placing order.");
            assert.equal(ticketsSectionHeader, "Tickets:");
            assert.equal( extrasSectionHeader,"Extras:");
            assert.equal( walletSectionHeader, "Money To Wallet:");
            assert.equal( donationSectionHeader ,"Donation:");
            assert.equal(subtotalHeader, "Subtotal:");
            assert.equal(taxesName, "Taxes:");
            assert.equal( feesName,"Fees:");
            assert.equal( shippingName, "Shipping:");
            assert.equal( discountName ,"Discount:");
            assert.equal(discountHeader, "Discount Code");
            assert.equal(inputPlaceholder, "########");
            assert.equal( applyBtn ,"Apply");
            assert.equal(totalDue, "Total Due :");
            assert.equal(inputPlaceholder, "########");
            assert.equal(ticketsValue, "$" + ticketPrice.toString());
            assert.equal( walletValue,"$0.00");
            assert.equal( donationValue, "$0.00");
            assert.equal( subtotalValue ,"$" + ticketPrice.toString());
            assert.equal(taxesValue, "$0.00");
            assert.equal(feesValue, "$" + ticketFee.toFixed(2));
            assert.equal( shippingValue ,"$0.00");
            assert.equal(discountValue, "$0.00");
            let total = parseFloat(ticketPrice) + ticketFee;
            assert.equal(totalDueValue, "$ "+ (total).toString());
            
        }

        async assertAddedTaxAndFeesReflectsTheNewTotal(ticketOnePrice, uppedFeePercent, uppedFee$, addedTax, addedFee){
            await this.isOnDetailsPage();
            let taxValue = ticketOnePrice * (addedTax/100);
            let uppedFeePerc = ticketOnePrice * (uppedFeePercent/100);
            let totalFee = uppedFee$ + uppedFeePerc + addedFee;
            let displayedTax = await this.getElementTextFromAnArrayByIndex(VALUES, 4);
            let displayedFee = await this.getElementTextFromAnArrayByIndex(VALUES, 5);
            assert.equal(displayedTax,"$" + taxValue.toFixed(2))
            assert.equal(displayedFee,"$" + totalFee.toFixed(2))
            let total = parseFloat(ticketOnePrice) + totalFee + taxValue;
            let totalDue = await this.getElementText(TOTAL)
            assert.equal(totalDue,"$ " +  total.toFixed(2))
            
        }

        async assertWhenPriceChangedTaxesAndFeesAreRecalculatedCorrectly(price, uppedFee$, uppedFeePercent, addedFee, addedTax){
            let tax = parseFloat(price.substring(1)) * (addedTax/100);
            let fee = (parseFloat(price.substring(1)) * (uppedFeePercent/100) ) + addedFee + uppedFee$;

            let extTicket = await this.getElementTextFromAnArrayByIndex(VALUES, 0);
            let extSubtotal = await this.getElementTextFromAnArrayByIndex(VALUES, 3);
            let extTax = await this.getElementTextFromAnArrayByIndex(VALUES, 4);
            let extFee = await this.getElementTextFromAnArrayByIndex(VALUES, 5);
            let extTotal = await this.getElementText(TOTAL);
            let total = parseFloat(price.substring(1)) + tax + fee;

            assert.equal(extTicket,  price);
            assert.equal(extSubtotal, price);
            assert.equal(extTax,"$" +  tax.toFixed(2));
            assert.equal(extFee,"$" +  fee.toFixed(2));
            assert.equal(extTotal,"$ " + total.toFixed(2));


        }





        async assertTotalValueBeforeAndAfterPromotionWhenLimitsWereExceeded(ticketTwoPrice,  ticketThreePrice,ticketFourPrice, promoCodeThree){
            let extSub = await this.getElementTextFromAnArrayByIndex(VALUES, 5);
            let totalTax = 0.00;
            let ticketTwoTotal = 6 * ticketTwoPrice;
            let ticketTwoTax = (parseFloat(ticketTwoPrice) * (13.17/100));
            totalTax = totalTax + (ticketTwoTax * 6);
            let ticketFourTotal = 7 * ticketFourPrice;
            let ticketFourTax = (parseFloat(ticketFourPrice) * (13.17/100));
            totalTax = totalTax + (ticketFourTax * 7);
            let ticketThreeTotal = 10 * ticketThreePrice;
            let ticketThreeTax = (parseFloat(ticketThreePrice) * (13.17/100));
            totalTax = totalTax + (ticketThreeTax * 10)
            let totalFee = (23 * 0.02) + (23 * 0.5) + (parseFloat(extSub.substring(1)) * (2/100));

            let subtotal = parseFloat(ticketTwoTotal.toFixed(2)) + parseFloat(ticketFourTotal.toFixed(2)) + parseFloat(ticketThreeTotal.toFixed(2));
            let total = parseFloat(subtotal.toFixed(2)) + parseFloat(totalTax.toFixed(2)) + parseFloat(totalFee.toFixed(2));
            let extT3 = await this.getElementTextFromAnArrayByIndex(VALUES, 1);
            let extT4 = await this.getElementTextFromAnArrayByIndex(VALUES, 2);
            let extT2 = await this.getElementTextFromAnArrayByIndex(VALUES, 0);
            let extTax = await this.getElementTextFromAnArrayByIndex(VALUES, 6);
            let extFee = await this.getElementTextFromAnArrayByIndex(VALUES, 7);
            let extDiscount = await this.getElementTextFromAnArrayByIndex(VALUES, 9);
            let extTotal = await this.getElementText(TOTAL);
            assert.equal(extT2.substring(1), ticketTwoTotal.toFixed(2));
            assert.equal(extT3.substring(1), ticketThreeTotal.toFixed(2));
            assert.equal(extT4.substring(1), ticketFourTotal.toFixed(2));
            assert.equal(extSub.substring(1), subtotal.toFixed(2));
            assert.equal(extTax.substring(1), totalTax.toFixed(2));
            assert.equal(extFee.substring(1), totalFee.toFixed(2));
            assert.equal(extDiscount.substring(1), "0.00");
            assert.equal(extTotal.substring(2), total.toFixed(2));
            await this.addPromotionToTickets(promoCodeThree);

            let afterExtSub = await this.getElementTextFromAnArrayByIndex(VALUES, 5);
            assert.equal(extSub, afterExtSub);
            let discounted2 = parseFloat((ticketTwoPrice * 0.75).toFixed(2)) * 6;
            let discounted3 = parseFloat((ticketThreePrice * 0.75).toFixed(2)) * 10;
            let discounted4 = parseFloat((ticketFourPrice * 0.75).toFixed(2)) * 4;
            let discount = discounted2 + discounted3 + discounted4;
            extDiscount = await this.getElementTextFromAnArrayByIndex(VALUES, 9);
            assert.equal(extDiscount.substring(1), discount.toFixed(2));
            let newTicketTwoTax = parseFloat((ticketTwoPrice * 0.25).toFixed(2)) * (13.17/100);
            let newTicketThreeTax = parseFloat((ticketThreePrice * 0.25).toFixed(2)) * (13.17/100);
            let newTicketFourTax = parseFloat((ticketFourPrice * 0.25).toFixed(2)) * (13.17/100);
            ticketFourTax = (parseFloat(ticketFourPrice) * (13.17/100));
            let totalTaxTwo = newTicketTwoTax * 6;
            let totalTaxThree = newTicketThreeTax * 10;
            let totalTaxFour = (ticketFourTax * 3) + (newTicketFourTax * 4);
            totalTax = totalTaxTwo + totalTaxFour + totalTaxThree


            let newTicketTwoFee = parseFloat((ticketTwoPrice * 0.25).toFixed(2)) * (2/100);
            let newTicketThreeFee = parseFloat((ticketThreePrice * 0.25).toFixed(2)) * (2/100);
            let newTicketFourFee = parseFloat((ticketFourPrice * 0.25).toFixed(2)) * (2/100);
            let ticketFourFee = (parseFloat(ticketFourPrice) * (2/100));
            let totalFeeTwo = newTicketTwoFee * 6;
            let totalFeeThree = newTicketThreeFee * 10;
            let totalFeeFour = (ticketFourFee * 3) + (newTicketFourFee * 4);
            totalFee = totalFeeTwo + totalFeeThree + totalFeeFour + (23 * 0.02) + (23 * 0.5)


            extTax = await this.getElementTextFromAnArrayByIndex(VALUES, 6);
            extFee = await this.getElementTextFromAnArrayByIndex(VALUES, 7);
            //totalFee = (23 * 0.02) + (23 * 0.5) + (parseFloat(extSub.substring(1)) * (2/100)) * (parseFloat(extSub.substring(1))* (25/100));
            assert.equal(extTax.substring(1), totalTax.toFixed(2));
            assert.equal(extFee.substring(1), totalFee.toFixed(2));
            total = parseFloat(subtotal.toFixed(2)) + parseFloat(totalTax.toFixed(2)) + parseFloat(totalFee.toFixed(2)) - discount ;
            extTotal = await this.getElementText(TOTAL);
            assert.equal(extTotal.substring(2), total.toFixed(2));

        }

        async assertValuesInOrderDetailsComponentEqualsOnAddDetailsAndReviewPage(promoCodeThree){
            await this.isOnDetailsPage();
            await this.addPromotionToTickets(promoCodeThree);
            let rawTicketOne = await this.getElementTextFromAnArrayByIndex(TICKETS_NAMES,0);
            let rawTicketTwo = await this.getElementTextFromAnArrayByIndex(TICKETS_NAMES,1);
            let rawTicketThree = await this.getElementTextFromAnArrayByIndex(TICKETS_NAMES,2);
            let rawTicketFour = await this.getElementTextFromAnArrayByIndex(TICKETS_NAMES,3);
            let ticketOnePrice = await this.getElementTextFromAnArrayByIndex(VALUES, 0);
            let ticketTwoPrice = await this.getElementTextFromAnArrayByIndex(VALUES, 1);
            let ticketThreePrice = await this.getElementTextFromAnArrayByIndex(VALUES, 2);
            let ticketFourPrice = await this.getElementTextFromAnArrayByIndex(VALUES, 3);
            let donation = await this.getElementTextFromAnArrayByIndex(VALUES, 5);
            let subtotal = await this.getElementTextFromAnArrayByIndex(VALUES, 6);
            let taxes = await this.getElementTextFromAnArrayByIndex(VALUES, 7);
            let fees = await this.getElementTextFromAnArrayByIndex(VALUES, 8);
            let shipping = await this.getElementTextFromAnArrayByIndex(VALUES, 9);
            let discount = await this.getElementTextFromAnArrayByIndex(VALUES, 10);
            let total = await this.getElementText(TOTAL);
            await this.continueToPayment();
            let review = new BOReviewAndPay(this.driver);
            await review.isOnReviewPage();
            await review.assertElementsMatchOnOrderDetailsComponent(
                rawTicketOne,
                rawTicketTwo,
                rawTicketThree,
                rawTicketFour,
                ticketOnePrice,
                ticketTwoPrice,
                ticketThreePrice,
                ticketFourPrice,
                donation,
                subtotal,
                taxes,
                fees,
                shipping,
                discount,
                total,
                promoCodeThree);
         }

        async continueToPayment(){
            await this.isOnDetailsPage();
            await this.click(NEXT_BUTTON);
        }
        
        async applyExpiredPromoCode(promoCode){
            await this.timeout(500);
            await this.sentKeys(PROMO_INPUT,promoCode);
            await this.timeout(500);
            await this.click(APPLY_BUTTON);
            await this.timeout(500);
        }
        async addPromotionToTickets(promoCode){
            await this.timeout(500);
            await this.sentKeys(PROMO_INPUT,promoCode);
            await this.timeout(500);
            await this.click(APPLY_BUTTON);
            await this.timeout(500);
            await this.isDisplayed(APPLIED_PROMOTION_DIV,5000);
        }

        async assertReturnedValidationMessage(expected){
            let message = await this.getElementText(DISCOUNT_CODE_MESSAGE);
            assert.equal(message, expected)
        }
        
        async redErrorAlertIsReturned(message){
            let alerts = new Alerts(this.driver);
            await alerts.errorInfoMessageIsDisplayed(message)
        }

        async addWrongPromoCodeAssertErrorValidation(){
            await this.sentKeys(PROMO_INPUT,"FgRgR1");
            await this.click(APPLY_BUTTON);
            await this.isDisplayed(INVALID_DISCOUNT_CODE_ICON,5000);
            let message = await this.getElementText(DISCOUNT_CODE_MESSAGE);
            assert.equal(message, "Invalid Discount Code")
            await this.clearInputField(PROMO_INPUT);
            await this.timeout(500)

        }
        async checkTicketsNamesInOrderDetails(ticketOneName,ticketTwoName,ticketThreeName,ticketFourName){
            let rawTicketOne = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,0,0);
            let rawTicketTwo = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,1,0);
            let rawTicketThree = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,2,0);
            let rawTicketFour = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,3,0);
            assert.equal(ticketFourName, rawTicketOne.substring(0,8));
            assert.equal(ticketOneName, rawTicketTwo.substring(0,8));
            assert.equal(ticketTwoName, rawTicketThree.substring(0,8));
            assert.equal(ticketThreeName, rawTicketFour.substring(0,8));
        }

        async checkTicketPricesInOrderDetails() {
            let ticketOne = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT, 0, 1);
            let ticketTwo = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT, 1, 1);
            let ticketThree = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT, 2, 1);
            let ticketFour = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT, 3, 1);

            if(await this.environment() === "stage"){
                assert.equal("$0.02", ticketOne);
                assert.equal("$0.10", ticketTwo);
                assert.equal("$0.12", ticketThree);
                assert.equal("$0.04", ticketFour);
            }else {
                assert.equal("$0.40", ticketOne);
                assert.equal("$1.00", ticketTwo);
                assert.equal("$1.20", ticketThree);
                assert.equal("$0.75", ticketFour);

            }
        }

        async calculateTicketsSubTotal(){
            let subtotal = 0.00;
            for (let i = 0; i < 4; i++){
                let rawAmount = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,i,1);
                let amount = rawAmount.substring(1);
                subtotal = subtotal + parseFloat(amount);
            }
            let rawSubTotal = await this.getElementText(SUBTOTAL);
            let substring = rawSubTotal.substring(1);
            let extracted = parseFloat(substring);
            assert.equal(extracted,subtotal.toFixed(2))
        }

        async calculateTicketsTotal(){
            let items = await this.findAll(TICKETS_NAME_PARENT)
            let calculatedTotal = 0.00;
            for (let i = 0; i < items.length; i++){
                let rawAmount = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,i,1);
                let amount = rawAmount.substring(1);
                calculatedTotal = calculatedTotal + parseFloat(amount);
            }
            let rawSubTotal = await this.getElementText(SUBTOTAL);
            let subtotalSubstring = rawSubTotal.substring(1);
            let subtotal = parseFloat(subtotalSubstring);
            calculatedTotal = calculatedTotal - subtotal;
            let calcFixedTotal = calculatedTotal.toFixed(2);
            let rawTotal = await this.getElementText(TOTAL);
            let totalSubstring = rawTotal.substring(1);
            let total = parseFloat(totalSubstring);
            assert.equal(calcFixedTotal,total)
        }

        async confirmTotalTaxesAndFeesAreZeroedAndTheSubtotalRemainsTheSameAndDiscountEqualsSubtotal(promoCode){

            let beforeSubTotal = await this.getElementText(SUBTOTAL);
            let beforeTaxes = await this.getElementTextFromAnArrayByIndex(VALUES, 7);
            let beforeFees = await this.getElementTextFromAnArrayByIndex(VALUES, 8);
            let beforeDonation = await this.getElementTextFromAnArrayByIndex(VALUES, 5);
            let beforeDiscount = await this.getElementTextFromAnArrayByIndex(VALUES, 10);
            let calculatedTotal = await this.convertPriceStringToDouble(beforeTaxes) + await this.convertPriceStringToDouble(beforeFees) + await this.convertPriceStringToDouble(beforeSubTotal) + await this.convertPriceStringToDouble(beforeDonation)
            let beforeTotal = await this.getElementText(TOTAL);
            assert.equal( beforeDiscount,"$0.00" );
            assert.equal( beforeTotal,"$ " +calculatedTotal.toFixed(2) );
            await this.addPromotionToTickets(promoCode);
            await this.timeout(1000);
            let afterSubTotal = await this.getElementText(SUBTOTAL);
            let afterTaxes = await this.getElementTextFromAnArrayByIndex(VALUES, 7);
            let afterFees = await this.getElementTextFromAnArrayByIndex(VALUES, 8);
            let afterDonation = await this.getElementTextFromAnArrayByIndex(VALUES, 5);
            let afterDiscount = await this.getElementTextFromAnArrayByIndex(VALUES, 10);
            assert.equal( afterSubTotal,beforeSubTotal);
            assert.equal( afterTaxes, "$0.00");
            assert.equal( afterFees ,"$0.00");
            assert.equal(afterDonation, beforeDonation);
            assert.equal(afterDiscount, afterSubTotal);
            let afterTotal = await this.getElementText(TOTAL);
            assert.equal(afterTotal, "$ 0.00");

        }


    }
    module.exports = BOAddDetails;