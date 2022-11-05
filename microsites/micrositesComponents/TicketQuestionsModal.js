    const BasePage = require('../../BasePage');
    const assert = require('assert');
    const { expect } = require('chai');
    const TICKETS_QUESTION_MODAL = { tagName:"ticket-questions-modal"}
    const HEADING = {  className: "heading"}
    const SUB_HEADING = { className: "sub-heading"}
    const TICKET_NAME = {  xpath: "//div[contains(@class, 'question-container')]//div[contains(@class, 'ticket-name')]"} //list
    const QUESTION_TITLE = { className: "question-title"} //list
    const TICKET_COUNT = { className: "question-label"} //list
    const RESPONSE_RADIO = { xpath: "//div[contains(@class, 'round')]//label" } //list
    const RESPONSE_RADIO_TEXT = { className: "text-title"} //list
    const FINISH_BUTTON = { className: "finish-btn"}
    const ANSWER_TEXTAREA = { tagName: "textarea"}
    const RESPONSES_CONTAINER = { className: "responses-container" }
    const STAFF_TICKET_NAME = {  xpath: "//div[contains(@class, 'questions-container')]//div[contains(@class, 'ticket-name')]"}
    const STAFF_DESCRIPTION = { xpath: "//div[contains(@class, 'questions-container')]//div[2]" }
    const POSITION_OPTIONS_LABEL = { xpath: "//div[contains(@class, 'questions-container')]//div[3]//div//span" }
    const POSITION_RADIO = { name: "staffFunction" }
    const DEPARTMENT_INPUT = { name: "others" }
    const NICKNAME_INPUT = { name: "nickname" }
    const ROLE_INPUT = { name: "departmentRole" }
    const POSITION_OTHER_LABEL = { xpath: "//div[contains(@class, 'questions-container')]//div[3]/span" }
    const POSITION_NICKNAME_LABEL = { xpath: "//div[contains(@class, 'questions-container')]//div[4]" }
    const POSITION_DEPARTMENT_LABEL = { xpath: "//div[contains(@class, 'm-t10')]" }

    class TicketQuestionsModal extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async questionsModalIsDisplayed(){
            await this.isDisplayed(HEADING,5000);
        }
        async answerSimpleYesNo(base,ticketOneName){
            await this.questionsModalIsDisplayed();
            let heading = await this.getElementText(HEADING);
            assert.equal(heading, "Before You Go...");
            let subHeading = await this.getElementText(SUB_HEADING);
            assert.equal(subHeading, "Please answer the following question");
            await this.driver.executeScript("document.getElementsByClassName('question-title')[0].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[0].style.visibility='hidden'");
            let ticketName = await this.getElementText(TICKET_NAME);
            assert.equal(ticketName, ticketOneName);
            await this.driver.executeScript("document.getElementsByClassName('question-title')[0].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[0].style.visibility='visible'");
            //await this.driver.executeScript("document.getElementsByClassName('required-que')[0].style.visibility='hidden'");
            let ticketQuestion = await this.getElementText(QUESTION_TITLE);
            assert.equal(ticketQuestion, base + " What do you prefer? *");
            let optionOne = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,0);
            assert.equal(optionOne, base + " FANTA");
            let optionTwo = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,1);
            assert.equal(optionTwo, base + " COCA COLA");
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,0);
            await this.click(FINISH_BUTTON);
        }

        async answerTicketQuestionWithTextInput(base,ticketOneName){
            await this.questionsModalIsDisplayed();
            let heading = await this.getElementText(HEADING);
            assert.equal(heading, "Before You Go...");
            let subHeading = await this.getElementText(SUB_HEADING);
            assert.equal(subHeading, "Please answer the following question");
            await this.driver.executeScript("document.getElementsByClassName('question-title')[0].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[0].style.visibility='hidden'");
            let ticketName = await this.getElementText(TICKET_NAME);
            assert.equal(ticketName, ticketOneName);
            await this.driver.executeScript("document.getElementsByClassName('question-title')[0].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[0].style.visibility='visible'");
            let ticketQuestion = await this.getElementText(QUESTION_TITLE);
            assert.equal(ticketQuestion, base + " What is your Age? *");
            let optionOne = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,0);
            assert.equal(optionOne, base + " Under 18");
            let optionTwo = await this.getElementTextFromAnArrayByIndex(RESPONSE_RADIO_TEXT,1);
            assert.equal(optionTwo, base + " 18 and Over");
            expect(await this.elementIsEnabled(ANSWER_TEXTAREA)).to.be.false;
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,0);
            expect(await this.elementIsEnabled(ANSWER_TEXTAREA)).to.be.true;
            await this.sentKeys(ANSWER_TEXTAREA, "17")
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
            await this.questionsModalIsDisplayed();
            let subHeading = await this.getElementText(SUB_HEADING);
            assert.equal(subHeading, "Please answer the following questions");
            let numberIndividualOfTickets = await this.returnElementsCount(TICKET_NAME);
            assert.equal(numberIndividualOfTickets, 2);
            let totalTickets = await this.returnElementsCount(TICKET_COUNT);
            assert.equal(totalTickets, 3);
            let totalQuestions = await this.returnElementsCount(QUESTION_TITLE);
            assert.equal(totalQuestions, 4);
            let totalInputs = await this.returnElementsCount(ANSWER_TEXTAREA);
            assert.equal(totalInputs, 5);
            let totalRadios = await this.returnElementsCount(RESPONSE_RADIO);
            assert.equal(totalRadios, 11);
            let ticketOneQuestionOne = await this.getElementTextFromAnArrayByIndex(TICKET_COUNT,0);
            assert.equal(ticketOneQuestionOne, "Ticket 1");
            let ticketOneQuestionTwo = await this.getElementTextFromAnArrayByIndex(TICKET_COUNT,1);
            assert.equal(ticketOneQuestionTwo, "Ticket 2");
            let ticketTwoQuestionOne = await this.getElementTextFromAnArrayByIndex(TICKET_COUNT,0);
            assert.equal(ticketTwoQuestionOne, "Ticket 1");


            let responseContainers = await this.returnElementsCount(RESPONSES_CONTAINER);
            assert.equal(responseContainers, 4);

            let firstContainerQuestion = await this.getElementTextFromAnArrayByIndex(QUESTION_TITLE,0);
            assert.equal(firstContainerQuestion, questionOne);
            let secondContainerQuestion = await this.getElementTextFromAnArrayByIndex(QUESTION_TITLE,1);
            assert.equal(secondContainerQuestion, questionTwo);
            let thirdContainerQuestion = await this.getElementTextFromAnArrayByIndex(QUESTION_TITLE,2);
            assert.equal(thirdContainerQuestion, questionTwo);
            let fourthContainerQuestion = await this.getElementTextFromAnArrayByIndex(QUESTION_TITLE,3);
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

            await this.driver.executeScript("document.getElementsByClassName('question-title')[0].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[0].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('question-label')[0].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('question-title')[1].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[1].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('question-label')[1].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('question-title')[2].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[2].style.visibility='hidden'");
            let ticketName = await this.getElementTextFromAnArrayByIndex(TICKET_NAME,0);
            assert.equal(ticketName, ticketOneName);

            await this.driver.executeScript("document.getElementsByClassName('question-label')[2].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('question-title')[3].style.visibility='hidden'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[3].style.visibility='hidden'");
            let ticketTwo = await this.getElementTextFromAnArrayByIndex(TICKET_NAME,1);
            assert.equal(ticketTwo, ticketThreeName);

            await this.driver.executeScript("document.getElementsByClassName('question-title')[0].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[0].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('question-label')[0].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('question-title')[1].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[1].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('question-label')[1].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('question-title')[2].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[2].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('question-label')[2].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('question-title')[3].style.visibility='visible'");
            await this.driver.executeScript("document.getElementsByClassName('responses-container')[3].style.visibility='visible'");

        }
        async answerTicketQuestionWithPerTicketQuestions(){
            await this.questionsModalIsDisplayed();
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,0)).to.be.false;
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,1)).to.be.false;
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,0);
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,0)).to.be.true;
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,1)).to.be.false;
            await this.sendKeysToElementReturnedFromAnArray(ANSWER_TEXTAREA, 0, "15");
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,2);
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,2)).to.be.false;
            await this.moveToElementFromArrayByIndex(ANSWER_TEXTAREA,3);
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,6);
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,3)).to.be.false;
            await this.moveToElementFromArrayByIndex(RESPONSE_RADIO,10);
            await this.clickElementReturnedFromAnArray(RESPONSE_RADIO,10);
            expect(await this.elementIsEnabledByIndexOfArray(ANSWER_TEXTAREA,4)).to.be.true;
            await this.sendKeysToElementReturnedFromAnArray(ANSWER_TEXTAREA, 4, "Heineken Alcohol Free");
            await this.click(FINISH_BUTTON);

        }

        async assertElementsOnStaffModal(staff) {
            await this.questionsModalIsDisplayed();
            let heading = await this.getElementText(HEADING);
            assert.equal(heading, "Before You Go...");
            let subHeading = await this.getElementText(SUB_HEADING);
            assert.equal(subHeading, "Please answer the following questions");
            let ticketName = await this.getElementText(STAFF_TICKET_NAME);
            expect(ticketName).to.equal(staff);
            let description = await this.getElementText(STAFF_DESCRIPTION);
            expect(description).to.equal("Which event department would you like to volunteer at? Department selections are not guaranteed, but we will try our best to match your preference (Choose one) *");
            let position = await this.getElementText(POSITION_OPTIONS_LABEL);
            expect(position).to.equal("new function");
            let departmentLabel = await this.getElementText(POSITION_OTHER_LABEL);
            expect(departmentLabel).to.equal("If Other what would it be? (Optional)");
            let nickname = await this.getElementText(POSITION_NICKNAME_LABEL);
            expect(nickname).to.equal("What is your preferred name/nickname? (Optional)");
            let role = await this.getElementText(POSITION_DEPARTMENT_LABEL);
            expect(role).to.equal("What is your department role? (Optional)");
            let departmentPlaceholder = await this.getPlaceholderTextFromInputByIndex(DEPARTMENT_INPUT, 0);
            expect(departmentPlaceholder).to.equal("Eg: Department");
            let nicknamePlaceholder = await this.getPlaceholderTextFromInputByIndex(NICKNAME_INPUT, 0);
            expect(nicknamePlaceholder).to.equal("Eg: Nickname");
            let rolePlaceholder = await this.getPlaceholderTextFromInputByIndex(ROLE_INPUT, 0);
            expect(rolePlaceholder).to.equal("Eg: Role Name");

        }

        async shouldAnswerStaffFormWithRandomButValidData(base){
            await this.click(POSITION_RADIO);
            await this.sentKeys(DEPARTMENT_INPUT, base + " department");
            await this.sentKeys(NICKNAME_INPUT, base + " nickname");
            await this.sentKeys(ROLE_INPUT, base + " role");
            await this.click(FINISH_BUTTON);
        }
    }
    module.exports = TicketQuestionsModal
