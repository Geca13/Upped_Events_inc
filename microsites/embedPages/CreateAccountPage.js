    const BasePage = require("../../BasePage");
    const assert = require('assert')
    const FIRST_NAME_INPUT = { id: 'firstName'}
    const LAST_NAME_INPUT = { id: 'lastName'}
    const EMAIL_INPUT = { id: 'email'}
    const CONFIRM_EMAIL_INPUT = { id: 'confirmEmail'}
    const GENDER_SELECT = { id: 'gender'}
    const GENDER_MALE_OPTION = { xpath: "//option[@value='Male']"}
    const DOB_INPUT = { id: 'dob'}
    const PASSWORD_INPUT = { id: 'password'}
    const VERIFY_PASSWORD_INPUT = { name:'confirmPassword'}
    const AGREE_TERMS_CHECKBOX = { xpath: "//input[@formcontrolname='terms_agree_status']" }
    const CREATE_ACCOUNT_BUTTON = { xpath: "//*[text()=' Create Account '] | //*[text()=' Sign Up ']"}
    const SIGN_UP_BUTTON = { xpath: "//*[text()=' Sign Up ']"}
    const SIGN_IN_LINK = { xpath: "//*[text()='Login'] | //*[text()='Sign In']" }
    const EMAIL_OPTION_BUTTON = { xpath: "//div[contains(@class, 'email-btn')]"}



    class CreateAccountPage extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async isOnCreateAccountEmbedPage(){
            await this.isDisplayed(EMAIL_OPTION_BUTTON, 5000);
            await this.timeout(500);
        }

        async signInLinkIsDisplayed(){
            await this.isDisplayed(SIGN_IN_LINK, 5000)
        }
        
        async clickSignInButton(){
            let signIn = await this.returnElementsCount(SIGN_IN_LINK)
            if( signIn > 1 ){
                await this.clickElementReturnedFromAnArray(SIGN_IN_LINK, 1)
            }else {
                await this.click(SIGN_IN_LINK);
            }

        }

        async openEmailSignUpFormOnEmbed(){
            await this.isOnCreateAccountEmbedPage();
            await this.click(EMAIL_OPTION_BUTTON);
            await this.isDisplayed(FIRST_NAME_INPUT, 5000)
        }

        async openEmailSignUpForm(){
            await this.isOnCreateAccountEmbedPage();
            await this.click(EMAIL_OPTION_BUTTON);
            let email = await this.returnElementsCount(EMAIL_OPTION_BUTTON);
                 if(email > 0){
                     await this.click(EMAIL_OPTION_BUTTON);
                 }
             await this.isDisplayed(FIRST_NAME_INPUT, 5000)
        }

        async assertCreateAccountButtonIsDisabledUntilFieldsArePopulated(index){
            await this.openEmailSignUpForm();
            let createButton = await this.find(CREATE_ACCOUNT_BUTTON);
            assert.equal(await createButton.isEnabled(), false);
            await this.sendKeysToElementReturnedFromAnArray(FIRST_NAME_INPUT,index , "firstName");
            assert.equal(await createButton.isEnabled(), false);
            await this.sendKeysToElementReturnedFromAnArray(LAST_NAME_INPUT,index , "lastName");
            assert.equal(await createButton.isEnabled(), false);
            await this.sendKeysToElementReturnedFromAnArray(EMAIL_INPUT,index , "email@email.email");
            assert.equal(await createButton.isEnabled(), false);
            await this.sendKeysToElementReturnedFromAnArray(CONFIRM_EMAIL_INPUT,index , "email@email.email");
            assert.equal(await createButton.isEnabled(), false);
            await this.clickElementReturnedFromAnArray(GENDER_SELECT, index);
            assert.equal(await createButton.isEnabled(), false);
            await this.timeout(500)
            await this.clickElementReturnedFromAnArray(GENDER_MALE_OPTION, index);
            assert.equal(await createButton.isEnabled(), false);
            await this.sendKeysToElementReturnedFromAnArray(DOB_INPUT,index , '11112000');
            assert.equal(await createButton.isEnabled(), false);
            await this.sendKeysToElementReturnedFromAnArray(PASSWORD_INPUT,index , "P@ssword123");
            assert.equal(await createButton.isEnabled(), false);
            await this.sendKeysToElementReturnedFromAnArray(VERIFY_PASSWORD_INPUT,index , "P@ssword123");
            assert.equal(await createButton.isEnabled(), false);
            await this.moveToElement(CREATE_ACCOUNT_BUTTON);
            await this.clickElementReturnedFromAnArray(AGREE_TERMS_CHECKBOX, index);
            await this.timeout(500)
            assert.equal(await createButton.isEnabled(), true);
            await this.timeout(1500);

        }

        async createAccountOnEmbed(firstName,lastName,email,password, index){
            await this.openEmailSignUpForm();
            await this.sendKeysToElementReturnedFromAnArray(FIRST_NAME_INPUT, index, firstName);
            await this.sendKeysToElementReturnedFromAnArray(LAST_NAME_INPUT, index, lastName);
            await this.sendKeysToElementReturnedFromAnArray(EMAIL_INPUT, index, email);
            await this.sendKeysToElementReturnedFromAnArray(CONFIRM_EMAIL_INPUT, index, email);
            await this.clickElementReturnedFromAnArray(GENDER_SELECT, index);
            await this.timeout(500)
            await this.clickElementReturnedFromAnArray(GENDER_MALE_OPTION, index);
            await this.sendKeysToElementReturnedFromAnArray(DOB_INPUT, index, '11112000');
            await this.sendKeysToElementReturnedFromAnArray(PASSWORD_INPUT, index, password);
            await this.sendKeysToElementReturnedFromAnArray(VERIFY_PASSWORD_INPUT, index, password);
            await this.timeout(1500);
            await this.click(AGREE_TERMS_CHECKBOX);
            await this.click(CREATE_ACCOUNT_BUTTON);
            await this.timeout(1500);
            
        }
    }
    module.exports = CreateAccountPage;