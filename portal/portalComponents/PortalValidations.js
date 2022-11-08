    const BasePage = require('../../BasePage')
    const assert = require('assert')
    const INPUT_VALIDATIONS = { xpath: "//div[contains(@class , 'invalid-feedback')]" }


    class PortalValidations extends BasePage {

        constructor(driver){
            super(driver);

        }

        async getInputValidationMessage(index,message){
            await this.timeout(1000);
            let displayed = await this.getElementTextFromAnArrayByIndex(INPUT_VALIDATIONS, index);
            assert.equal(displayed, message);

        }
}
    module.exports = PortalValidations;