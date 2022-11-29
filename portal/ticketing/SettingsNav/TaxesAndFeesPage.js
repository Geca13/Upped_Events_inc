    const BasePage = require('../../../BasePage');
    const Alerts = require('../../portalComponents/Alerts')
    const INCLUDED_TAXES_RADIO = { xpath: "//*[text()=' Included, the price listed is the total price the attendee will pay ']"}
    const TAX_NAME_INPUT = { xpath: "//input[@name='name']" }
    const PERCENT_RATE_INPUTS = { name: 'percent' } //list
    const FEE_NAME_INPUT = { name: 'type' }
    const FEE_$_VALUE_INPUT = { name: 'price' }
    const ADD_BUTTONS = { xpath: "//*[text()='Add']"}//list
    const SAVE_TAXES_AND_FEES_BUTTON = { xpath: "//*[text()='Save']"}
    const TAXES_AND_FEES_VALUES = { tagName: 'tr'}
    const DELETE_TAX_OR_FEE = { className: "icon-del" }
    const GET_TAX_OR_FEE_VALUE = { xpath: "//tr//td[2]" }




    class TaxesAndFeesPage extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async openTaxesAndFeesDirectly(eventId){
            await this.visit("https://stage.portal.uppedevents.com/dashboard/event/" + eventId + "/ticket/settings?tab=taxes")
            await this.includeExcludeIsVisible();
        }

        async includeExcludeIsVisible(){
            await this.isDisplayed(INCLUDED_TAXES_RADIO, 5000);
        }

        async addOneTaxForTickets(){
            await this.setFirstTaxForTickets("Check Tax", "13.17");
        }

        async setFirstTaxForTickets(taxName, taxValue){
            await this.isDisplayed(TAX_NAME_INPUT, 5000);
            await this.sentKeys(TAX_NAME_INPUT, taxName);
            await this.sendKeysToElementReturnedFromAnArray(PERCENT_RATE_INPUTS,0,taxValue);
            await this.clickElementReturnedFromAnArray(ADD_BUTTONS,0)
        }

        async set$FeeForTickets(feeName, feeValue){
            await this.timeout(1500);
            await this.sentKeys(FEE_NAME_INPUT, feeName);
            await this.sentKeys(FEE_$_VALUE_INPUT, feeValue);
            await this.clickElementReturnedFromAnArray(ADD_BUTTONS,1)

        }
        async clickSaveTaxesAndFeesButton(){
            await this.click(SAVE_TAXES_AND_FEES_BUTTON);
            await this.timeout(500);
            let alerts = new Alerts(this.driver)
            await alerts.successAlertIsDisplayed("Saved successfully")

        }

        async get$FeeFromInputByIndex(index){
            return await this.getElementTextFromAnArrayByIndex(GET_TAX_OR_FEE_VALUE, index);
        }

        async getTaxOrFeeValueByIndex(parentIndex, childIndex){
            return await this.getChildTextByParentIndexAndChildIndex(TAXES_AND_FEES_VALUES, parentIndex, childIndex);
        }

        async getFloatNumberForTaxOrFee(parentIndex,childIndex){
            let fullValue = await this.getTaxOrFeeValueByIndex(parentIndex,childIndex);
            let cleanedValue = fullValue.substring(0, fullValue.length -1);
            return parseFloat(cleanedValue);
        }

        async clickRemoveTaxOrFeeButtonByIndex(index) {
            await this.isDisplayed(DELETE_TAX_OR_FEE, 5000);
            await this.timeout(500);
            await this.clickElementReturnedFromAnArray(DELETE_TAX_OR_FEE,index);
            await this.timeout(500);
        }


    }
    module.exports = TaxesAndFeesPage;
