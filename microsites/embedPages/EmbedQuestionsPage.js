const BasePage = require('../../BasePage')
const assert = require("assert");
const {expect} = require("chai");
const QUESTION_PAGE = { tagName: "app-embed-ticketing-questions" }
const QUESTION_PAGE_HEADER = { className: "content-header" }
const QUESTION_TEXT = { className: "ticket-name" } //if general present start index 1
const GENERAL_QUESTION_TICKET = { className: "question-title"} //list
const TICKET_NAME = { className: "question-title"} //list
const QUESTION_ANSWERING_FORM = { className: "question-text" }
const RESPONSE_RADIO = { xpath: "//div[contains(@class, 'round')]//label" } //list
const RESPONSE_RADIO_TEXT = { className: "text-title"} //list
const ANSWER_TEXTAREA = { tagName: "textarea"}
const FINISH_BUTTON = { className: "finish-btn"}
const TICKET_SCROLLER_BUTTON = { xpath: "//div[contains(@class, 'selection-container')]//div[contains(@class, 'box-container')]" } //list



    class EmbedQuestionsPage extends BasePage{
        constructor(driver) {
            super(driver);
        }

        async isOnTicketQuestionPage(){
            await this.isDisplayed(QUESTION_PAGE,5000)
        }

        async answerSimpleYesNo(base,ticketOneName){

            let subHeading = await this.getElementText(QUESTION_PAGE_HEADER);
            assert.equal(subHeading, "Please answer the following questions");
            let ticketName = await this.getElementText(TICKET_NAME);
            assert.equal(ticketName, "1 Question - " + ticketOneName);
            let ticketQuestion = await this.getElementText(QUESTION_ANSWERING_FORM);
            assert.equal(ticketQuestion, base + " What do you prefer? *");
            let optionOne = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,0);
            assert.equal(optionOne, base + " FANTA");
            let optionTwo = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,1);
            assert.equal(optionTwo, base + " COCA COLA");
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,0);
            await this.click(FINISH_BUTTON);
        }

        async answerTicketQuestionWithTextInput(base,ticketOneName) {
            let subHeading = await this.getElementText(QUESTION_PAGE_HEADER);
            assert.equal(subHeading, "Please answer the following questions");
            let ticketName = await this.getElementText(TICKET_NAME);
            assert.equal(ticketName, "1 Question - " + ticketOneName);
            let ticketQuestion = await this.getElementText(QUESTION_ANSWERING_FORM);
            assert.equal(ticketQuestion, base + " What is your Age? *");
            let optionOne = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT, 0);
            assert.equal(optionOne, base + " Under 18");
            let optionTwo = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT, 1);
            assert.equal(optionTwo, base + " 18 and Over");
            expect(await this.elementIsEnabled(ANSWER_TEXTAREA)).to.be.false;
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO, 0);
            expect(await this.elementIsEnabled(ANSWER_TEXTAREA)).to.be.true;
            await this.sentKeys(ANSWER_TEXTAREA, "17")
            await this.moveToElement(FINISH_BUTTON)
            await this.click(FINISH_BUTTON);

        }

        async assertFormAndInputAndOption(base,ticketOneName, ticketThreeName){
            const questionOne = base + " What is your Age? *";
            const questionTwo = base + " What do you prefer? *";
            const optionOne = base + " Under 18";
            const optionTwo = base + " 18 and Over";
            const optionThree = base + " FANTA";
            const optionFour= base + " COCA COLA";
            const optionFive= base + " OTHER";

            let subHeading = await this.getElementText(QUESTION_PAGE_HEADER);
            assert.equal(subHeading, "Please answer the following questions");
            let totalQuestions = await this.returnElementsCount(QUESTION_ANSWERING_FORM);
            assert.equal(totalQuestions, 4);
            let totalInputs = await this.returnElementsCount(ANSWER_TEXTAREA);
            assert.equal(totalInputs, 5);
            let totalRadios = await this.returnElementsCount(RESPONSE_RADIO);
            assert.equal(totalRadios, 11);
            let ticketOneQuestionOne = await this.getElementTextFromAnArrayByIndex(QUESTION_TEXT,0);
            assert.equal(ticketOneQuestionOne, "General Question");
            let ticketOneQuestionTwo = await this.getElementTextFromAnArrayByIndex(QUESTION_TEXT,1);
            assert.equal(ticketOneQuestionTwo, "1 Ticket 1 - 660880T1");
            let ticketTwoQuestionOne = await this.getElementTextFromAnArrayByIndex(QUESTION_TEXT,2);
            assert.equal(ticketTwoQuestionOne, "2 Ticket 2 - 660880T3");


            let responseContainers = await this.returnElementsCount(QUESTION_ANSWERING_FORM);
            assert.equal(responseContainers, 4);

            let firstContainerQuestion = await this.getElementTextFromAnArrayByIndex(QUESTION_ANSWERING_FORM,0);
            assert.equal(firstContainerQuestion, questionOne);
            let secondContainerQuestion = await this.getElementTextFromAnArrayByIndex(QUESTION_ANSWERING_FORM,1);
            assert.equal(secondContainerQuestion, questionTwo);
            let thirdContainerQuestion = await this.getElementTextFromAnArrayByIndex(QUESTION_ANSWERING_FORM,2);
            assert.equal(thirdContainerQuestion, questionTwo);
            let fourthContainerQuestion = await this.getElementTextFromAnArrayByIndex(QUESTION_ANSWERING_FORM,3);
            assert.equal(fourthContainerQuestion, questionTwo);

            let firstQuestionFirstOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,0);
            assert.equal(firstQuestionFirstOption, optionOne);
            let firstQuestionSecondOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,1);
            assert.equal(firstQuestionSecondOption, optionTwo);

            let secondQuestionFirstOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,2);
            assert.equal(secondQuestionFirstOption, optionThree);
            let secondQuestionSecondOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,3);
            assert.equal(secondQuestionSecondOption, optionFour);
            let secondQuestionThirdOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,4);
            assert.equal(secondQuestionThirdOption, optionFive);

            let thirdQuestionFirstOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,5);
            assert.equal(thirdQuestionFirstOption, optionThree);
            let thirdQuestionSecondOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,6);
            assert.equal(thirdQuestionSecondOption, optionFour);
            let thirdQuestionThirdOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,7);
            assert.equal(thirdQuestionThirdOption, optionFive);

            let fourthQuestionFirstOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,8);
            assert.equal(fourthQuestionFirstOption, optionThree);
            let fourthQuestionSecondOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,9);
            assert.equal(fourthQuestionSecondOption, optionFour);
            let fourthQuestionThirdOption = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,10);
            assert.equal(fourthQuestionThirdOption, optionFive);


        }
        async answerTicketQuestionWithPerTicketQuestions(){
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,0)).to.be.false;
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,1)).to.be.false;
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,0);
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,0)).to.be.true;
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,1)).to.be.false;
            await this.sendKeysToElementReturnedFromAnArray(ANSWER_TEXTAREA, 0, "15");
            await this.clickElementReturnedFromAnArray(TICKET_SCROLLER_BUTTON,1);
            await this.timeout(2000)
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,2);
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,2)).to.be.false;
            await this.moveToElementFromArrayByIndex(ANSWER_TEXTAREA,3);
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,6);
            await this.clickElementReturnedFromAnArray(TICKET_SCROLLER_BUTTON,2);
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,3)).to.be.false;
            await this.moveToElementFromArrayByIndex(RESPONSE_RADIO,10);
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,10);
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,4)).to.be.true;
            await this.sendKeysToElementReturnedFromAnArray(ANSWER_TEXTAREA, 4, "Heineken Alcohol Free");
            await this.moveToElement(FINISH_BUTTON)
            await this.isDisplayed(FINISH_BUTTON, 5000)
            await this.click(FINISH_BUTTON);

        }

        }
    module.exports = EmbedQuestionsPage