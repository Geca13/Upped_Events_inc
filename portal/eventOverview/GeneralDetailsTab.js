    const BasePage = require('../../BasePage');
    const assert = require("assert");
    const {Key} = require("selenium-webdriver");
     const EVENT_SHORTNAME_INPUT = { xpath: "//input[@formcontrolname='eventShortName']" };
    const START_DATE_TIME_PICKER = { xpath: "//input[@formcontrolname='eventStartDate']" };
    const END_DATE_TIME_PICKER = { xpath: "//input[@formcontrolname='eventEndDate']" };
    const EVENT_ATTENDEES_INPUT = { xpath: "//input[@formcontrolname='eventAttendees']" };
    const EVENT_DESCRIPTION_INPUT = { xpath: "//textarea[@formcontrolname='eventDescription']" };
    const PUBLISH_EVENT_BUTTON = { xpath: "//a[@class='primary-btn']"}
    const UNPUBLISH_EVENT_BUTTON = { xpath: "//*[text()='Unpublish']"}
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
            
            await this.timeout(2500)
            await this.isDisplayed(EVENT_SHORTNAME_INPUT,5000);
            await this.clearInputField(EVENT_SHORTNAME_INPUT);
            await this.sentKeys(EVENT_SHORTNAME_INPUT,shortName);
            await this.scrollToView(SAVE_BUTTON)
            await this.moveToElement(SAVE_BUTTON)
            await this.click(SAVE_BUTTON);
            await this.timeout(2000);
            await this.scrollToView(EVENT_SHORTNAME_INPUT)
            let shortname = await this.getEnteredTextInTheInput(EVENT_SHORTNAME_INPUT)
            let start = await this.getEnteredTextInTheInput(START_DATE_TIME_PICKER);
            let end =await this.getEnteredTextInTheInput(END_DATE_TIME_PICKER);
            let attendees = await this.getEnteredTextInTheInput(EVENT_ATTENDEES_INPUT);
            let description = await this.getEnteredTextInTheInput(EVENT_DESCRIPTION_INPUT);
            assert.equal(shortname,shortName)
            assert.equal(start,startDate);
            assert.equal(end,endDate);
            assert.equal(attendees,atTendees);
            assert.equal(description,desCription);
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

        
        
    }
    module.exports = GeneralDetailsTab;