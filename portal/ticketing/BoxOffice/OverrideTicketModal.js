    const BasePage = require('../../../BasePage');
    const MANAGER_CODE_INPUT = { xpath: "//input[@type='password']"};
    const CONFIRM_OVERRIDE = { xpath: "//button[text()='Confirm']"};
    const VALID_CODE_MESSAGE = { xpath: "//div[text()=' Valid Manager Code! ']"};
    const NEW_TICKET_PRICE_INPUT = { xpath: "//input[@formcontrolname='overriddenTicketPrice']"};
    const SAVE_BUTTON = { xpath: "//button[@type='submit']"};

    class OverrideTicketModal extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async overrideModalIsDisplayed(){
            await this.isDisplayed(MANAGER_CODE_INPUT,5000);
        }
        async loginToTheOverrideModal(){
            await this.sentKeys(MANAGER_CODE_INPUT, "0000");
            await this.click(CONFIRM_OVERRIDE);
            await this.isDisplayed(VALID_CODE_MESSAGE,5000,);
        }
        
        async setNewPrice(newPrice){
            await this.sentKeys(NEW_TICKET_PRICE_INPUT,newPrice);
        }
        async clickSaveChangesButton(){
            await this.clickElementReturnedFromAnArray(SAVE_BUTTON,1)
        }

    }
    module.exports = OverrideTicketModal;