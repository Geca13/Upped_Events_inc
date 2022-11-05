    const BasePage = require("../../BasePage");
    const assert = require('assert')
    const FIRST_NAME_INPUT = { id: 'firstName'}
    const LAST_NAME_INPUT = { id: 'lastName'}
    const EMAIL_INPUT = { id: 'email'}
    const GENDER_SELECT = { id: 'gender'}
    const GENDER_MALE_OPTION = { xpath: "//option[@value='Male']"}
    const DOB_INPUT = { id: 'dob'}
    const PASSWORD_INPUT = { id: 'password'}
    const VERIFY_PASSWORD_INPUT = { name:'confirmPassword'}
    const AGREE_TERMS_CHECKBOX = { id: "termsCheckbox" }
    const CREATE_ACCOUNT_BUTTON = { xpath: "//*[text()=' Create Account ']"}



    class CreateAccountPage extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async isOnCreateAccountEmbedPage(){
            await this.isDisplayed(FIRST_NAME_INPUT, 5000);
            await this.timeout(500);
        }

        async assertCreateAccountButtonIsDisabledUntilFieldsArePopulated(){
            await this.isOnCreateAccountEmbedPage();
            let createButton = await this.find(CREATE_ACCOUNT_BUTTON);
            assert.equal(await createButton.isEnabled(), false);
            await this.sentKeys(FIRST_NAME_INPUT, "firstName");
            assert.equal(await createButton.isEnabled(), false);
            await this.sentKeys(LAST_NAME_INPUT, "lastName");
            assert.equal(await createButton.isEnabled(), false);
            await this.sentKeys(EMAIL_INPUT, "email@email.email");
            assert.equal(await createButton.isEnabled(), false);
            await this.click(GENDER_SELECT);
            assert.equal(await createButton.isEnabled(), false);
            await this.timeout(500)
            await this.click(GENDER_MALE_OPTION);
            assert.equal(await createButton.isEnabled(), false);
            await this.sentKeys(DOB_INPUT, '11112000');
            assert.equal(await createButton.isEnabled(), false);
            await this.sentKeys(PASSWORD_INPUT, "P@ssword123");
            assert.equal(await createButton.isEnabled(), false);
            await this.sentKeys(VERIFY_PASSWORD_INPUT, "P@ssword123");
            assert.equal(await createButton.isEnabled(), false);
            await this.click(AGREE_TERMS_CHECKBOX);
            await this.timeout(500)
            assert.equal(await createButton.isEnabled(), true);
            await this.timeout(1500);
            await this.click(CREATE_ACCOUNT_BUTTON);

        }

        async createAccountOnEmbed(firstName,lastName,email,password){
            await this.isOnCreateAccountEmbedPage();
            await this.sentKeys(FIRST_NAME_INPUT, firstName);
            await this.sentKeys(LAST_NAME_INPUT, lastName);
            await this.sentKeys(EMAIL_INPUT, email);
            await this.click(GENDER_SELECT);
            await this.timeout(500)
            await this.click(GENDER_MALE_OPTION);
            await this.sentKeys(DOB_INPUT, '11112000');
            await this.sentKeys(PASSWORD_INPUT, password);
            await this.sentKeys(VERIFY_PASSWORD_INPUT, password);
            await this.click(AGREE_TERMS_CHECKBOX);
            await this.timeout(1500);
            await this.click(CREATE_ACCOUNT_BUTTON);
            await this.timeout(1500);
            
        }
    }
    module.exports = CreateAccountPage;