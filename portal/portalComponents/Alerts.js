    const BasePage = require('../../BasePage');
    const assert = require('assert')
    const TOAST_BANNER = { id:'toast-container' }
    const TOAST_TITLE = { className:'toast-title' }
    const TOAST_MESSAGE = { className:'toast-message' }
    const ALERT_INFO = { className: "alert-info" }
    const ALERT_DANGER = { xpath: "//div[contains(@class, 'alert-danger')]" }



    class Alerts extends BasePage {

    constructor(driver){
        super(driver);
        }

    async savedAlertIsDisplayed(message){
        await this.isDisplayed(TOAST_TITLE,5000, "savedToastTitle");
        let alertTitle = await this.getElementText(TOAST_TITLE);
        assert.equal(alertTitle,'Saved!');
        let alertMessage = await this.getElementText(TOAST_MESSAGE);
        assert.equal(alertMessage,message);
        await this.timeout(5000);

    }

    async successAlertIsDisplayed(text){
        await this.isDisplayed(TOAST_TITLE,5000, "successToastTitle");
        let alertTitle = await this.getElementText(TOAST_TITLE);
        await this.timeout(1000);
        assert.equal(alertTitle,'Success');
        let alertMessage = await this.getElementText(TOAST_MESSAGE);
        assert.equal(text,alertMessage);
        await this.timeout(5000);
        }
    async errorAlertIsDisplayed(text){
        await this.isDisplayed(TOAST_TITLE,15000);
        await this.timeout(1000)
        let alertTitle = await this.getElementText(TOAST_TITLE);
        assert.equal(alertTitle,'Error');
        let alertMessage = await this.getElementText(TOAST_MESSAGE);
        assert.equal(text,alertMessage);
        await this.timeout(5000);
    }

    async correctInfoMessageIsDisplayed(expected){
        await this.isDisplayed(TOAST_MESSAGE,5000);
        await this.timeout(500);
        let alertMessage = await this.getElementText(TOAST_MESSAGE);
        assert.equal(expected,alertMessage);
        await this.timeout(5000);

    }

    async errorInfoMessageIsDisplayed(expected){
        await this.isDisplayed(TOAST_MESSAGE,5000);
        await this.timeout(500);
        let alertMessage = await this.getElementText(TOAST_MESSAGE);
        assert.equal(expected,alertMessage);
        await this.timeout(5000);

    }

    async successInfoMessageIsDisplayed(expected){
        await this.isDisplayed(TOAST_MESSAGE,5000);
        await this.timeout(500);
        let alertMessage = await this.getElementText(TOAST_MESSAGE);
        assert.equal(expected,alertMessage);
        await this.timeout(5000);

    }

    async alertInfoMessageIsDisplayed(expected){
        await this.isDisplayed(ALERT_INFO, 5000)
        await this.timeout(500);
        let alertMessage = await this.getElementText(ALERT_INFO);
        assert.equal(alertMessage,expected);
        await this.timeout(1000);
    }
    async assertInfoMessageIsNotDisplayed(){
        let alert = await this.returnElementsCount(ALERT_INFO);
        assert.equal(alert, 0);
    }

    async updatedSuccessMessageIsShown(text){
        await this.isDisplayed(TOAST_TITLE,15000);
        await this.timeout(1000)
        let alertTitle = await this.getElementText(TOAST_TITLE);
        assert.equal(alertTitle,'Updated');
        let alertMessage = await this.getElementText(TOAST_MESSAGE);
        assert.equal(text,alertMessage);
        await this.timeout(1000);
    }

    async alertDangerIsDisplayAndAssertText(text){
        await this.isDisplayed(ALERT_DANGER,5000);
        await this.timeout(500);
        let alertMessage = await this.getElementText(ALERT_DANGER);
        assert.equal(alertMessage, text);
        await this.timeout(1000);
    }




    }
    module.exports = Alerts;



