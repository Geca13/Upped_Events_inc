    const BasePage = require('../../../BasePage');
    const assert = require('assert')
    const Alerts = require('../../portalComponents/Alerts')
    const DONATIONS_CHECKBOX = { className: 'form-check-input'}
    const BANNER_INFO_IMAGE = { xpath: "//div[@class='message-container']//figure//img"}
    const BANNER_INFO_MESSAGE = { className: 'message-innr-text'}
    const DONATION_LABEL = { xpath: "//label[@class='form-check-label']" }
    const DONATIONS_TEXTAREA = { xpath: "//textarea[@type='text']" }
    const TEXTAREA_DESCRIPTION = { xpath: "//event-donations//div[@class='colr-dark']//p" }
    const SAVE_DONATION_BUTTON = { xpath: "//*[text()='Save']"}


    class DonationsPage extends BasePage {
        constructor(driver) {
            super(driver);
        }
        async donationsPageCheckBoxIsDisplayed(){
            await this.isDisplayed(DONATIONS_CHECKBOX,5000);
        }
        async clickDonationsCheckbox(){
            await this.click(DONATIONS_CHECKBOX);
            await this.timeout(500);
        }
        
        async sendDonationsMessage(){
            await this.sentKeys(DONATIONS_TEXTAREA, 'I need money for Beer, a lot of MONEY');
        }
        async clickDonationsSaveButton(){
            await this.click(SAVE_DONATION_BUTTON);
            await this.timeout(1000);
        }
        async assertElementsOnDonationPageOnStart(){
            await this.donationsPageCheckBoxIsDisplayed();
            await this.timeout(1000)
            let checkBox = await this.find(DONATIONS_CHECKBOX);
            assert.equal( await checkBox.isSelected(), false);
            let bannerInfoMessage = await this.getElementText(BANNER_INFO_MESSAGE);
            assert.equal(bannerInfoMessage, "Choose weather you accept donations for this event.");
            let checkBoxLabel = await this.getElementText(DONATION_LABEL);
            assert.equal(checkBoxLabel, "Accept Donations");
            let textBoxInfoMessage = await this.returnElementsCount(TEXTAREA_DESCRIPTION);
            assert.equal(textBoxInfoMessage, 0);
            let textarea = await this.returnElementsCount(DONATIONS_TEXTAREA);
            assert.equal(textarea, 0);
            let infoImageSrc = await this.returnImgSrcAttribute(BANNER_INFO_IMAGE);
            assert.equal(infoImageSrc, "https://dev.portal.uppedevents.com/assets/images/ic-step.svg")
        }
        async clickCheckboxAndAssertNewElements(){
            await this.clickDonationsCheckbox();
            let checkBox = await this.find(DONATIONS_CHECKBOX);
            assert.equal( await checkBox.isSelected(), true);
            let textBoxInfoMessage = await this.returnElementsCount(TEXTAREA_DESCRIPTION);
            assert.equal(textBoxInfoMessage, 1);
            let textarea = await this.returnElementsCount(DONATIONS_TEXTAREA);
            assert.equal(textarea, 1);
            let textAreaDescription = await this.getElementText(TEXTAREA_DESCRIPTION);
            assert.equal(textAreaDescription, "Inform your attendees in few short words about the purpose of the donation");
            let textAreaText = await this.getEnteredTextInTheInput(DONATIONS_TEXTAREA);
            assert.equal(textAreaText, "");
        }

        async enterDonationMessageAndSaveDonation(){
            await this.clearInputField(DONATIONS_TEXTAREA);
            await this.sendDonationsMessage()
            await this.clickDonationsSaveButton();
            let alert = new Alerts(this.driver);
            await alert.successAlertIsDisplayed("Saved successfully")
        }
        
        async getDonationMessage(){
            await this.isDisplayed(DONATIONS_TEXTAREA, 5000);
            await this.timeout(500);
            return await this.getEnteredTextInTheInput(DONATIONS_TEXTAREA);
        }

        async createDonationForEvent(){
            await this.donationsPageCheckBoxIsDisplayed();
            await this.timeout(1000)
            await this.clickDonationsCheckbox();
            await this.timeout(1000)
            await this.donationsPageTextareaIsDisplayed();
            await this.timeout(1000)
            await this.sendDonationsMessage();
            await this.timeout(1000)
            await this.clickDonationsSaveButton();
        }

        async donationsPageTextareaIsDisplayed(){
            await this.isDisplayed(DONATIONS_TEXTAREA,5000, "donationTextArea");
        }

    }
    module.exports = DonationsPage;