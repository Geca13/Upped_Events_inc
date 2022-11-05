    const BasePage = require('../../../BasePage');
    const assert = require('assert')
    const CreateTicketQuestionPage = require('../../portalModals/CreateTicketQuestionModal')
    const TableComponent = require('../../portalComponents/TableComponent')
    const ADD_BUTTON = { xpath: "//a[text()='Add']" }
    const EDIT_QUESTION_ICON = { xpath: "//a[contains(@class, 'text-second')]//span" }
    const DELETE_QUESTION_ICON = { xpath: "//a[contains(@class, 'text-danger')]" }
    const QUESTION_OFF_TOGGLE = {className: 'lc_off' }
    const QUESTION_ON_TOGGLE = {className: 'lc_on' }
    const SAVED_QUESTION = { xpath: "//td[contains(@class, 'column-title')]//span" } //list
    const MANDATORY = { xpath: "//td[contains(@class, 'column-ismandatory')]//span" }
    const SELECTED_TICKETS = { xpath: "//td[contains(@class, 'column-tickettypes')]//span" }

    class TicketQuestionsPage extends BasePage{
        constructor(driver) {
            super(driver);
        }

        async assertElementsOnCreateTicketQuestionModal(){
            await this.isOnTicketQuestionsPage();
            await this.click(ADD_BUTTON);
            let createQuestionModal = new CreateTicketQuestionPage(this.driver);
            await createQuestionModal.assertTextElementsOnTicketQuestionsModal();
            await createQuestionModal.assertProperInputsBehaviourWhenAddingRemovingResponses();
        }

        async assertElementsOnEventTicketsQuestionsPage(){
            let table = new TableComponent(this.driver)
            await table.messageWhenTableIsEmpty("You do not currently have any ticket questions.")
        }

        async openTicketsQuestionsPageDirectly(eventId){
            await this.visit("https://dev.portal.uppedevents.com/dashboard/event/" + eventId + "/ticket/settings?tab=additional")
            await this.isOnTicketQuestionsPage();
        }

        async assertTicketsQuestionsTableHeaders(){
            let table = new TableComponent(this.driver);
            await table.assertColumnNamesByIndex(1, "Question Title");
            await table.assertColumnNamesByIndex(2, "Mandatory (Y/N)");
            await table.assertColumnNamesByIndex(3, "Ticket Types");
            await table.assertColumnNamesByIndex(4, "Active");
        }

        async clickActivateQuestionButton(index){
            await this.isDisplayed(QUESTION_OFF_TOGGLE,5000);
            await this.clickElementReturnedFromAnArray(QUESTION_OFF_TOGGLE,index);
            await this.driver.sleep(500);
        }
        async clickDeactivateQuestionButton(index){
            await this.isDisplayed(QUESTION_ON_TOGGLE,5000);
            await this.clickElementReturnedFromAnArray(QUESTION_ON_TOGGLE,index);
            await this.driver.sleep(500);
        }

        async isOnTicketQuestionsPage(){
            await this.isDisplayed(ADD_BUTTON,5000);
        }
        async createSimpleYesNoQuestionAndAssertSavedDataAndElements(base, ticketOneName, ticketThreeName){
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