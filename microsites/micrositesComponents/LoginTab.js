    const BasePage = require("../../BasePage");
    const assert = require("assert");
    const SECTIONS_TITLES = { xpath: "//app-event-ticketing-login//div[@class='title']" }; //list
    const GOOGLE_SIGN_IN_BUTTON = { className: 'google-login' };
    const FACEBOOK_SIGN_IN_BUTTON = { className: 'facebook-login' };
    const SECTION_SUBTITLES = { xpath:"//app-event-ticketing-login//*[@class='subtitle']" }; //list
    const ROWS = { className: 'row' }; //list
    const LOGIN_SECTIONS = { className: 'mt-3' };
    const LOGIN_BUTTON = { className: 'login-btn' };
    const FORGOT_PASS_BUTTON = { className: 'forgot-btn' };
    const SIGN_UP_BUTTON = { className: 'signup-btn' };
    const EMAIL_INPUT = { css: "input[formControlName=email]"};
    const PASSWORD_INPUT = { xpath: "//input[@type='password']"};
    const PLEASE_LOGIN_TITLE = { xpath: "//*[text()='Please Login to Continue']"};


    class LoginTab extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async isAtLoginTab(){
            await this.isDisplayed(EMAIL_INPUT, 5000);
        }

        async loginWithEmailAndPasswordOnLoginTab(customerEmail,customerPassword){
            await this.isAtLoginTab();
            await this.sentKeys(EMAIL_INPUT, customerEmail);
            await this.sentKeys(PASSWORD_INPUT, customerPassword);
            await this.timeout(500);
            await this.click(LOGIN_BUTTON);
            await this.timeout(500);
        }

        async assertSectionTitlesAndSubtitlesNames(){
            let loginToContinueTitle = await this.getElementTextFromAnArrayByIndex(SECTIONS_TITLES,0);
            assert.equal(loginToContinueTitle, "Please Login to Continue");
            let loginEmailTitle = await this.getElementTextFromAnArrayByIndex(SECTIONS_TITLES,1);
            assert.equal(loginEmailTitle, "Login with Email");
            let noAccountTitle = await this.getElementTextFromAnArrayByIndex(SECTIONS_TITLES,2);
            assert.equal(noAccountTitle, "Don't have an account?");
            let loginEmailSubtitle = await this.getElementTextFromAnArrayByIndex(SECTION_SUBTITLES,0);
            assert.equal(loginEmailSubtitle, "Login with email if you don't have a Google or Facebook account.");
            let noAccountSubtitle = await this.getElementTextFromAnArrayByIndex(SECTION_SUBTITLES,1);
            assert.equal(noAccountSubtitle, "It only takes about a minute!");
        }

        async assertButtonsNamesAndInputPlaceholders(){
            let googleButton = await this.getElementText(GOOGLE_SIGN_IN_BUTTON);
            assert.equal(googleButton, "Sign In with Google");
            let facebookButton = await this.getElementText(FACEBOOK_SIGN_IN_BUTTON);
            assert.equal(facebookButton, "Sign In with Facebook");
            let login = await this.getElementText(LOGIN_BUTTON);
            assert.equal(login, "Login");
            let forgotPassword = await this.getElementText(FORGOT_PASS_BUTTON);
            assert.equal(forgotPassword, "Forgot Password?");
            let signUp = await this.getElementText(SIGN_UP_BUTTON);
            assert.equal(signUp, "Sign Up");
            let emailInput = await this.getPlaceholderTextFromInputByIndex(EMAIL_INPUT, 0);
            assert.equal(emailInput, "Enter Email");
            let passInput = await this.getPlaceholderTextFromInputByIndex(PASSWORD_INPUT, 0);
            assert.equal(passInput, "Enter Password");
        }

        async assertButtonsFontAndBackgroundColors(){
            let googleButtonFont = await this.getFontColorFromAnArray(GOOGLE_SIGN_IN_BUTTON, 0);
            assert.equal(googleButtonFont, 'rgba(140, 140, 140, 1)');
            let googleButtonBackground = await this.getBackgroundFromAnArray(GOOGLE_SIGN_IN_BUTTON, 0);
            assert.equal(googleButtonBackground, 'rgba(255, 255, 255, 1)');
            let facebookButtonFont = await this.getFontColorFromAnArray(FACEBOOK_SIGN_IN_BUTTON, 0);
            assert.equal(facebookButtonFont, 'rgba(255, 255, 255, 1)');
            let facebookButtonBackground = await this.getBackgroundFromAnArray(FACEBOOK_SIGN_IN_BUTTON, 0);
            assert.equal(facebookButtonBackground, 'rgba(69, 97, 157, 1)');
            let loginButtonFont = await this.getFontColorFromAnArray(LOGIN_BUTTON, 0);
            assert.equal(loginButtonFont, 'rgba(255, 255, 255, 1)');
            let loginButtonBackground = await this.getBackgroundFromAnArray(LOGIN_BUTTON, 0);
            assert.equal(loginButtonBackground, 'rgba(0, 0, 0, 1)');
            let forgotButtonFont = await this.getFontColorFromAnArray(FORGOT_PASS_BUTTON, 0);
            assert.equal(forgotButtonFont, 'rgba(255, 255, 255, 1)');
            let forgotButtonBackground = await this.getBackgroundFromAnArray(FORGOT_PASS_BUTTON, 0);
            assert.equal(forgotButtonBackground, 'rgba(0, 0, 0, 1)');
            let signUpButtonFont = await this.getFontColorFromAnArray(SIGN_UP_BUTTON, 0);
            assert.equal(signUpButtonFont, 'rgba(255, 255, 255, 1)');
            let signUpButtonBackground = await this.getBackgroundFromAnArray(SIGN_UP_BUTTON, 0);
            assert.equal(signUpButtonBackground, 'rgba(0, 0, 0, 1)');

        }

    }

    module.exports = LoginTab;