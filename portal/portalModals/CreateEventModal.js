    const BasePage = require('../../BasePage');
    const MyEventsTab = require('../dashboard/MyEventsTab')
    const GeneralDetailsTab = require('../eventOverview/GeneralDetailsTab')
    const DateTimePickerModal = require('../portalModals/DateTimePickerModal');
    const EVENT_NAME_LABEL = { xpath: "//*[text()='Event Name ']"}
    const EVENT_NAME_INPUT = { xpath: "//lint-modal-window//input[@formcontrolname='eventName']" };
    const OCCUR_SELECT = { xpath: "//button[@role='combobox']" };
    const OCCUR_OPTIONS = { xpath: "//a[@role='option']"}; //array
    const START_DATE_TIME_PICKER = { xpath: "//input[@formcontrolname='eventStartDate']" };
    const END_DATE_TIME_PICKER = { xpath: "//input[@formcontrolname='eventEndDate']" };
    const EVENT_ATTENDEES_INPUT = { xpath: "//input[@formcontrolname='eventAttendees']" };
    const EVENT_DESCRIPTION_INPUT = { xpath: "//textarea[@formcontrolname='eventDescription']" };
    const ENTERED_ADDRESS = { xpath: "//input[@formcontrolname='eventAddress']" };
    const CREATE_EVENT_BUTTON = { className: "ar-btn"};

    class CreateEventModal extends BasePage  {

        constructor(driver) {
            super(driver);
        }

        async occurrenceOptionsAreDisplayed(){
            await this.isDisplayed(OCCUR_OPTIONS,500);
        }

        async createEventModalIsDisplayed(){
           await this.isDisplayed(EVENT_NAME_LABEL,5000);
        }
        async submitButtonIsClickable(){
            await this.isDisplayed(CREATE_EVENT_BUTTON,15000);
        }

        async fillFormWithValidDataAndSave(eventName,shortName){
            await this.sentKeys(EVENT_NAME_INPUT, eventName);
            await this.click(OCCUR_SELECT);
            await this.occurrenceOptionsAreDisplayed();
            await this.click(OCCUR_OPTIONS)
            await this.sentKeys(EVENT_ATTENDEES_INPUT, "12345");
            await this.sentKeys(EVENT_DESCRIPTION_INPUT, eventName +" description");
            await this.click(START_DATE_TIME_PICKER);
            let startDatePicker = new DateTimePickerModal(this.driver);
            await startDatePicker.datePickerIsVisible();
            await startDatePicker.selectTodayDate();
            await this.timeout(1500)
            await startDatePicker.clickSetButton();
            await this.timeout(1500)
            await this.click(END_DATE_TIME_PICKER);
            let endDatePicker = new DateTimePickerModal(this.driver);
            await endDatePicker.datePickerIsVisible();
            await endDatePicker.clickNextMonthButton();
            await endDatePicker.select13Day();
            await this.timeout(1500)
            await endDatePicker.clickSetButton();
            await this.submitButtonIsClickable();
            let name = await this.getEnteredTextInTheInput(EVENT_NAME_INPUT)
            let location = await this.getEnteredTextInTheInput(ENTERED_ADDRESS);
            let origStart = await this.getEnteredTextInTheInput(START_DATE_TIME_PICKER)
            let origEnd = await this.getEnteredTextInTheInput(END_DATE_TIME_PICKER);
            let origAtt = await this.getEnteredTextInTheInput(EVENT_ATTENDEES_INPUT);
            let start = await this.formatDateTimeInputToIncludeComma(START_DATE_TIME_PICKER);
            let end =await this.formatDateTimeInputToIncludeComma(END_DATE_TIME_PICKER);
            let attendees = await this.numberWithCommas(EVENT_ATTENDEES_INPUT);
            let description = await this.getEnteredTextInTheInput(EVENT_DESCRIPTION_INPUT);
            await this.click(CREATE_EVENT_BUTTON);
            await this.timeout(1500)
            let myEvents = new MyEventsTab(this.driver)
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.assertCorrectValuesAfterCreation(eventName,name,location,start,end,attendees);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            let details = new GeneralDetailsTab(this.driver);
            await details.publishButtonIsDisplayed();
            await details.verifyDetailsInGeneralDetailsPageAfterCreation(shortName, name,location,origStart,origEnd,origAtt,description);

        }
        
    }
    module.exports = CreateEventModal;