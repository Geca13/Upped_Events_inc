    const BasePage = require('../../BasePage');
    require("dotenv").config();
    const FACEBOOK_SIGN_IN_BUTTON = { className: "facebook-login"}
    const EMAIL_INPUT = { xpath: "//input[@formcontrolname='email']" };
    const PASSWORD_INPUT = { xpath: "//input[@formcontrolname='password']" };
    const LOGIN_BUTTON = { xpath: "//*[text()='Login Now']" }
    const AGREE_BUTTON = { xpath: "//*[text()='Agree']" }
    const REGISTER_NOW_LINK = { xpath: "//span[contains(@class, 'register')]" }
    const FACEBOOK_CONTENT = { id: 'content' }
    const FACEBOOK_EMAIL_INPUT = { id: 'email' }
    const FACEBOOK_PASSWORD_INPUT = { id: 'pass' }
    const FACEBOOK_LOGIN_BUTTON = { name: 'login' }


    class LoginPage extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async isAtLoginPage(){
            await this.isDisplayed(FACEBOOK_SIGN_IN_BUTTON, 5000);
        }

        async loginWithEmailAndPassword(email, password){
            await this.sentKeys(EMAIL_INPUT, email);
            await this.sentKeys(PASSWORD_INPUT, password);
            await this.click(LOGIN_BUTTON);
        }

        async clickRegisterLink(){
            await this.click(REGISTER_NOW_LINK);
            await this.timeout(500);
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
            await this.loginWithFacebookEmailAndPassword(FACEBOOK_EMAIL_INPUT, "javageca@gmail.com",FACEBOOK_PASSWORD_INPUT,"Negotino13Vardar",FACEBOOK_LOGIN_BUTTON);
            await this.timeout(3000)
        }





    }
    module.exports = LoginPage;