    const BasePage = require('../../BasePage');
    const Alerts = require('../../Validations&Alerts/Alerts');
    const assert = require("assert");
    const MODAL_HEADER = { xpath: "//h3[contains(@class, 'title')]"}
    const EMAIL_INPUT = { id: 'email' }
    const PASSWORD_INPUT = { id: 'password' }
    const SUBMIT_BUTTON = { className: 'main-btn' }
    const SIGN_IN_BUTTONS = { xpath: "//button//span[contains(@class, 'social-text')]"}
    const FORGOT_PASSWORD_LINK = { xpath: "//div[contains(@class, 'forgotpassword')]"}
    const CREATE_ACCOUNT_LINK = { xpath: "//a[contains(@class, 'cursor-pointer')]"}
    const INPUTS = { tagName: "input" }


    class LoginComponent extends BasePage{
          constructor(driver) {
              super(driver);
        }

        async authenticate(username, password) {
          await this.driver.findElement(EMAIL_INPUT).sendKeys(username)
          await this.timeout(500);
          await this.driver.findElement(PASSWORD_INPUT).sendKeys(password)
          await this.timeout(500);
          await this.driver.findElement(SUBMIT_BUTTON).click();
          let alerts = new Alerts(this.driver)
          await alerts.successAlertIsDisplayed("Successfully logged in");
          await this.timeout(5000);
        }
        async loginWithNewPassword(email, password){
              await this.sentKeys(EMAIL_INPUT,email);
              await this.sentKeys(PASSWORD_INPUT, password);
              await this.timeout(500);
              await this.click(SUBMIT_BUTTON);
        }

        async waitPopupToBeLoaded(){
             await this.isDisplayed(SUBMIT_BUTTON, 5000)
        }

        async clickForgotPasswordLink(){
              await this.click(FORGOT_PASSWORD_LINK);
        }

        async getNewlyOpenedTab(originalWindow){
           await this.switchToNewlyOpenedWindowOrTab(originalWindow);
        }

        async loginAfterVerifyingAccount(password){
            await this.sentKeys(PASSWORD_INPUT, password);
            await this.click(SUBMIT_BUTTON)
            await this.timeout(5000);
        }

        async verifyElementsOnSignInModal(){
            await this.isDisplayed(PASSWORD_INPUT,5000);
            await this.timeout(500);
            let header = await this.getElementText(MODAL_HEADER);
            let google = await this.getElementTextFromAnArrayByIndex(SIGN_IN_BUTTONS,0);
            let facebook = await this.getElementTextFromAnArrayByIndex(SIGN_IN_BUTTONS,1);
            let form = await this.getElementTextFromAnArrayByIndex(SIGN_IN_BUTTONS,2);
            let create = await this.getElementText(CREATE_ACCOUNT_LINK);
            let forgot = await this.getElementText(FORGOT_PASSWORD_LINK);
            let inputs = await this.returnElementsCount(INPUTS);
            let emailPl = await this.getPlaceholderTextFromInputByIndex(INPUTS,0);
            let passPl = await this.getPlaceholderTextFromInputByIndex(INPUTS,1);
            assert.equal(header,"Sign In");
            assert.equal(forgot,"Forgot Password?");
            assert.equal(google,"Sign In with Google");
            assert.equal(facebook,"Sign In with Facebook");
            assert.equal(form,"Sign In");
            assert.equal(create,"Create an account");
            assert.equal(inputs,3);
            assert.equal(emailPl,"Email");
            assert.equal(passPl,"Password");
        }

        async verifyValidationsAndAlerts(){
            await this.clickElementReturnedFromAnArray(SIGN_IN_BUTTONS,2);
            let validations = new Validations(this.driver);
            await validations.passwordAndEmailValidationsAreShownOnSignInModal();
            await this.sentKeys(EMAIL_INPUT, 'gggg');
            await this.clickElementReturnedFromAnArray(SIGN_IN_BUTTONS,2);
            await validations.invalidEmailShownOnSignInModal();
            await this.sentKeys(EMAIL_INPUT, '@gggg');
            await this.sentKeys(PASSWORD_INPUT, 'Pe');
            await this.clickElementReturnedFromAnArray(SIGN_IN_BUTTONS,2);
            let alerts = new Alerts(this.driver);
            await alerts.errorAlertIsDisplayed("Please enter valid Email ID");
            await this.sentKeys(EMAIL_INPUT, '.com');
            await this.clickElementReturnedFromAnArray(SIGN_IN_BUTTONS,2);
            await this.timeout(3000)
            await alerts.errorAlertIsDisplayed("We don't have customer/user with email in our database , please sign up first");
            await this.clearInputField(EMAIL_INPUT);
            await this.clearInputField(PASSWORD_INPUT);
            await this.sentKeys(EMAIL_INPUT, 'parma15@parma.it');
            await this.sentKeys(PASSWORD_INPUT, 'Pero123');
            await this.clickElementReturnedFromAnArray(SIGN_IN_BUTTONS,2);
            await alerts.errorAlertIsDisplayed("Email/Password not match");
            await this.timeout(2000)
            await this.sentKeys(PASSWORD_INPUT, '4');
            await this.clickElementReturnedFromAnArray(SIGN_IN_BUTTONS,2);
            await alerts.successAlertIsDisplayed("Successfully logged in");
            await this.timeout(1000)
            }
}

    module.exports = LoginComponent