    const BasePage = require('../../BasePage');
    const {By} = require("selenium-webdriver");
    const assert = require('assert');
    const DateTimePickerModal = require("./DateTimePickerModal");
    const PROMOTION_TITLE_INPUT = { name: "name" };
    const PROMOTION_DESCRIPTION_INPUT = { name: "description" };
    const SELECT_TICKET_DROPDOWN = { id: "tickets" };
    const SELECTED_TICKETS = { xpath: "//multi-dropdown[@id='tickets']//button//span"}
    const PROMOTION_STATUS_DROPDOWN = { name: "status" };
    const PROMOTION_STATUS_AND_DISTRIBUTION_SELECTS = { xpath: "//button[@aria-haspopup='listbox']" }; //LIST
    const SELECTED_STATUS = { xpath: "//select-picker[@name='status']//button//div[@class='filter-option-inner-inner']"}
    const ENABLED_STATUS_OPTION = { xpath: "//*[text()='Enabled']"}
    const DISABLED_STATUS_OPTION = { xpath: "//*[text()='Disabled']"}
    const PROMO_LIMIT_QUANTITY_INPUT = { name: "quantity" };
    const PROMO_$_VALUE_INPUT = { name: "price" };
    const PROMO_PERCENT_VALUE_INPUT = { name: "percentage" };
    const ACCOUNT_LIMIT_QUANTITY_CHECKBOX = { xpath: "//div[contains(@class , 'inline-price-checkbox')]//label" };
    const PROMO_CODE_NAME_INPUT = { name: "promoCode" };
    const PROMO_PER_ACCOUNT_LIMIT_INPUT = { name: "accountUseLimit" };
    const SELECT_LIMIT_TICKETS_DROPDOWN = { id: "accountTickets" };
    const SELECT_LIMIT_TICKETS_DROPDOWN_OPTIONS = { xpath: "//multi-dropdown[@id='accountTickets']//label[@class='pl-4']" };
    const SELECTED_LIMIT_TICKETS = { xpath: "//multi-dropdown[@id='accountTickets']//button//span"}
    const GENERATE_MULTIPLE_CODES_BUTTON = { xpath: "//*[text()='Generate Multiple Unique Codes']"}
    const GENERATE_SINGLE_CODE_BUTTON = { xpath: "//*[text()='Generate Single Code']"}
    const QUANTITY_OF_CODES_INPUT = { name: "quantityOfCodes" };
    const SAVE_PROMOTION_BUTTON = { xpath: "//*[text()=' Save ']"};
    const CANCEL_PROMOTION_BUTTON = { xpath: "//*[text()='Cancel']"};
    const PROMOTION_START_DATE_INPUT = { name: "startDate" };
    const PROMOTION_END_DATE_INPUT = { name: "endDate" };
    const TITLE_INPUT_LABEL = { xpath: "//input[@name='name']/following-sibling::label"}
    const DESCRIPTION_TEXTAREA_LABEL = { xpath: "//textarea[@name='description']/following-sibling::label"}
    const SELECT_TICKETS_DROPDOWN_LABEL = { xpath: "//label[@for='tickets']"}
    const CHECKBOXES_LABELS = { xpath: "//span[contains(@class, 'colr-dark')]"} //list of three
    const DESCRIPTION_QUESTIONS = { xpath: "//div[contains(@class, 'colr-dark')]//p"} //list of FOUR
    const STATUS_LABEL = { xpath: "//select-picker[@name='status']/following-sibling::label"}
    const PRICE_LABEL = { xpath: "//input[@name='price']/following-sibling::label"}
    const GENERATED_QTY_CODES_LABEL = { xpath: "//input[@name='quantityOfCodes']/following-sibling::label"}
    const CODE_USE_LIMIT_LABEL = { xpath: "//input[@name='useLimit']/following-sibling::label"}
    const PERCENTAGE_LABEL = { xpath: "//input[@name='percentage']/following-sibling::label"}
    const PROMO_CODE_LABEL = { xpath: "//input[@name='promoCode']/following-sibling::label"}
    const DISTRIBUTION_TYPE_LABEL = { xpath: "//select-picker[@name='codeDistributionType']/following-sibling::label"}
    const START_DATE_LABEL = { xpath: "//input[@name='startDate']/following-sibling::label"}
    const END_DATE_LABEL = { xpath: "//input[@name='endDate']/following-sibling::label"}
    const CURRENT_PRICE = { tagName: "del"}
    const DISCOUNTED_PRICE = { xpath: "//del/..//following-sibling::div"}


    class CreatePromotionModal extends BasePage {
        constructor(driver) {
            super(driver);
        }
        async addPromotionModalIsDisplayed(){
            await this.isDisplayed(PROMOTION_TITLE_INPUT,10000)
        }

        async startDateInputIsDisplayed(){
            await this.isDisplayed(PROMOTION_START_DATE_INPUT,10000)
        }

        async ticketsAreDisplayedInTheList(ticketName){
            await this.isDisplayed(By.xpath("//*[text()='"+ticketName+"']"),5000);
        }

        async clickTicketInTheList(ticketName){
            let ticket = await this.driver.findElement(By.xpath("//label/span[text()='"+ticketName+"']"));
           await ticket.click();
        }

        async clickTicketInTheLimitList(ticketName){
            let ticket = await this.driver.findElement(By.xpath("//multi-dropdown[@id='accountTickets']//label/span[text()='"+ticketName+"']"));
            await ticket.click();
        }

        async promotionDescriptionIsDisplayed(){
            await this.isDisplayed(PROMOTION_DESCRIPTION_INPUT,5000);
        }

        async assertElementsOnNewPromotionsScreen(ticketOneName){
            await this.promotionDescriptionIsDisplayed();
            await this.timeout(1000)
            let titleLabel = await this.getElementText(TITLE_INPUT_LABEL);
            assert.equal(titleLabel, "PROMOTION TITLE");
            let descriptionLabel = await this.getElementText(DESCRIPTION_TEXTAREA_LABEL);
            assert.equal(descriptionLabel, "PROMOTIONS DESCRIPTION / NOTES");
            let ticketsLabel = await this.getElementText(SELECT_TICKETS_DROPDOWN_LABEL);
            assert.equal(ticketsLabel, "SELECT TICKET TYPE");
            let limitMembersLabel = await this.getElementTextFromAnArrayByIndex(CHECKBOXES_LABELS,0);
            assert.equal(limitMembersLabel, "Limit offer to members only");
            await this.click(SELECT_TICKET_DROPDOWN);
            await this.ticketsAreDisplayedInTheList(ticketOneName);
            await this.clickTicketInTheList(ticketOneName);
            await this.click(PROMOTION_DESCRIPTION_INPUT);
            await this.timeout(1000)
            let statusLabel = await this.getElementText(STATUS_LABEL);
            assert.equal(statusLabel, "STATUS");
            await this.click(PROMOTION_STATUS_DROPDOWN);
            await this.enabledStatusIsDisplayed();
            await this.isDisplayed(DISABLED_STATUS_OPTION,5000);
            await this.click(PROMOTION_STATUS_DROPDOWN);
            await this.scrollUpOrDown(200);
            let discountQuantity = await this.getElementTextFromAnArrayByIndex(CHECKBOXES_LABELS,1);
            assert.equal(discountQuantity, "Discount on purchase quantity");
            let priceLabel = await this.getElementText(PRICE_LABEL);
            assert.equal(priceLabel, "PRICE");
            let percentageLabel = await this.getElementText(PERCENTAGE_LABEL);
            assert.equal(percentageLabel, "PERCENTAGE");
            let promoCodeLabel = await this.getElementText(PROMO_CODE_LABEL);
            assert.equal(promoCodeLabel, "PROMO CODE");
            let limitByAccount = await this.getElementTextFromAnArrayByIndex(CHECKBOXES_LABELS,2);
            assert.equal(limitByAccount, "Limit how many times this promo code can be used by a single account.");
            await this.scrollUpOrDown(200)
            await this.driver.executeScript("document.getElementsByClassName('btn-sticky')[0].style.visibility='hidden'");
            await this.isDisplayed(GENERATE_MULTIPLE_CODES_BUTTON,5000);
            await this.click(GENERATE_MULTIPLE_CODES_BUTTON);
            await this.isDisplayed(QUANTITY_OF_CODES_INPUT,5000);
            await this.isDisplayed(GENERATE_SINGLE_CODE_BUTTON,5000);
            await this.isDisplayed(DESCRIPTION_QUESTIONS,5000);
            await this.timeout(500);
            let uniqueCodesQuestion = await this.getElementTextFromAnArrayByIndex(DESCRIPTION_QUESTIONS,0);
            assert.equal(uniqueCodesQuestion, "How many unique codes would you like generated?");
            let qtyOfCodes = await this.getElementText(GENERATED_QTY_CODES_LABEL);
            assert.equal(qtyOfCodes, "QUANTITY OF CODES");
            let codeLimitQuestion = await this.getElementTextFromAnArrayByIndex(DESCRIPTION_QUESTIONS,1);
            assert.equal(codeLimitQuestion, "How many tickets should each unique code holder be able to purchase with a single code?");
            let codeLimitLabel = await this.getElementText(CODE_USE_LIMIT_LABEL);
            assert.equal(codeLimitLabel, "CODE USE LIMIT");
            await this.sentKeys(QUANTITY_OF_CODES_INPUT,"5");
            await this.promotionDescriptionIsDisplayed();
            await this.timeout(1000);
            let distributionQuestion = await this.getElementTextFromAnArrayByIndex(DESCRIPTION_QUESTIONS,2);
            assert.equal(distributionQuestion, "How should these codes be distributed?");
            let distributionLabel = await this.getElementText(DISTRIBUTION_TYPE_LABEL);
            assert.equal(distributionLabel, "SELECT DISTRIBUTION TYPE");
            let durationQuestion = await this.getElementTextFromAnArrayByIndex(DESCRIPTION_QUESTIONS,3);
            assert.equal(durationQuestion, "When should the discount be active?");
            let startDateLabel = await this.getElementText(START_DATE_LABEL);
            assert.equal(startDateLabel, "START DAY & TIME");
            let endDateLabel = await this.getElementText(END_DATE_LABEL);
            assert.equal(endDateLabel, "END DAY & TIME");

        }

        async enabledStatusIsDisplayed() {
            await this.isDisplayed(ENABLED_STATUS_OPTION, 5000);
        }

        async createPromotionForOneTicketWith$Value(ticketName, promoName, promoCode){
            await this.sentKeys(PROMOTION_TITLE_INPUT, promoName);
            await this.sentKeys(PROMOTION_DESCRIPTION_INPUT, promoName + ' description');
            await this.click(SELECT_TICKET_DROPDOWN);
            await this.ticketsAreDisplayedInTheList(ticketName);
            await this.clickTicketInTheList(ticketName);
            await this.click(PROMOTION_DESCRIPTION_INPUT);
            await this.clickElementReturnedFromAnArray(PROMOTION_STATUS_AND_DISTRIBUTION_SELECTS,0);
            await this.enabledStatusIsDisplayed();
            await this.click(ENABLED_STATUS_OPTION);
            await this.sentKeys(PROMO_LIMIT_QUANTITY_INPUT,"5");
            await this.sentKeys(PROMO_$_VALUE_INPUT,"0.1");
            await this.sentKeys(PROMO_CODE_NAME_INPUT,promoCode);
            await this.driver.executeScript("document.getElementsByClassName('btn-sticky')[0].style.visibility='hidden'");
            //await this.driver.executeScript("document.body.style.zoom = '80%'")
            await this.startDateInputIsDisplayed(PROMOTION_START_DATE_INPUT, 5000);
            await this.timeout(1500)
            await this.click(PROMOTION_START_DATE_INPUT)
            let startDatePicker = new DateTimePickerModal(this.driver);
            await startDatePicker.datePickerIsVisible();
            await startDatePicker.enterTimeNow();
            await this.timeout(500)
            await startDatePicker.clickSetButton();
            await this.timeout(500)
            await this.driver.executeScript("document.getElementsByClassName('btn-sticky')[0].style.visibility='visible'");
            await this.savePromotionButtonIsDisplayed();
            await this.timeout(500)
            let promotion = [];
            let name = await this.getEnteredTextInTheInput(PROMOTION_TITLE_INPUT)
            let description = await this.getEnteredTextInTheInput(PROMOTION_DESCRIPTION_INPUT);
            let ticket = await this.getElementText(SELECTED_TICKETS);
            let status = await this.getElementText(SELECTED_STATUS);
            let origStart = await this.getEnteredTextInTheInput(PROMOTION_START_DATE_INPUT)
            let origEnd = await this.getEnteredTextInTheInput(PROMOTION_END_DATE_INPUT);
            let quantity = await this.getEnteredTextInTheInput(PROMO_LIMIT_QUANTITY_INPUT);
            let origPrice = await this.getElementText(CURRENT_PRICE);
            let adjustment = await this.returnNumberWith$Sign(PROMO_$_VALUE_INPUT);
            let newPrice = await this.getElementText(DISCOUNTED_PRICE);
            let start = await this.getOnlyFullDateFromDateTimeInput(PROMOTION_START_DATE_INPUT);
            let end =await this.getOnlyFullDateFromDateTimeInput(PROMOTION_END_DATE_INPUT);
            promotion.push(name);
            promotion.push(description);
            promotion.push(ticket);
            promotion.push(quantity);
            promotion.push(origPrice);
            promotion.push(adjustment);
            promotion.push(newPrice);
            promotion.push(start);
            promotion.push(end);
            promotion.push(origStart);
            promotion.push(origEnd);
            promotion.push(status);
            await this.click(SAVE_PROMOTION_BUTTON);
            await this.timeout(1500);
            return promotion;

        }

        async assertDataFromCreateEqualsUpdateData(promotion){
            await this.addPromotionModalIsDisplayed();
            let updateName = await this.getEnteredTextInTheInput(PROMOTION_TITLE_INPUT)
            let updateDescription = await this.getEnteredTextInTheInput(PROMOTION_DESCRIPTION_INPUT);
            let updateTicket = await this.getElementText(SELECTED_TICKETS);
            let updateStatus = await this.getElementText(SELECTED_STATUS);
            let updateOrigStart = await this.getEnteredTextInTheInput(PROMOTION_START_DATE_INPUT)
            let updateOrigEnd = await this.getEnteredTextInTheInput(PROMOTION_END_DATE_INPUT);
            let updateQuantity = await this.getEnteredTextInTheInput(PROMO_LIMIT_QUANTITY_INPUT);
            let updateOrigPrice = await this.getElementText(CURRENT_PRICE);
            let updateAdjustment = await this.returnNumberWith$Sign(PROMO_$_VALUE_INPUT);
            let updateDiscounted = await this.getElementText(DISCOUNTED_PRICE);
            assert.equal(updateName, promotion[0]);
            assert.equal(updateDescription, promotion[1]);
            assert.equal(updateTicket, promotion[2]);
            assert.equal(updateQuantity, promotion[3]);
            assert.equal(updateOrigPrice, promotion[4]);
            assert.equal(updateAdjustment, promotion[5]);
            assert.equal(updateDiscounted, promotion[6]);
            assert.equal(updateStatus, promotion[11]);
            assert.equal(updateOrigStart, promotion[9]);
            assert.equal(updateOrigEnd, promotion[10]);
            await this.click(CANCEL_PROMOTION_BUTTON);
            await this.timeout(1000);
        }
        
        async newPromotionForThreeWithLimitOnTwo(ticketTwoName, ticketThreeName, ticketFourName, promoName, promoCode){
            await this.sentKeys(PROMOTION_TITLE_INPUT, promoName);
            await this.sentKeys(PROMOTION_DESCRIPTION_INPUT, promoName + ' description');
            await this.click(SELECT_TICKET_DROPDOWN);
            await this.ticketsAreDisplayedInTheList(ticketTwoName);
            await this.clickTicketInTheList(ticketTwoName);
            await this.clickTicketInTheList(ticketThreeName);
            await this.clickTicketInTheList(ticketFourName);
            await this.click(SELECT_TICKET_DROPDOWN);
            await this.click(PROMOTION_STATUS_DROPDOWN);
            await this.enabledStatusIsDisplayed();
            await this.click(ENABLED_STATUS_OPTION);
            await this.sentKeys(PROMO_LIMIT_QUANTITY_INPUT,"20");
            await this.sentKeys(PROMO_PERCENT_VALUE_INPUT,"75");
            await this.sentKeys(PROMO_CODE_NAME_INPUT,promoCode);
            await this.moveToElement(PROMOTION_START_DATE_INPUT);
            await this.driver.executeScript("document.getElementsByClassName('btn-sticky')[0].style.visibility='hidden'");
            await this.startDateInputIsDisplayed();
            await this.timeout(1000)
            await this.clickElementReturnedFromAnArray(ACCOUNT_LIMIT_QUANTITY_CHECKBOX,1);
            await this.selectLimitTicketDropdownIsDisplayed();
            await this.sentKeys(PROMO_PER_ACCOUNT_LIMIT_INPUT, "10");
            await this.click(SELECT_LIMIT_TICKETS_DROPDOWN);
            await this.selectLimitTicketDropdownOptionsAreDisplayed();
            await this.clickTicketInTheLimitList(ticketTwoName);
            await this.clickTicketInTheLimitList(ticketFourName);
            await this.timeout(1000);
            await this.click(PROMOTION_START_DATE_INPUT)
            let startDatePicker = new DateTimePickerModal(this.driver);
            await startDatePicker.datePickerIsVisible();
            await startDatePicker.enterTimeNow();
            //await startDatePicker.clickPMButton()
            await this.timeout(1000)
            await startDatePicker.clickSetButton();
            await this.timeout(1000)
            await this.driver.executeScript("document.getElementsByClassName('btn-sticky')[0].style.visibility='visible'");
            await this.savePromotionButtonIsDisplayed();
            await this.timeout(1000)
            await this.click(SAVE_PROMOTION_BUTTON);
            await this.timeout(1500);

        }

        async selectLimitTicketDropdownIsDisplayed() {
            await this.isDisplayed(SELECT_LIMIT_TICKETS_DROPDOWN, 5000);
        }

        async selectLimitTicketDropdownOptionsAreDisplayed() {
            await this.isDisplayed(SELECT_LIMIT_TICKETS_DROPDOWN_OPTIONS, 5000);
        }

        async assertDataOnUpdateModalForPromotionWithThreeTicketsAndLimit(ticketTwoName, ticketThreeName, ticketFourName, promoThreeName, promoCodeThree){
            await this.addPromotionModalIsDisplayed();
            let name = await this.getEnteredTextInTheInput(PROMOTION_TITLE_INPUT)
            let description = await this.getEnteredTextInTheInput(PROMOTION_DESCRIPTION_INPUT);
            let tickets = await this.getElementText(SELECTED_TICKETS);
            let code = await this.getEnteredTextInTheInput(PROMO_CODE_NAME_INPUT);
            let status = await this.getElementText(SELECTED_STATUS);
            let quantity = await this.getEnteredTextInTheInput(PROMO_LIMIT_QUANTITY_INPUT);
            let discount = await this.getEnteredTextInTheInput(PROMO_PERCENT_VALUE_INPUT);
            let limitTickets = await this.getElementText(SELECTED_LIMIT_TICKETS);
            let useLimitPerAccount = await this.getEnteredTextInTheInput(PROMO_PER_ACCOUNT_LIMIT_INPUT);
            assert.equal(name, promoThreeName);
            assert.equal(description, promoThreeName + " description");
            assert.equal(tickets, ticketTwoName + ", " + ticketThreeName + ", " + ticketFourName);
            assert.equal(code, promoCodeThree);
            assert.equal(status, "Enabled");
            assert.equal(quantity,"20");
            assert.equal(discount, "75");
            assert.equal(useLimitPerAccount, "10");
            assert.equal(limitTickets, ticketTwoName + ", " + ticketFourName);

        }
        
        async savePromotionButtonIsDisplayed() {
            await this.isDisplayed(SAVE_PROMOTION_BUTTON, 5000, "savePromotionBtn");
        }
        

    }
    module.exports = CreatePromotionModal;