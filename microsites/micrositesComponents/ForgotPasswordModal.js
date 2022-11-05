    const BasePage = require('../../BasePage');
    const assert = require('assert')
    const Validations = require('../../Validations&Alerts/MicrositesValidations');
    const LoginComponent = require('../micrositesComponents/LoginComponent');
    const FORGOT_PASSWORD_MODAL = { tagName:'app-forgot-password'}
    const FORGOT_PASSWORD_HEADER = { xpath: "//*[text()='Forgot password']"}
    const FORGOT_EMAIL_INPUT = { id: 'email'}
    const SUBMIT_BUTTON = { xpath: "//button[@type='submit']"}



    class ForgotPasswordModal extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async forgetPasswordScenarioWithValidations(){
            let login = new LoginComponent(this.driver);
            let validations = new Validations(this.driver);
            await login.waitPopupToBeLoaded();
            await login.clickForgotPasswordLink();
            await this.isDisplayed(SUBMIT_BUTTON,5000);
            await this.timeout(500);
            await this.click(SUBMIT_BUTTON);
            await validations.emailInputValidationIsDisplayed();
            let validation = await validations.getValidationErrorText();
            assert.equal(validation,'Email is required');
            await this.sentKeys(FORGOT_EMAIL_INPUT,'parma100');
            await this.click(SUBMIT_BUTTON);
            await this.timeout(1000);
            let invalid = await validations.getValidationErrorText();
            assert.equal(invalid,'Invalid email');
            await this.sentKeys(FORGOT_EMAIL_INPUT,'@parma.it');
            await this.click(SUBMIT_BUTTON);
            await this.timeout(1500);
        }



    }
    module.exports = ForgotPasswordModal;