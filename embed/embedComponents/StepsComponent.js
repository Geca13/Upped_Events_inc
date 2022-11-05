    const BasePage = require("../../BasePage");
    const assert = require('assert')
    const STEP_NAME = { className: "step-name"}
    const STEP_CONTAINER = { xpath: "//div[contains(@class, 'stepper-item')]"}
    const STEP_COMPLETED = { xpath: "//img[contains(@class, 'step_completed')]"}
    const STEP_COUNTER = { xpath: "//div[contains(@class, 'step-counter')]"}


    class StepsComponent extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async assertStepNames(){
            let tickets = await this.getElementTextFromAnArrayByIndex(STEP_NAME, 0);
            let extras = await this.getElementTextFromAnArrayByIndex(STEP_NAME, 1);
            let payment = await this.getElementTextFromAnArrayByIndex(STEP_NAME, 2);
            let pay = await this.getElementTextFromAnArrayByIndex(STEP_NAME, 3);
            let done = await this.getElementTextFromAnArrayByIndex(STEP_NAME, 4);
            assert.equal(tickets, "Select Tickets")
            assert.equal(extras, "Add Extras")
            assert.equal(payment, "Payment Details")
            assert.equal(pay, "Review and Pay")
            assert.equal(done, "All Done!")
        }

        async assertStepNameByIndex(text,index){
            let step = await this.getElementTextFromAnArrayByIndex(STEP_NAME, index);
            assert.equal(step, text)
        }

        async numberOfCompletedStepsAndCurrentStepName(stepName,completed){
            let steps = await this.returnElementsCount(STEP_COMPLETED);
            assert.equal(steps,completed)
            await this.assertStepNameByIndex(stepName, completed);
        }

        async checkIfFillinClassIsAppliedToStep(index, bool){
           let check = await this.checkIfClassIsApplied(STEP_COUNTER,index, "fillin");
           assert.equal(check, bool);
        }

        async checkIfActiveClassIsAppliedToStep(index, bool){
            let check = await this.checkIfClassIsApplied(STEP_CONTAINER,index, "active");
            assert.equal(check, bool);
        }

        async checkThatCheckmarkImageIsDisplayedWhenStepIsCompeted(){
            let completedSteps = await this.findAll(STEP_COMPLETED);
            for(let i = 0; i < completedSteps.length; i++){
                let src = await this.returnImgSrcAttributeByIndex(STEP_COMPLETED, i);
                assert.equal(src, "https://events.dev.uppedevents.com/assets/images/Path.svg");
            }
        }

    }
    module.exports = StepsComponent;
