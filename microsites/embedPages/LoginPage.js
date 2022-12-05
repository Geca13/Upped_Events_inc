    const BasePage = require('../../BasePage');
    require("dotenv").config();
    const FACEBOOK_SIGN_IN_BUTTON = { className: "facebook-login"}
    const EMAIL_INPUT = { xpath: "//input[@placeholder='Email or Username']" };
    const PASSWORD_INPUT = { xpath: "//input[@placeholder='Enter Password']" };
    const LOGIN_BUTTON = { xpath: "//*[text()='Login Now']" }
    const AGREE_BUTTON = { xpath: "//*[text()='Agree']" }
    const REGISTER_NOW_LINK = { xpath: "//span[contains(@class, 'register')]" }
    const FACEBOOK_CONTENT = { id: 'content' }
    const FACEBOOK_EMAIL_INPUT = { id: 'email' }
    const FACEBOOK_PASSWORD_INPUT = { id: 'pass' }
    const FACEBOOK_LOGIN_BUTTON = { name: 'login' }
    const FORGET_PASSWORD = { xpath: "//*[text()='Forgot Password?']"}


    class LoginPage extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async isAtLoginPage(){
            await this.isDisplayed(FORGET_PASSWORD, 5000);
        }

        async loginWithEmailAndPassword(email, password, index){
            await this.sendKeysToElementReturnedFromAnArray(EMAIL_INPUT,index, email);
            await this.sendKeysToElementReturnedFromAnArray(PASSWORD_INPUT,index, password);
            await this.clickElementReturnedFromAnArray(LOGIN_BUTTON, index);
        }

        async clickRegisterLink(){
            await this.registerNowButtonIsDisplayed()
            await this.click(REGISTER_NOW_LINK);
            await this.timeout(500);
        }
        
        async registerNowButtonIsDisplayed(){
            await this.isDisplayed(REGISTER_NOW_LINK, 5000);
        }

        async loginWithVerifiedAccount(email, password){
            await this.isDisplayed(EMAIL_INPUT, 5000);
            await this.sentKeys(EMAIL_INPUT, email);
            await this.sentKeys(PASSWORD_INPUT, password);
            await this.timeout(500);
            await this.click(LOGIN_BUTTON);
        }

        async completeSwitchTo(){
            await this.switchToFacebookWindow(FACEBOOK_SIGN_IN_BUTTON);
        }

        async isAtFacebookPage(){
            await this.isDisplayed(FACEBOOK_CONTENT, 5000);
        }

        async completeSignInWithFacebook(){
            await this.loginWithFacebookEmailAndPassword(FACEBOOK_EMAIL_INPUT, "javageca@gmail.com",FACEBOOK_PASSWORD_INPUT,"V@rdar13Negotino",FACEBOOK_LOGIN_BUTTON);
            await this.timeout(3000)
        }

        async clickForgotPasswordLink(){
            await this.click(FORGET_PASSWORD);
        }





    }
    module.exports = LoginPage;