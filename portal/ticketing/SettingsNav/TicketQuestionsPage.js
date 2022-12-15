    const BasePage = require('../../../BasePage');
    const assert = require('assert')
    const CreateTicketQuestionPage = require('../../portalModals/CreateTicketQuestionModal')
    const ADD_BUTTON = { xpath: "//a[text()='Add']" }
    const EDIT_QUESTION_ICON = { xpath: "//a[contains(@class, 'text-second')]//span" }
    const QUESTION_OFF_TOGGLE = {className: 'lc_off' }
    const QUESTION_ON_TOGGLE = {className: 'lc_on' }
    const SAVED_QUESTION = { xpath: "//td[contains(@class, 'column-title')]//span" } //list
    const MANDATORY = { xpath: "//td[contains(@class, 'column-ismandatory')]//span" }
    const SELECTED_TICKETS = { xpath: "//td[contains(@class, 'column-tickettypes')]//span" }
    const QUESTIONS_TABLE = { id: "dataTable" }

    class TicketQuestionsPage extends BasePage{
        constructor(driver) {
            super(driver);
        }

        async clickActivateQuestionButton(index){
            await this.isOnTicketQuestionsPage();
            console.log("Is in ticket q page")
            await this.timeout(2000);
            await this.isDisplayed(QUESTION_OFF_TOGGLE,5000);
            console.log("QUESTION_OFF_TOGGLE enabled")
            await this.clickElementReturnedFromAnArray(QUESTION_OFF_TOGGLE,index);
            console.log("clicked off toggle")
            await this.timeout(500);
        }

        async clickDeactivateQuestionButton(index){
            await this.isOnTicketQuestionsPage();
            console.log("Is in ticket q page")
            await this.timeout(2000);
            await this.isDisplayed(QUESTION_ON_TOGGLE,5000);
            console.log("QUESTION_ON_TOGGLE enabled")
            await this.timeout(500);
            await this.clickElementReturnedFromAnArray(QUESTION_ON_TOGGLE,index);
            console.log("clicked on toggle")
            await this.timeout(500);
        }

        async isOnTicketQuestionsPage(){
            await this.timeout(1000);
            await this.isDisplayed(QUESTIONS_TABLE,5000);
        }
        async createSimpleYesNoQuestionAndAssertSavedDataAndElements(base, ticketOneName, ticketThreeName){
            await this.timeout(2000)
            await this.isOnTicketQuestionsPage();

            await this.click(ADD_BUTTON);
            let createQuestionModal = new CreateTicketQuestionPage(this.driver);
            await createQuestionModal.createYesNoQuestion(base);
            await this.isDisplayed(SAVED_QUESTION, 5000);
            let question = await this.getTextFromElementOfArray(SAVED_QUESTION,0);
            assert.equal(question, base + " Yes & No question");
            let mandatory = await this.getTextFromElementOfArray(MANDATORY,0);
            assert.equal(mandatory, "Y");
            let tickets = await this.getTextFromElementOfArray(SELECTED_TICKETS,0);
            assert.equal(tickets, ticketOneName + " ," + ticketThreeName);

        }

        async updateFirstQuestionToIncludeInputAndForEachTicket(base){
            await this.timeout(5000)
            await this.isOnTicketQuestionsPage();
            await this.isDisplayed(EDIT_QUESTION_ICON,5000)
            await this.click(EDIT_QUESTION_ICON);
            let createQuestionModal = new CreateTicketQuestionPage(this.driver);
            await createQuestionModal.updateYesNoQuestion(base);
            await this.isDisplayed(SAVED_QUESTION, 5000);
            let question = await this.getTextFromElementOfArray(SAVED_QUESTION,0);
            assert.equal(question, base + " Yes & No question");
        }

        async createQuestionWithInput(base){
            await this.isOnTicketQuestionsPage();
            await this.click(ADD_BUTTON);
            let createQuestionModal = new CreateTicketQuestionPage(this.driver);
            await createQuestionModal.createQuestionWithTextInput(base);
            await this.isDisplayed(SAVED_QUESTION, 5000);
            await this.timeout(1000);
            let question = await this.getTextFromElementOfArray(SAVED_QUESTION,1);
            assert.equal(question, base + " Attendee Age");
        }

    }
    module.exports = TicketQuestionsPage;