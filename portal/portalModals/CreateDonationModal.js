const BasePage = require('../../BasePage');
const root = require('rootrequire');
const ORGANIZATION_NAME_INPUT = { xpath: "//input[@formcontrolname='name']" }
const ORGANIZATION_LINK_INPUT = { xpath: "//input[@formcontrolname='link']" }
const ORGANIZATION_DESCRIPTION_TEXTAREA = { xpath: "//textarea[@formcontrolname='description']" }
const NEW_DONATION_VALUE_INPUT = { xpath: "//input[@formcontrolname='donationAmount']" }
const SAVE_NEW_DONATION_VALUE_BUTTON = { xpath: "//button[@class='btnAdd']" }
const UPLOAD_PHOTO_INPUT = { xpath: "//input[@type='file']" }
const ATTEST_CHECKBOX = { id: "agree-box" }
const GOAL_VALUE_INPUT = { xpath: "//input[@formcontrolname='goal']" }
const FORTH_VALUE_BUTTON = { xpath: "(//div[@id='test'])[4]" }
const SAVE_DONATION_BUTTON = { xpath: "(//button[@type='submit'])[2]" }


class CreateDonationModal extends BasePage{
    constructor(driver) {
        super(driver);
    }
    
    async createDonationModalIsDisplayed(){
        await this.isDisplayed(ORGANIZATION_NAME_INPUT, 5000)
    }
    
    async createNewDonationValue(value){
        await this.sentKeys(NEW_DONATION_VALUE_INPUT, value);
        await this.click(SAVE_NEW_DONATION_VALUE_BUTTON);
    }
    
    async fourthValueButtonIsDisplayed(){
        await this.isDisplayed(FORTH_VALUE_BUTTON, 5000)
    }
    
    async createDonation(){
        await this.createDonationModalIsDisplayed();
        await this.sentKeys(ORGANIZATION_NAME_INPUT, "UPPED EVENTS INC");
        await this.sentKeys(ORGANIZATION_LINK_INPUT, "https://www.uppedevents.com/");
        await this.sentKeys(ORGANIZATION_DESCRIPTION_TEXTAREA, "UPPED EVENTS INC DESCRIPTION");
        await this.moveToElement(ATTEST_CHECKBOX);
        await this.driver.executeScript("document.getElementsByClassName('btn-sticky')[0].style.visibility='hidden'");
        await this.sentKeys(UPLOAD_PHOTO_INPUT, root+"\\static\\image.jpg");
        await this.createNewDonationValue("1");
        await this.fourthValueButtonIsDisplayed();
        await this.sentKeys(GOAL_VALUE_INPUT, "1000");
        await this.click(ATTEST_CHECKBOX);
        await this.driver.executeScript("document.getElementsByClassName('btn-sticky')[0].style.visibility='visible'");
        await this.isDisplayed(SAVE_DONATION_BUTTON, 5000);
        await this.click(SAVE_DONATION_BUTTON);
        await this.timeout(1500);
        
    }


    async getOrganizationName() {
        await this.createDonationModalIsDisplayed();
        return await this.getEnteredTextInTheInput(ORGANIZATION_NAME_INPUT);
    }

    async getOrganizationDescription() {
        await this.createDonationModalIsDisplayed();
        return await this.getEnteredTextInTheInput(ORGANIZATION_DESCRIPTION_TEXTAREA);
    }
}

module.exports = CreateDonationModal