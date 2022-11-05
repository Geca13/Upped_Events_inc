    const BasePage = require('../../BasePage');
    const SET_IMAGE_BUTTON = { xpath: "//div[contains(@class, 'modal-footer')]//button[@class='primary-btn']"}


    class SetImageModal extends BasePage{
        constructor(driver) {
            super(driver);
        }

        async setImageModalIsDisplayed(){
            await this.isDisplayed(SET_IMAGE_BUTTON, 5000);
        }
        async clickSetButton(){
            await this.setImageModalIsDisplayed();
            await this.click(SET_IMAGE_BUTTON);
            await this.timeout(1000);
            let set = await this.findAll(SET_IMAGE_BUTTON);
            if(set.length > 0){
                await this.click(SET_IMAGE_BUTTON);
                await this.timeout(1000);
            }
        }
       
    }
    module.exports = SetImageModal;