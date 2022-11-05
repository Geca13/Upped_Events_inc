    const BasePage = require("../../BasePage");
    const { expect } = require('chai');
    const MODAL_HEADER = {xpath: "//div[@class='column_title']//h4" };
    const TITLE_INPUT = { xpath: "//input[@name='title']" };
    const INPUT_LABELS = { xpath: "//div[@id='add-lint-ticket']//div[contains(@class, 'fields')]//label" }
    const TICKETS_LIST_LABEL = { xpath: "//div[@id='add-lint-ticket']//span"}
    const TICKETS_SELECT = { xpath: "//ng-select[@name='ticketIds']" };
    const TICKETS_LIST = { className: "ng-option-label" };
    const OPTIONAL_CHECKBOX_LABEL = { xpath: "//div[@class='inline-checkbox-content']//span" }
    const QUESTION = { xpath: "//textarea[@name='question_text']" };
    const RESPONSE_HEADER = { xpath: "//div[@class='form-group'][3]//label" }
    const RESPONSE_INPUT = { xpath: "//div[contains(@class, 'response-question')]//input" }; //list
    const ADD_NEW_RESPONSE_OPTION = { xpath: "//div[contains(@class, 'add-container')]//i"}
    const RESPONSE_CHECKBOX_LABELS = { xpath: "//div[contains(@class, 'response-container')]//div[@class='inline-checkbox-content']//span" }
    const RESPONSE_CHECKBOXES = { xpath: "//div[contains(@class, 'response-container')]//div[@class='inline-price-checkbox']//label" }
    const CHECKBOXES = { className: "myRipple2" }; //list probably with executor
    const SELECT_NO_ANSWERS = { xpath: "//select[@name='allowed_no_responses']" };
    const SELECT_NO_ANSWERS_OPTIONS = { xpath: "//select[@name='allowed_no_responses']//option" };
    const RADIO_LABELS = { xpath: "//label[contains(@class, 'custom-radio')]//span"}
    const PER_ELIGIBLE_TICKET = { className: "custom-radio"} //list
    const IMAGE = { xpath: "//input[@type='file']" };
    const ASK_QUESTION_HEADER = { xpath: "//div[@class='form-group'][4]//div" }
    const MUST_ANSWER_HEADER = { xpath: "//div[@class='form-group'][5]//div" }
    const CREATE_BUTTON = { xpath: "//button[text()=' Create ']" };
    const ALLOW_ATTENDEE_OPTION = { xpath: "//span[text()='Allow attendee to input text with this response']" };
    const ADD_PICTURE_OPTION = { xpath: "//span[text()='Allow attendee to input text with this response']" };
    const CLOSE_BUTTON = { xpath: "//a[text()='Close']" };
    const RESET_BUTTON = { xpath: "//button[text()='Reset']" };
    const UPDATE_BUTTON = { xpath: "//button[text()=' Update ']" };
    const BEFORE_EVENT_OPTION = { id: "sms-camp4" };
    const DELETE_RESPONSE_BUTTON = { className: "icon-delete" }

    class CreateTicketQuestionModal extends BasePage{
          constructor(driver) {
              super(driver);
          }

          async assertTextElementsOnTicketQuestionsModal(){
              let header = await this.getElementText(MODAL_HEADER);
              expect(header).to.equal("Create Ticket Question")
              let titleInputLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 0);
              expect(titleInputLabel).to.equal("TITLE THIS QUESTION")
              let ticLab = await this.getElementText(TICKETS_LIST_LABEL);
              expect(ticLab).to.equal("Which ticket type(s) does this question pertain to?")
              let optionalLabel = await this.getElementText(OPTIONAL_CHECKBOX_LABEL);
              expect(optionalLabel).to.equal("Answering this question is optional");
              await this.timeout(5000)
              let questionLabel = await this.getElementTextFromAnArrayByIndex(INPUT_LABELS, 1);
              let actual = "Write the text of your question here exactly as you would like it to be displayed to attendees";
              expect(questionLabel).to.equal(actual.toUpperCase());
              let responseHeader = await this.getElementText(RESPONSE_HEADER);
              expect(responseHeader).to.equal("Responses");
              let attendeeText = await this.getElementTextFromAnArrayByIndex(RESPONSE_CHECKBOX_LABELS, 0);
              expect(attendeeText).to.equal("Allow attendee to input text with this response");
              let attendeeImage = await this.getElementTextFromAnArrayByIndex(RESPONSE_CHECKBOX_LABELS, 1);
              expect(attendeeImage).to.equal("I'd like to add a picture for this caption");
              let askQuestionHeader = await this.getElementText(ASK_QUESTION_HEADER);
              expect(askQuestionHeader).to.equal("Ask this question");
              let once = await this.getElementTextFromAnArrayByIndex(RADIO_LABELS, 0);
              expect(once).to.equal("Once per transaction");
              let forEach = await this.getElementTextFromAnArrayByIndex(RADIO_LABELS, 1);
              expect(forEach).to.equal("For each eligible ticket");
              let mustAnswer = await this.getElementText(MUST_ANSWER_HEADER);
              expect(mustAnswer).to.equal("Attendees must answer");
              let atTime = await this.getElementTextFromAnArrayByIndex(RADIO_LABELS, 2);
              expect(atTime).to.equal("At time of ticketing");
              let before = await this.getElementTextFromAnArrayByIndex(RADIO_LABELS, 3);
              expect(before).to.equal("Sometime before the event");
              await this.isDisplayed(RESET_BUTTON,5000);
              await this.isDisplayed(CLOSE_BUTTON,5000);
              await this.isDisplayed(CREATE_BUTTON,5000);

          }

          async assertProperInputsBehaviourWhenAddingRemovingResponses(){
              let responceOptionInput = await this.returnElementsCount(RESPONSE_INPUT);
              expect(responceOptionInput).to.equal(1);
              let answersOptionDropdown = await this.returnElementsCount(SELECT_NO_ANSWERS);
              expect(answersOptionDropdown).to.equal(0);
              let answersOptionDropdownOptions = await this.returnElementsCount(SELECT_NO_ANSWERS_OPTIONS);
              expect(answersOptionDropdownOptions).to.equal(0);
              let deleteResponseButton = await this.returnElementsCount(DELETE_RESPONSE_BUTTON);
              expect(deleteResponseButton).to.equal(responceOptionInput);
              let imageInput = await this.returnElementsCount(IMAGE);
              expect(imageInput).to.equal(0);
              let allowOption = await this.returnElementsCount(ALLOW_ATTENDEE_OPTION);
              expect(allowOption).to.equal(1);
              let pictureLabel = await this.returnElementsCount(ALLOW_ATTENDEE_OPTION);
              expect(pictureLabel).to.equal(1);
              await this.click(ADD_NEW_RESPONSE_OPTION);
              await this.timeout(1500);
              await this.moveToElement(BEFORE_EVENT_OPTION)
              responceOptionInput = await this.returnElementsCount(RESPONSE_INPUT);
              expect(responceOptionInput).to.equal(2);
              answersOptionDropdown = await this.returnElementsCount(SELECT_NO_ANSWERS);
              expect(answersOptionDropdown).to.equal(1);
              answersOptionDropdownOptions = await this.returnElementsCount(SELECT_NO_ANSWERS_OPTIONS);
              expect(answersOptionDropdownOptions).to.equal(responceOptionInput);
              deleteResponseButton = await this.returnElementsCount(DELETE_RESPONSE_BUTTON);
              expect(deleteResponseButton).to.equal(responceOptionInput);
              allowOption = await this.returnElementsCount(ALLOW_ATTENDEE_OPTION);
              expect(allowOption).to.equal(responceOptionInput);
              pictureLabel = await this.returnElementsCount(ADD_PICTURE_OPTION);
              expect(pictureLabel).to.equal(responceOptionInput);
              await this.clickElementReturnedFromAnArray(RESPONSE_CHECKBOXES,1)
              await this.timeout(1000);
              imageInput = await this.returnElementsCount(IMAGE);
              expect(imageInput).to.equal(1);
              await this.clickElementReturnedFromAnArray(RESPONSE_CHECKBOXES,3)
              await this.timeout(1000);
              imageInput = await this.returnElementsCount(IMAGE);
              expect(imageInput).to.equal(2);
              await this.click(ADD_NEW_RESPONSE_OPTION);
              await this.timeout(1000);
              await this.moveToElement(BEFORE_EVENT_OPTION)
              responceOptionInput = await this.returnElementsCount(RESPONSE_INPUT);
              expect(responceOptionInput).to.equal(3);
              answersOptionDropdownOptions = await this.returnElementsCount(SELECT_NO_ANSWERS_OPTIONS);
              expect(answersOptionDropdownOptions).to.equal(responceOptionInput);
              deleteResponseButton = await this.returnElementsCount(DELETE_RESPONSE_BUTTON);
              expect(deleteResponseButton).to.equal(responceOptionInput);
              allowOption = await this.returnElementsCount(ALLOW_ATTENDEE_OPTION);
              expect(allowOption).to.equal(responceOptionInput);
              pictureLabel = await this.returnElementsCount(ADD_PICTURE_OPTION);
              expect(pictureLabel).to.equal(responceOptionInput);
              await this.clickElementReturnedFromAnArray(RESPONSE_CHECKBOXES,5)
              await this.timeout(1000);
              imageInput = await this.returnElementsCount(IMAGE);
              expect(imageInput).to.equal(3);
              await this.clickElementReturnedFromAnArray(DELETE_RESPONSE_BUTTON,2)
              await this.timeout(1000);
              responceOptionInput = await this.returnElementsCount(RESPONSE_INPUT);
              expect(responceOptionInput).to.equal(2);
              answersOptionDropdown = await this.returnElementsCount(SELECT_NO_ANSWERS);
              expect(answersOptionDropdown).to.equal(1);
              answersOptionDropdownOptions = await this.returnElementsCount(SELECT_NO_ANSWERS_OPTIONS);
              expect(answersOptionDropdownOptions).to.equal(responceOptionInput);
              deleteResponseButton = await this.returnElementsCount(DELETE_RESPONSE_BUTTON);
              expect(deleteResponseButton).to.equal(responceOptionInput);
              allowOption = await this.returnElementsCount(ALLOW_ATTENDEE_OPTION);
              expect(allowOption).to.equal(responceOptionInput);
              pictureLabel = await this.returnElementsCount(ADD_PICTURE_OPTION);
              expect(pictureLabel).to.equal(responceOptionInput);
              imageInput = await this.returnElementsCount(IMAGE);
              expect(imageInput).to.equal(2);
              await this.clickElementReturnedFromAnArray(RESPONSE_CHECKBOXES,1)
              await this.timeout(5000);
              imageInput = await this.returnElementsCount(IMAGE);
              expect(imageInput).to.equal(1);
          }

          async createYesNoQuestion(base){
              await this.isDisplayed(TITLE_INPUT, 5000);
              await this.sentKeys(TITLE_INPUT, base + " Yes & No question");
              await this.click(TICKETS_SELECT);
              await this.isDisplayed(TICKETS_LIST, 5000);
              await this.clickElementReturnedFromAnArray(TICKETS_LIST,0);
              await this.clickElementReturnedFromAnArray(TICKETS_LIST,2);
              await this.click(TITLE_INPUT);
              await this.sentKeys(QUESTION, base + " What do you prefer?");
              await this.sentKeys(RESPONSE_INPUT, base + " FANTA");
              await this.click(ADD_NEW_RESPONSE_OPTION);
              await this.sendKeysToElementReturnedFromAnArray(RESPONSE_INPUT, 1, base + " COCA COLA")
              //await this.click(PER_ELIGIBLE_TICKET);
              await this.click(SELECT_NO_ANSWERS);
              await this.isDisplayed(SELECT_NO_ANSWERS_OPTIONS,5000);
              await this.clickElementReturnedFromAnArray(SELECT_NO_ANSWERS_OPTIONS,0);
              await this.click(CREATE_BUTTON);
          }

          async updateYesNoQuestion(base){
              await this.isDisplayed(TITLE_INPUT, 5000);
              await this.click(ADD_NEW_RESPONSE_OPTION);
              await this.sendKeysToElementReturnedFromAnArray(RESPONSE_INPUT, 2, base + " OTHER");
              await this.moveToElement(BEFORE_EVENT_OPTION)
              await this.clickElementReturnedFromAnArray(CHECKBOXES,8);
              await this.clickElementReturnedFromAnArray(PER_ELIGIBLE_TICKET,1);
              await this.click(UPDATE_BUTTON);
          }

          async createQuestionWithTextInput(base){
              await this.isDisplayed(TITLE_INPUT, 5000);
              await this.sentKeys(TITLE_INPUT, base + " Attendee Age");
              await this.click(TICKETS_SELECT);
              await this.isDisplayed(TICKETS_LIST, 5000);
              await this.clickElementReturnedFromAnArray(TICKETS_LIST,0);
              await this.click(TITLE_INPUT);
              await this.sentKeys(QUESTION, base + " What is your Age?");
              await this.sentKeys(RESPONSE_INPUT, base + " Under 18");
              await this.clickElementReturnedFromAnArray(CHECKBOXES,3);
              await this.click(ADD_NEW_RESPONSE_OPTION);
              await this.sendKeysToElementReturnedFromAnArray(RESPONSE_INPUT, 1, base + " 18 and Over")
              await this.clickElementReturnedFromAnArray(CHECKBOXES,5);
              await this.click(SELECT_NO_ANSWERS);
              await this.isDisplayed(SELECT_NO_ANSWERS_OPTIONS,5000);
              await this.clickElementReturnedFromAnArray(SELECT_NO_ANSWERS_OPTIONS,0);
              await this.click(CREATE_BUTTON);
        }


    }
    module.exports = CreateTicketQuestionModal;