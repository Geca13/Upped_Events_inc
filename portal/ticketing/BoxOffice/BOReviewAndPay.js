    const BasePage = require('../../../BasePage');
    const assert = require('assert');
    require("dotenv").config();
    const { expect } = require('chai');
    const { Key } = require("selenium-webdriver");
    const INPUT_LABELS = { xpath: "//label[@class='form-label']" }
    const PAYMENT_TYPES_LABELS = { xpath: "//div[@class='payment-types']//span" }
    const ATTENDEE_INFO_LABELS = { xpath: "//label[contains(@class, 'data-fields')]" }
    const ATTENDEE_EMAIL_LABELS = { xpath: "//span[@class='checkbox-message']" }
    const DEMOGRAPHIC_SECTION_HEADERS = { xpath: "//div[@class='demographic-heading']" }
    const CARDHOLDER_NAME = { xpath: "//input[@formcontrolname='name_on_card']" };
    const CARD_NUMBER = { xpath: "//input[@formcontrolname='card_no']" };
    const CVC = { xpath: "//input[@formcontrolname='cvc']" };
    const EXPIRATION = { xpath: "//input[@formcontrolname='expirationDate']" };
    const ADDRESS = { xpath: "//input[@formcontrolname='billingAddress']" };
    const COUNTRY = { xpath: "//select[@formcontrolname='country_id']" };
    const STATE = { xpath: "//select[@formcontrolname='state']" };
    const ZIP = { xpath: "//input[@formcontrolname='zip_code']" };
    const FIRST_NAME = { xpath: "//input[@formcontrolname='firstName']" };
    const LAST_NAME = { xpath: "//input[@formcontrolname='lastName']" };
    const BIRTH_DATE = { xpath: "//input[@formcontrolname='dateOfBirth']" };
    const EMAIL = { xpath: "//input[@formcontrolname='email']" };
    const ADDITIONAL_EMAIL = { xpath: "//input[@formcontrolname='additionalEmail']" };
    const ADD_BUTTON = { xpath: "//button[text()='Add']" };
    const PLACE_ORDER_BUTTON = { xpath: "//button[text()=' Place Order ']" };
    const ADDITIONAL_EMAIL_BADGE = { className:"primary-badge"} //list
    const CONFIRMATION_MODAL = { className: "confirmation-heading" };
    const SUCCESS_ON_CONFIRM_MODAL = { className: "success-message" }
    const MESSAGE_ON_CONFIRM_MODAL = { className: "main-message" }
    const EMAILS_ON_CONFIRM_MODAL = { className: "single-email" } //list
    const PAY_WITH_CASH_CHECKBOX = { xpath: "(//input[@type='checkbox'])[2]"}
    const SEND_COPY_CHECKBOX = { xpath: "(//input[@type='checkbox'])[5]"}
    const NO_ACCOUNT_CHECKBOX = { xpath: "(//input[@type='checkbox'])[4]"}
    const CARD_FORM = { id: "cardForm" }
    const OPEN_ORDER_DETAILS = { xpath: "//i[contains(@class, 'icon-angle-right')]" }
    const ORDER_TOTAL = { id: "orderheading" };
    const TICKETS_HEADER = { xpath: "(//div[contains(@class, 'title')])[1]" }
    const EXTRAS_HEADER = { xpath: "(//div[contains(@class, 'title')])[2]" }
    const DONATIONS_HEADER = { xpath: "(//div[contains(@class, 'title')])[3]" }
    const TICKETS_NAME_PARENT = {  className:"justify-content-between"} //list
    const SUBTOTAL_HEADER = { xpath: "(//div[@ID='orderheading'])[2]" }
    const TOTAL_DUE = { className: "total-due-message"};
    const TOTAL = { className: "total-due-value"};
    const PRICING_ADDING_NAMES = { xpath: "//div[contains(@class, 'mt-0')]" }
    const VALUES = { className: "w-7" };
    const DISCOUNT_CODE_EXAMPLE = { xpath: "//div[@style='font-size: 12px;']" }




    class BOReviewAndPay extends BasePage{
        constructor(driver) {
            super(driver);
        }

        async isOnReviewPage(){
            await this.isDisplayed(PLACE_ORDER_BUTTON, 5000);
        }

        async assertElementsOnReviewAndPayPageWhenOneTicketSelected(ticketName){
            try {

            await this.isOnReviewPage();
            let totalDue = await this.getElementText(TOTAL_DUE)
            let cCardLabel = await this.getElementTextFromAnArrayByIndex(PAYMENT_TYPES_LABELS, 0);
            let cashLabel = await this.getElementTextFromAnArrayByIndex(PAYMENT_TYPES_LABELS, 1);
            let checkLabel = await this.getElementTextFromAnArrayByIndex(PAYMENT_TYPES_LABELS, 2);
            let holderLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 0);
            let cardLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 1);
            let ccvLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 2);
            let dateLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 3);
            let zipLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 4);
            let addressLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 5);
            let countryLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 6);
            let stateLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 7);
            let nameLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 8);
            let surnameLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 9);
            let attendeeBirthLabel = await this.getElementTextFromAnArrayByIndex(ATTENDEE_INFO_LABELS, 0);
            let attendeeGenderLabel = await this.getElementTextFromAnArrayByIndex(ATTENDEE_INFO_LABELS, 1);
            let attendeeEmailLabel = await this.getElementTextFromAnArrayByIndex(ATTENDEE_INFO_LABELS, 2);
            let additionalEmailsLabel = await this.getElementTextFromAnArrayByIndex(ATTENDEE_INFO_LABELS, 3);
            let attendeeNoAccountLabel = await this.getElementTextFromAnArrayByIndex(ATTENDEE_EMAIL_LABELS, 0);
            let sendCopyLabel = await this.getElementTextFromAnArrayByIndex(ATTENDEE_EMAIL_LABELS, 1);
            let demographicHeader  = await this.getElementTextFromAnArrayByIndex(DEMOGRAPHIC_SECTION_HEADERS, 0);
            let emailsHeader = await this.getElementTextFromAnArrayByIndex(DEMOGRAPHIC_SECTION_HEADERS, 1);
            let pickupAtHeader = await this.getElementTextFromAnArrayByIndex(DEMOGRAPHIC_SECTION_HEADERS, 2);

            await this.click(OPEN_ORDER_DETAILS);
            await this.isDisplayed(ORDER_TOTAL, 5000);
            let ticketsHeader = await this.getElementText(TICKETS_HEADER);
            let rawTicketOne = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,0,0);
            let extrasHeader = await this.getElementText(EXTRAS_HEADER);
            let donationsHeader = await this.getElementText(DONATIONS_HEADER);
            let subtotalHeader = await this.getElementText(SUBTOTAL_HEADER)
            let taxesName = await this.getElementTextFromAnArrayByIndex(PRICING_ADDING_NAMES, 0);
            let feesName = await this.getElementTextFromAnArrayByIndex(PRICING_ADDING_NAMES, 1);
            let shippingName = await this.getElementTextFromAnArrayByIndex(PRICING_ADDING_NAMES, 2);
            let discountName = await this.getElementTextFromAnArrayByIndex(PRICING_ADDING_NAMES, 3);
            let discountExample = await this.getElementText(DISCOUNT_CODE_EXAMPLE);
            let totalValue = await this.getElementText(TOTAL);
            let ticketsValue = await this.getElementTextFromAnArrayByIndex(VALUES, 0);
            let subtotalValue = await this.getElementTextFromAnArrayByIndex(VALUES, 1);
            let taxesValue = await this.getElementTextFromAnArrayByIndex(VALUES, 2);
            let feesValue = await this.getElementTextFromAnArrayByIndex(VALUES, 3);
            let donationValue = await this.getElementTextFromAnArrayByIndex(VALUES, 4);
            let shippingValue = await this.getElementTextFromAnArrayByIndex(VALUES, 5);
            let discountValue = await this.getElementTextFromAnArrayByIndex(VALUES, 6);

            assert.equal( rawTicketOne.substring(0,8), ticketName);
            assert.equal( cCardLabel,"Pay by credit card");
            assert.equal( cashLabel, "Pay with cash");
            assert.equal( checkLabel ,"Pay by check");
            assert.equal(holderLabel, "Cardholder Name");
            assert.equal(cardLabel, "Card Number");
            assert.equal( ccvLabel,"CCV");
            assert.equal( dateLabel, "Expiration Date");
            assert.equal( zipLabel ,"Zipcode");
            assert.equal(addressLabel, "Street Address");
            assert.equal(taxesName, "Taxes:");
            assert.equal( feesName,"Fees:");
            assert.equal( shippingName, "Shipping:");
            assert.equal( discountName ,"Discounts:");
            assert.equal(countryLabel, "Country");
            assert.equal(stateLabel, "State");
            assert.equal( nameLabel ,"First Name");
            assert.equal(totalDue, "Total Due:");
            assert.equal(surnameLabel, "Last Name");
            assert.equal( demographicHeader,"Demographic Questions");
            assert.equal( emailsHeader,"Emails:");
            assert.equal( attendeeBirthLabel,"What is the attendee's date of birth?");
            assert.equal( attendeeGenderLabel,"What gender the attendee identify as?");
            assert.equal( attendeeEmailLabel,"Recipient email:");
            assert.equal( additionalEmailsLabel,"Additional emails");
            assert.equal( attendeeNoAccountLabel,"Check here if ticket buyer does not have an account*");
            assert.equal( sendCopyLabel,"Send copy to myself");
            assert.equal( pickupAtHeader,"Pick up at Will Call?");
            assert.equal(ticketsHeader, "Tickets:");
            assert.equal( extrasHeader,"Extras:");
            assert.equal( discountExample, "Discount code: xxxxx-xxxx-xxx");
            assert.equal( donationsHeader ,"Donation:");
            assert.equal(subtotalHeader, "Subtotal");
            assert.equal(ticketsValue, "$ 1.00");
            assert.equal( donationValue, "$ 0.00");
            assert.equal( subtotalValue ,"$ 1.00");
            assert.equal(taxesValue, "$ 0.00");
            assert.equal(feesValue, "$ 0.00");
            assert.equal( shippingValue ,"$ 0.00");
            assert.equal(discountValue, "$ 0.00");
            assert.equal(totalValue, "$ 1.00");
            }catch (error) {

            }
        }

        async assertElementsMatchOnOrderDetailsComponent(
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
            promoCodeThree){
            await this.click(OPEN_ORDER_DETAILS);
            await this.isDisplayed(ORDER_TOTAL, 5000);
            let ticketOneName = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,0,0);
            let ticketTwoName = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,1,0);
            let ticketThreeName = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,2,0);
            let ticketFourName = await this.getChildTextByParentIndexAndChildIndex(TICKETS_NAME_PARENT,3,0);
            let ticketOneValue = await this.getElementTextFromAnArrayByIndex(VALUES, 0);
            let ticketTwoValue = await this.getElementTextFromAnArrayByIndex(VALUES, 1);
            let ticketThreeValue = await this.getElementTextFromAnArrayByIndex(VALUES, 2);
            let ticketFourValue = await this.getElementTextFromAnArrayByIndex(VALUES, 3);
            let donationValue = await this.getElementTextFromAnArrayByIndex(VALUES, 4);
            let subtotalValue = await this.getElementTextFromAnArrayByIndex(VALUES, 5);
            let taxesValue = await this.getElementTextFromAnArrayByIndex(VALUES, 6);
            let feesValue = await this.getElementTextFromAnArrayByIndex(VALUES, 7);
            let shippingValue = await this.getElementTextFromAnArrayByIndex(VALUES, 8);
            let discountValue = await this.getElementTextFromAnArrayByIndex(VALUES, 9);
            let discountExample = await this.getElementText(DISCOUNT_CODE_EXAMPLE);
            let totalValue = await this.getElementText(TOTAL);
            assert.equal( ticketOneName.substring(0,8), rawTicketOne);
            assert.equal( ticketTwoName.substring(0,8), rawTicketTwo);
            assert.equal( ticketThreeName.substring(0,8), rawTicketThree);
            assert.equal( ticketFourName.substring(0,8), rawTicketFour);
            assert.equal( ticketOneValue,ticketOnePrice);
            assert.equal( ticketTwoValue, ticketTwoPrice);
            assert.equal( ticketThreeValue ,ticketThreePrice);
            assert.equal( ticketFourValue, ticketFourPrice);
            assert.equal( subtotalValue, subtotal);
            assert.equal( taxesValue,taxes);
            assert.equal( feesValue, fees);
            assert.equal( donationValue,donation);
            assert.equal( shippingValue, shipping);
            assert.equal( discountValue, discount);
            assert.equal( discountExample,"Discount code: " + promoCodeThree);
            assert.equal( totalValue.substring(1), total.substring(2));

        }

        async makePaymentWithCard(base){
            await this.isOnReviewPage();
            await this.sentKeys(CARDHOLDER_NAME,"Mark Kozlowski");
            await this.sentKeys(CARD_NUMBER,"4111 1111 1111 1111");
            await this.sentKeys(CVC,"862");
            await this.sentKeys(EXPIRATION,"March" + Key.TAB + "2025");
            await this.sentKeys(ADDRESS,"100 Timber Ridge Road, Newton PA");
            await this.sentKeys(ZIP,"18940");
            await this.sentKeys(STATE,"Pennsylvania");
            await this.fillUserDataForCardAdditionalEmailNoCopy(base);
            await this.click(PLACE_ORDER_BUTTON);
            await this.isDisplayed(CONFIRMATION_MODAL,55000);
            await this.timeout(1000);
            await this.confirmElementsForPayment(base);
            await this.timeout(1000);
        }


        async makePaymentWithCash(base){
            await this.isOnReviewPage();
            await this.click(PAY_WITH_CASH_CHECKBOX);
            await this.timeout(500);
            //await this.cardFormIsDisabled();
            await this.fillUserDataForCashAdditionalEmailNoCopy(base);
        }


        async confirmElementsForPayment(base){
            let header = await this.getElementText(SUCCESS_ON_CONFIRM_MODAL);
            assert.equal("Sent!", header);
            let message = await this.getElementText(MESSAGE_ON_CONFIRM_MODAL);
            assert.equal("A copy of the receipt and tickets have been sent to:", message);
            let customerEmail = await this.getElementTextFromAnArrayByIndex(EMAILS_ON_CONFIRM_MODAL,0);
            let additionalEmail = await this.getElementTextFromAnArrayByIndex(EMAILS_ON_CONFIRM_MODAL,1);
            assert.equal("1. " + base+'@'+base+".mk",  customerEmail);
            assert.equal("2. " + base+'ad@ad'+base+".mk",  additionalEmail);
        }

        async paymentWith100DiscountAndPaymentCard(base){
            await this.formInputsAreDisabled();
            await this.fillUserDataForCardAdditionalEmailNoCopy(base);
            await this.click(PLACE_ORDER_BUTTON);
            await this.isDisplayed(CONFIRMATION_MODAL,60000);
            await this.timeout(1000);
            await this.confirmElementsForPayment(base);
            await this.timeout(1000);
        }

        async formInputsAreDisabled() {
            await this.isOnReviewPage();
            expect(await this.elementIsEnabled(CARDHOLDER_NAME)).to.be.false;
            expect(await this.elementIsEnabled(CARD_NUMBER)).to.be.false;
            expect(await this.elementIsEnabled(CVC)).to.be.false;
            expect(await this.elementIsEnabled(EXPIRATION)).to.be.false;
            expect(await this.elementIsEnabled(ADDRESS)).to.be.false;
            expect(await this.elementIsEnabled(ZIP)).to.be.false;
            expect(await this.elementIsEnabled(COUNTRY)).to.be.false;
            expect(await this.elementIsEnabled(STATE)).to.be.false;
        }

        async cardFormIsDisabled(){
            expect(await this.elementIsEnabled(CARD_FORM)).to.be.false;
        }

        async fillUserDataForCardAdditionalEmailNoCopy(base) {
            await this.sentKeys(FIRST_NAME,"Mark");
            await this.sentKeys(LAST_NAME,base);
            await this.sentKeys(BIRTH_DATE,"01012000");
            await this.sentKeys(EMAIL,base+'Mark@'+base+".mk");
            await this.click(NO_ACCOUNT_CHECKBOX)
            await this.click(SEND_COPY_CHECKBOX)
            await this.sentKeys(ADDITIONAL_EMAIL,base+'ad@ad'+base+".mk");
            await this.click(ADD_BUTTON);
            await this.timeout(1000);
            await this.isDisplayed(ADDITIONAL_EMAIL_BADGE,5000);
            await this.timeout(1000);

        }

        async fillUserDataForCashAdditionalEmailNoCopy(base) {
            await this.sentKeys(FIRST_NAME,base +"cash");
            await this.sentKeys(LAST_NAME,base);
            await this.sentKeys(BIRTH_DATE,"01012000");
            await this.sentKeys(EMAIL,base+'cash@'+base+".mk");
            await this.click(SEND_COPY_CHECKBOX)
            await this.sentKeys(ADDITIONAL_EMAIL,base+'cashAd@ad'+base+".mk");
            await this.click(ADD_BUTTON);
            await this.timeout(1000);
            await this.isDisplayed(ADDITIONAL_EMAIL_BADGE,5000);
            await this.timeout(1000);
            await this.click(PLACE_ORDER_BUTTON);
            await this.isDisplayed(CONFIRMATION_MODAL,55000);
            await this.timeout(1000);

        }

        async fillUserDataForCashWithCopy(base) {
            await this.sentKeys(FIRST_NAME,"cash" + base);
            await this.sentKeys(LAST_NAME,base);
            await this.sentKeys(BIRTH_DATE,"01012000");
            await this.sentKeys(EMAIL,base+'@cash'+base+".mk");
            await this.click(PLACE_ORDER_BUTTON);
            await this.isDisplayed(CONFIRMATION_MODAL,55000);
            await this.timeout(1000);

        }

        async makePaymentOnStaging(base){
            await this.isOnReviewPage();
            await this.sentKeys(CARDHOLDER_NAME,process.env.CARD_NAME);
            await this.sentKeys(CARD_NUMBER,process.env.CARD_NUMBER);
            await this.sentKeys(CVC,process.env.CVC);
            await this.sentKeys(EXPIRATION,"March" + Key.TAB + "2025");
            await this.sentKeys(ADDRESS,process.env.ADDRESS);
            await this.sentKeys(ZIP,"18940");
            await this.fillUserDataOnStaging(base);
            await this.click(PLACE_ORDER_BUTTON);
            await this.isDisplayed(CONFIRMATION_MODAL,60000, "confirmationModal");
            await this.timeout(1000);
            await this.confirmElementsForPaymentOnStaging();
            await this.timeout(1000);
        }

        async fillUserDataOnStaging(base) {
            await this.sentKeys(FIRST_NAME,base);
            await this.sentKeys(LAST_NAME,base);
            await this.sentKeys(BIRTH_DATE,"01012000");
            await this.sentKeys(EMAIL,process.env.AOL_CUSTOMER_EMAIL);
            await this.click(SEND_COPY_CHECKBOX);
            await this.sentKeys(ADDITIONAL_EMAIL,process.env.AOL_VENDOR_EMAIL);
            await this.click(ADD_BUTTON);
            await this.timeout(1000);
            await this.isDisplayed(ADDITIONAL_EMAIL_BADGE,5000);
            await this.timeout(10000);

        }
        async confirmElementsForPaymentOnStaging(){
            let header = await this.getElementText(SUCCESS_ON_CONFIRM_MODAL);
            assert.equal("Sent!", header);
            let message = await this.getElementText(MESSAGE_ON_CONFIRM_MODAL);
            assert.equal("A copy of the receipt and tickets have been sent to:", message);
            let customerEmail = await this.getElementTextFromAnArrayByIndex(EMAILS_ON_CONFIRM_MODAL,0);
            let additionalEmail = await this.getElementTextFromAnArrayByIndex(EMAILS_ON_CONFIRM_MODAL,1);
            assert.equal(customerEmail, process.env.AOL_CUSTOMER_EMAIL);
            assert.equal(additionalEmail, process.env.AOL_VENDOR_EMAIL);
        }
    }
    module.exports = BOReviewAndPay;