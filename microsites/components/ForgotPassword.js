const BasePage = require('../../BasePage');
const Alerts = require('../../portal/portalComponents/Alerts');
const SUBMIT_BUTTON = { xpath: "//*[text()='Submit']"}
const FORGOT_EMAIL_INPUT = { xpath: "//input[@placeholder='Email']"}


class ForgotPassword extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async forgetPasswordScenarioWithInvalidAlerts(){
        let alert = new Alerts(this.driver);
        await this.isDisplayed(SUBMIT_BUTTON,5000);
        await this.timeout(500);
        await this.click(SUBMIT_BUTTON);
        await alert.infoMessageIsDisplayed("this email is not valid");
        await alert.alertIsNotDisplayed();
        await this.sentKeys(FORGOT_EMAIL_INPUT,'noEmail');
        await this.click(SUBMIT_BUTTON);
        await this.timeout(1000);
        await alert.infoMessageIsDisplayed("this email is not valid");
        await alert.alertIsNotDisplayed();
        await this.sentKeys(FORGOT_EMAIL_INPUT,'@parma.it');
        await this.click(SUBMIT_BUTTON);
        await alert.errorAlertIsDisplayed("Email not found")
        await alert.alertIsNotDisplayed();

    }

    async getSuccessResetEmailMessageWhenValidEmail(customerEmail){
        let alert = new Alerts(this.driver);
        await this.isDisplayed(SUBMIT_BUTTON,5000);
        await this.sentKeys(FORGOT_EMAIL_INPUT,customerEmail);
        await this.click(SUBMIT_BUTTON);
        await alert.correctInfoMessageIsDisplayed("Reset link sent on email address")
        await this.timeout(1500);
    }


}
module.exports = ForgotPassword;