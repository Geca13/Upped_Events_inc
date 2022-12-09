    const BasePage = require("../../BasePage");
    const assert = require('assert');
    require("dotenv").config();
    const CARDHOLDER_NAME_INPUT = { css: "input[formControlName=name_on_card]"  };
    const CARD_NUMBER_INPUT = { xpath: "//input[@type='tel']" };
    const SAVE_CARD_CHECKBOX = { xpath: "//input[@type='checkbox']" };
    const ZIP_CODE_INPUT = { css: "input[formControlName=cvc]" };
    const CVV_INPUT = { css: "input[formControlName=zip_code]" };
    const STREET_ADDRESS_INPUT = { css: "input[formControlName=billingAddress]" };
    const MONTH_SELECT = { css: "select[formControlName=month]" };
    const YEAR_SELECT = { css: "select[formControlName=year]" };
    const COUNTRY_SELECT = { css: "select[formControlName=country_id]" };
    const COUNTRY_OPTIONS = { xpath: "//select[@formControlName='country_id']//option" };
    const STATE_SELECT = { css: "select[formControlName=state]" };
    const INPUT_LABELS = { xpath: "//app-embed-ticketing-pay//label" }; //list



    class NewCardComponent extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async isAtNewCardTab(){
            await this.isDisplayed(CARDHOLDER_NAME_INPUT,5000)
        }
        
        async assertFieldsLabelsOnEmbed(){
            let name = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS,0);
            assert.equal(name, "Cardholder Name *");
            let card = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS,1);
            assert.equal(card, "Card Number *");
            let cvv = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS,2);
            assert.equal(cvv, "CVV *");
            let month = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS,3);
            assert.equal(month, "Expiration Month *");
            let year = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS,4);
            assert.equal(year, "Expiration Year *");
            let address = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS,5);
            assert.equal(address, "Street Address *");
            let country = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS,6);
            assert.equal(country, "Country *");
            let state = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS,7);
            assert.equal(state, "State *");
            let zip = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS,8);
            assert.equal(zip, "Zip Code *");
        }

        async assertFieldsAreDisplayed(){
            await this.isAtNewCardTab()
            await this.isDisplayed(CARD_NUMBER_INPUT, 5000);
            await this.isDisplayed(CVV_INPUT, 5000);
            await this.isDisplayed(MONTH_SELECT, 5000);
            await this.isDisplayed(YEAR_SELECT, 5000);
            await this.isDisplayed(STREET_ADDRESS_INPUT, 5000);
            await this.isDisplayed(COUNTRY_SELECT, 5000);
            await this.isDisplayed(STATE_SELECT, 5000);
            await this.isDisplayed(ZIP_CODE_INPUT, 5000);
        }

        async assertCountryOptionsAndSaveButtonNames(){
            let usa = await this.getElementTextFromAnArrayByIndex(COUNTRY_OPTIONS,0);
            assert.equal(usa, "United States");
            let canada = await this.getElementTextFromAnArrayByIndex(COUNTRY_OPTIONS,1);
            assert.equal(canada, "Canada");
            let macedonia = await this.getElementTextFromAnArrayByIndex(COUNTRY_OPTIONS,2);
            assert.equal(macedonia, "Macedonia");
        }

        async fillNewCardWithVisaData(firstName, lastName){
            await this.isAtNewCardTab();
            await this.sentKeys(CARDHOLDER_NAME_INPUT,firstName + ' ' + lastName);
            await this.sentKeys(CARD_NUMBER_INPUT,"4111111111111111");
            await this.sentKeys(CVV_INPUT,"900");
            await this.sentKeys(STREET_ADDRESS_INPUT,"100 Main Street");
            await this.sentKeys(MONTH_SELECT,"3");
            await this.sentKeys(YEAR_SELECT,"2025");
            await this.sentKeys(STATE_SELECT, "Pennsylvania");
            await this.sentKeys(ZIP_CODE_INPUT,"18940");
        }



    }

    module.exports = NewCardComponent;
