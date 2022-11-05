    const BasePage = require('../../BasePage');
    const assert = require("assert");
    const MODAL_HEADER = { className: "popup-header-title" };
    const QUESTIONS = { xpath: "//div[contains(@class, 'col-7')]//p[@class='question-text']" } ; //list
    const ANSWERS = { xpath: "//div[contains(@class, 'col-5')]//p[@class='question-text']" } ; //list
    const FULL_NUMBER_OF_TICKETS_TEXT = { xpath: "//div[@class='ticket-count-block']//p" }
    const ONLY_NUMBER_OF_TICKETS = { xpath: "//div[@class='ticket-count-block']//p//b" }


    class QuestionsResponseModal extends BasePage{
        constructor(driver) {
            super(driver);
        }

        async assertTicketsForFirstTwoPurchases(base){

            await this.isDisplayed(MODAL_HEADER, 15000);
            await this.timeout(1000);
            let fullNumberOfTickets = await this.getElementText(FULL_NUMBER_OF_TICKETS_TEXT);
            assert.equal(fullNumberOfTickets, "Number of tickets: 2")
            let firstAnsweredQuestion = await this.getElementTextFromAnArrayByIndex(QUESTIONS, 0);
            assert.equal(firstAnsweredQuestion, base + " Yes & No question")
            let firstRadioAnswer = await this.getElementTextFromAnArrayByIndex(ANSWERS, 0);
            assert.equal(firstRadioAnswer, base + " FANTA")
            let secondAnsweredQuestion = await this.getElementTextFromAnArrayByIndex(QUESTIONS, 1);
            assert.equal(secondAnsweredQuestion, base + " Attendee Age")
            let secondInputAnswer = await this.getElementTextFromAnArrayByIndex(ANSWERS, 1);
            assert.equal(secondInputAnswer, "17");
            
        }

        async assertForTicketQuestionsResponsesForTheUpdated(base){
            await this.isDisplayed(MODAL_HEADER, 15000);
            await this.timeout(1500);
            let numberOfTickets = await this.getElementText(ONLY_NUMBER_OF_TICKETS);
            assert.equal(numberOfTickets, "3")
            let orderQuestion = await this.getElementTextFromAnArrayByIndex(QUESTIONS, 0);
            assert.equal(orderQuestion, base + " Attendee Age")
            let orderAnswer = await this.getElementTextFromAnArrayByIndex(ANSWERS, 0);
            assert.equal(orderAnswer, "15");
            let firstTicketFirstQuestion = await this.getElementTextFromAnArrayByIndex(QUESTIONS, 1);
            assert.equal(firstTicketFirstQuestion, base + " Yes & No question");
            let firstTicketFirstAnswer = await this.getElementTextFromAnArrayByIndex(ANSWERS, 1);
            assert.equal(firstTicketFirstAnswer, base + " FANTA");
            let secondTicketQuestion = await this.getElementTextFromAnArrayByIndex(QUESTIONS, 2);
            assert.equal(secondTicketQuestion, base + " Yes & No question");
            let secondTicketQAnswer = await this.getElementTextFromAnArrayByIndex(ANSWERS, 2);
            assert.equal(secondTicketQAnswer, base + " COCA COLA");
            let firstTicketSecondQuestion = await this.getElementTextFromAnArrayByIndex(QUESTIONS, 3);
            assert.equal(firstTicketSecondQuestion, base + " Yes & No question");
            let firstTicketSecondAnswer = await this.getElementTextFromAnArrayByIndex(ANSWERS, 3);
            assert.equal(firstTicketSecondAnswer, "Heineken Alcohol Free");

        }
    }
    module.exports = QuestionsResponseModal;