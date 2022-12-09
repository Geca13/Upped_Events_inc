    const BasePage = require('../../BasePage');
    const assert = require('assert')
    const VIEW_RECEIPT_BUTTON = { xpath: "//*[text()='View Receipt']"}
    const DONE_BUTTON = { xpath: "//*[text()='Done']"}
    const CONFIRM_BLOCKS = { xpath: "//app-embed-ticketing-confirm//div[contains(@class , 'embed-box-border')]" }
    const THANKS_HEADER = { className: "thank-text"}
    const SUBHEADERS = { className: "info-text"}
    const TOTAL = { className: "total-text"}
    const SHARE_HEADER = { className: "share"}
    const SHARE_INFO_MESSAGE = { xpath: "//div[@class='share']/following-sibling::div"}
    const DOWNLOAD_APPS_HEADER = { className: "download-text"}
    const FACEBOOK_GOOGLE_APPLE = { xpath: "//div[@class='mt-3']//img" }


    class ConfirmPage extends BasePage {
        constructor(driver) {
            super(driver);
        }

    async isAtConfirmPage(){
        await this.isDisplayed(VIEW_RECEIPT_BUTTON,90000);
    }

    async clickViewReceiptButton(){
        await this.click(VIEW_RECEIPT_BUTTON);
    }

    async assertElementsOnConfirmPage(){

        let thanks = await this.getElementText(THANKS_HEADER);
        assert.equal(thanks, "Thank You for Using Upped" );
        let blocks = await this.returnElementsCount(CONFIRM_BLOCKS);
        assert.equal(blocks, 2);
        let confirmationMessage = await this.getElementTextFromAnArrayByIndex(SUBHEADERS, 0);
        assert.equal(confirmationMessage, "A confirmation " +
            "has been sent to your email. You can also view all of your orders in the purchases" +
            " page of your account whenever you want. You are on your way to experience the future of events!");
        let total = await this.getElementText(TOTAL);
        if(await this.environment() === "stage"){
            assert.equal(total, "Total:$0.27");
        }else{
            assert.equal(total, "Total:$3.34");
        }
        let receiptButton = await this.getElementText(VIEW_RECEIPT_BUTTON);
        assert.equal(receiptButton, "View Receipt");
        let shareHeader = await this.getElementText(SHARE_HEADER);
        assert.equal(shareHeader, "Share and Invite!")
        let shareMessage = await this.getElementText(SHARE_INFO_MESSAGE);
        assert.equal(shareMessage, "Share your purchase through social media or send it to a friend via email!");
        let downloadHeader = await this.getElementText(DOWNLOAD_APPS_HEADER);
        assert.equal(downloadHeader, "Download the Upped Application!");
        let appInfoMessage = await this.getElementTextFromAnArrayByIndex(SUBHEADERS, 1);
        assert.equal(appInfoMessage, "The upped app has all of the website features " +
            "and is your portal to entering and purchasing items at upped events. " +
            "Download on the App Store or Google Play Store, or send a link to your phone!");
        let facebookSrc = await this.returnImgSrcAttributeByIndex(FACEBOOK_GOOGLE_APPLE,0);
        let googleSrc = await this.returnImgSrcAttributeByIndex(FACEBOOK_GOOGLE_APPLE,1);
        let appSrc = await this.returnImgSrcAttributeByIndex(FACEBOOK_GOOGLE_APPLE,2);
        if(await this.environment() === "stage"){
            assert.equal(facebookSrc, "https://events.stage.uppedevents.com/assets/images/facebook1.png");
            assert.equal(googleSrc, "https://events.stage.uppedevents.com/assets/images/playstore.png");
            assert.equal(appSrc, "https://events.stage.uppedevents.com/assets/images/appstore.png");
        }else{
            assert.equal(facebookSrc, "https://events.dev.uppedevents.com/assets/images/facebook1.png");
            assert.equal(googleSrc, "https://events.dev.uppedevents.com/assets/images/playstore.png");
            assert.equal(appSrc, "https://events.dev.uppedevents.com/assets/images/appstore.png");
        }

    }
    async goBackToStartPage(){
        await this.click(DONE_BUTTON)
    }
}
    module.exports = ConfirmPage;