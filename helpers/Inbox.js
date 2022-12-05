    const BasePage = require('../BasePage');
    const assert = require("assert");
    const VERIFY_EMAIL_BUTTON = { xpath: "//*[text()='Verify email address']"}
    const RESET_PASSWORD_BUTTON = { xpath: "//*[text()='Reset Password']"}
    const INBOX_FRAME = { tagName:'iframe'}
    const INBOX_TABLE_ROWS = { xpath: "//tbody//tr" }
    



    class Inbox extends BasePage {
        constructor(driver) {
            super(driver);
        }
        async loadInbox() {
            await this.timeout(3000);
            await this.visit('https://mail:upped2021@mail.dev.uppedevents.com/');
        }

        async inboxIsOpened(){
            await this.isDisplayed(INBOX_TABLE_ROWS,5000);
        }
        
        async elementIsDisplayedInInbox(text) {
            await this.elementByTextWithoutSpacesIsDisplayed(text);
            await this.timeout(3000)
        }
        async findAndClickTheEmailForNewAccount(email){
            await this.locateElementByTextAndClick(email);
        }

        async clickResetPasswordButton(){
            await this.isDisplayed(RESET_PASSWORD_BUTTON, 5000)
            await this.click(RESET_PASSWORD_BUTTON)
            await this.timeout(1000);
        }
        async getOriginalWindow(){
            await this.getOriginalWindowOrTab()
        }
        async switchToInboxIFrame(){
            await this.switchToAnIframe(INBOX_FRAME);
        }

        async verifyEmail(){
            await this.click(VERIFY_EMAIL_BUTTON);
            await this.timeout(1000)
        }
        async verifyEmailButtonIsDisplayed(){
            await this.isDisplayed(VERIFY_EMAIL_BUTTON,5000);
        }
        async checkAccountEmailIsSend(base){

            let rawEmail = await this.getChildTextByParentIndexAndChildIndex(INBOX_TABLE_ROWS,1,1);
            let email = await this.getSubstringOfInboxEmailString(rawEmail);
            assert.equal(base+'@'+base+".mk", email);

        }

        async checkAdditionalEmailIsSend(base){
            let rawEmail = await this.getChildTextByParentIndexAndChildIndex(INBOX_TABLE_ROWS,0,1);
            let email = await this.getSubstringOfInboxEmailString(rawEmail);
            assert.equal(base+'ad@ad'+base+".mk", email);
        }

    }
    module.exports = Inbox;