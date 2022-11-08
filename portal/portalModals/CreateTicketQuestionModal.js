    const BasePage = require("../../BasePage");
    const TITLE_INPUT = { xpath: "//input[@name='title']" };
    const TICKETS_SELECT = { xpath: "//ng-select[@name='ticketIds']" };
    const TICKETS_LIST = { className: "ng-option-label" };
    const QUESTION = { xpath: "//textarea[@name='question_text']" };
    const RESPONSE_INPUT = { xpath: "//div[contains(@class, 'response-question')]//input" }; //list
    const ADD_NEW_RESPONSE_OPTION = { xpath: "//div[contains(@class, 'add-container')]//i"}
    const CHECKBOXES = { className: "myRipple2" }; //list probably with executor
    const SELECT_NO_ANSWERS = { xpath: "//select[@name='allowed_no_responses']" };
    const SELECT_NO_ANSWERS_OPTIONS = { xpath: "//select[@name='allowed_no_responses']//option" };
    const PER_ELIGIBLE_TICKET = { className: "custom-radio"} //list
    const CREATE_BUTTON = { xpath: "//button[text()=' Create ']" };
    const UPDATE_BUTTON = { xpath: "//button[text()=' Update ']" };
    const BEFORE_EVENT_OPTION = { id: "sms-camp4" };

    class CreateTicketQuestionModal extends BasePage{
          constructor(driver) {
              super(driver);
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