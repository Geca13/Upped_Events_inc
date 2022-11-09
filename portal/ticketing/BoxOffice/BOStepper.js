    const BasePage = require('../../../BasePage');
    const assert = require('assert')
    const NAV_STEPS = { xpath: "//ul[@id='stepper']//li" }

    class BOStepper extends BasePage{
        constructor(driver) {
            super(driver);
        }

        async assertNavStepsCountAndStepsNames(){
            let steps = await this.returnElementsCount(NAV_STEPS);
            assert.equal(steps, 4);
            let tickets = await this.getElementTextFromAnArrayByIndex(NAV_STEPS, 0);
            let extras = await this.getElementTextFromAnArrayByIndex(NAV_STEPS, 1);
            let details = await this.getElementTextFromAnArrayByIndex(NAV_STEPS, 2);
            let review = await this.getElementTextFromAnArrayByIndex(NAV_STEPS, 3);
            assert.equal(tickets, "Select Tickets");
            assert.equal(extras, "Add Extras");
            assert.equal(details, "Add Details");
            assert.equal(review, "Review and Pay");
        }

        async clickNavElementByIndex(index){
            await this.clickElementReturnedFromAnArray(NAV_STEPS, index);
        }
    }

    module.exports = BOStepper;