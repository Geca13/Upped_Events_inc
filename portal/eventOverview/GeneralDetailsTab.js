    const BasePage = require('../../BasePage');
    const Alerts = require("../../Validations&Alerts/Alerts");
    const assert = require("assert");
    const {Key} = require("selenium-webdriver");
    const SetImageModal = require('../portalModals/SetImageModal');
    const EVENT_NAME_INPUT = { xpath: "//div[@class='col-md-12']//input[@formcontrolname='eventName']" };
    const EVENT_SHORTNAME_INPUT = { xpath: "//input[@formcontrolname='eventShortName']" };
    const START_DATE_TIME_PICKER = { xpath: "//input[@formcontrolname='eventStartDate']" };
    const END_DATE_TIME_PICKER = { xpath: "//input[@formcontrolname='eventEndDate']" };
    const EVENT_ATTENDEES_INPUT = { xpath: "//input[@formcontrolname='eventAttendees']" };
    const EVENT_DESCRIPTION_INPUT = { xpath: "//textarea[@formcontrolname='eventDescription']" };
    const ENTERED_ADDRESS = { xpath: "//input[@placeholder='Search Nearest Location']" };
    const PUBLISH_EVENT_BUTTON = { xpath: "//a[@class='primary-btn']"}
    const UNPUBLISH_EVENT_BUTTON = { xpath: "//*[text()='Unpublish']"}
    const EVENT_BANNER_INPUT = { xpath: "//input[@type='file']" }
    const PREVIEW_IMAGE_WRAPPER = { className: 'preview-img' };
    const PREVIEW_IMAGE = { xpath: "//div[@class='preview-img']//figure//img" };
    const DELETE_BANNER_IMAGE_BUTTON = { className: "icon-trash" }
    const SAVE_BUTTON = { xpath: "//button[text()='Save']"};



    class GeneralDetailsTab extends BasePage {
        constructor(driver) {
            super(driver);
        }


        async publishButtonIsDisplayed(){
            await this.isDisplayed(PUBLISH_EVENT_BUTTON,15000);
        }
        async unpublishButtonIsDisplayed(){
            await this.isDisplayed(UNPUBLISH_EVENT_BUTTON,15000);
        }
        async clickPublishButton(){
            await this.timeout(500);
            await this.click(PUBLISH_EVENT_BUTTON)
        }

        async verifyDetailsInGeneralDetailsPageAfterCreation(shortName,naMe,loCation,startDate,endDate,atTendees, desCription){
            //await this.isDisplayed(EVENT_STATUS_LABEL,5000);
            //await this.isDisplayed(EVENT_NAME_INPUT,5000);
            await this.timeout(2500)
            await this.isDisplayed(EVENT_SHORTNAME_INPUT,5000);
            await this.clearInputField(EVENT_SHORTNAME_INPUT);
            await this.sentKeys(EVENT_SHORTNAME_INPUT,shortName);
            await this.scrollToView(SAVE_BUTTON)
            await this.moveToElement(SAVE_BUTTON)
            await this.click(SAVE_BUTTON);
            await this.timeout(2000);
            await this.scrollToView(EVENT_SHORTNAME_INPUT)
            let name = await this.getEnteredTextInTheInput(EVENT_NAME_INPUT);
            let shortname = await this.getEnteredTextInTheInput(EVENT_SHORTNAME_INPUT)
            let location = await this.getEnteredTextInTheInput(ENTERED_ADDRESS);
            let start = await this.getEnteredTextInTheInput(START_DATE_TIME_PICKER);
            let end =await this.getEnteredTextInTheInput(END_DATE_TIME_PICKER);
            let attendees = await this.getEnteredTextInTheInput(EVENT_ATTENDEES_INPUT);
            let description = await this.getEnteredTextInTheInput(EVENT_DESCRIPTION_INPUT);
            //let occurs = await this.getEnteredTextInTheInput(OCCUR_SELECT);
            //assert.equal(name,naMe);
            assert.equal(shortname,shortName)
            assert.equal(start,startDate);
            assert.equal(end,endDate);
            assert.equal(attendees,atTendees);
            assert.equal(description,desCription);
            //assert.equal(location,loCation);
        }
       
        async getEventDescription(){
            await this.isDisplayed(EVENT_DESCRIPTION_INPUT,5000, "eventDescription");
            await this.timeout(500);
            return await this.getEnteredTextInTheInput(EVENT_DESCRIPTION_INPUT);
        }
        

        async getEmbedScriptVariable(){
            await this.isDisplayed(EVENT_DESCRIPTION_INPUT, 5000, "eventDescription");
            await this.clearInputField(EVENT_DESCRIPTION_INPUT);
            await this.timeout(1000);
            await this.sentKeys(EVENT_DESCRIPTION_INPUT, Key.CONTROL + "v" );
            await this.timeout(1000);
            let script = await this.getEventDescription();
            await this.timeout(1000);
            return script;

        }

        async setBannerImageInThePortalAndAssertElements(){
            await this.scrollToView(EVENT_BANNER_INPUT);
            await this.moveToElement(EVENT_BANNER_INPUT);
            await this.sentKeys(EVENT_BANNER_INPUT,"D:\\Upped\\static\\image.jpg");
            let cropper = new SetImageModal(this.driver);
            await cropper.setImageModalIsDisplayed();
            await cropper.clickSetButton();
            await this.isDisplayed(PREVIEW_IMAGE_WRAPPER, 5000, "previewImage");
            let alerts = new Alerts(this.driver);
            await alerts.alertInfoMessageIsDisplayed("Files uploaded: (1)");
            await this.click(SAVE_BUTTON);
            await alerts.successAlertIsDisplayed("Event saved successfully!")
            await this.timeout(1000);
        }

        async removeBannerImageAndAssertPreviewAndAlertAreNotDisplayed(){
            await this.isDisplayed(PREVIEW_IMAGE_WRAPPER, 5000);
            await this.moveToElement(PREVIEW_IMAGE_WRAPPER);
            await this.isDisplayed(DELETE_BANNER_IMAGE_BUTTON, 5000);
            await this.timeout(500);
            await this.click(DELETE_BANNER_IMAGE_BUTTON);
            await this.timeout(500);
            await this.acceptAlert();
            await this.timeout(1000);
            await this.click(SAVE_BUTTON);
            await this.timeout(1000);
            let preview = await this.returnElementsCount(PREVIEW_IMAGE_WRAPPER);
            assert.equal(preview, 0);
            let alerts = new Alerts(this.driver);
            await alerts.assertInfoMessageIsNotDisplayed();
        }
        async getBannerImageSrc(){
            return await this.returnImgSrcAttribute(PREVIEW_IMAGE);
        }
    }
    module.exports = GeneralDetailsTab;