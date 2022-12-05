const BasePage = require('../../BasePage')
const Alerts = require('../../portal/portalComponents/Alerts')
const PASSWORD_INPUT = { xpath: "//input[@formcontrolname='password']"}
const CONFIRM_PASSWORD_INPUT = { xpath: "//input[@formcontrolname='confirm_password']"}
const CHANGE_PASSWORD_BUTTON = { xpath: "//button[@type='submit']"}

class ResetPassword extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async isOnResetPasswordPage(){
        await this.isDisplayed(PASSWORD_INPUT, 5000);
    }

    async completeChangingPassword(customerPassword2){
        await this.sentKeys(PASSWORD_INPUT, customerPassword2)
        await this.sentKeys(CONFIRM_PASSWORD_INPUT, customerPassword2)
        await this.isDisplayed(CHANGE_PASSWORD_BUTTON, 5000);
        await this.click(CHANGE_PASSWORD_BUTTON);
    }
}

module.exports = ResetPassword;