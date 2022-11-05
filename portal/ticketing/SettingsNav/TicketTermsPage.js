    const BasePage = require('../../../BasePage');
    const { By , Key } = require("selenium-webdriver");
    const assert = require('assert')
    const TEXT_SELECTOR_PARAGRAPH = { xpath: "//*[text()='Paragraph']"}
    const TEXT_SELECTOR_HEADING_1 = { xpath: "//*[text()='Heading 1']"}
    const TEXT_SELECTOR_HEADING_2 = { xpath: "//*[text()='Heading 2']"}
    const TEXT_SELECTOR_HEADING_3 = { xpath: "//*[text()='Heading 3']"}
    const TEXT_STYLING_BUTTONS = { xpath: "//button[@type='button']"} //list of 11
    const TICKET_TERMS_INPUT = { xpath: "//div[@role='textbox']" }
    const SAVE_TERMS_BUTTON = { xpath: "//*[text()='Save']"}


    class TicketTermsPage extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async clearTextArea(){
            await this.clearInputField(TICKET_TERMS_INPUT);
            await this.timeout(1500);
        }

        async completePasteAndGetText(){
            await this.timeout(500);
            await this.sentKeys(TICKET_TERMS_INPUT, Key.CONTROL + "v" );
            await this.timeout(10000);
        }

        async termsPageIsDisplayed(){
            await this.isDisplayed(TICKET_TERMS_INPUT,5000);
        }
        async heading3IsDisplayed(){
            await this.isDisplayed(TEXT_SELECTOR_HEADING_3,5000);
        }
        async typeInInput(term){
            await this.sentKeys(TICKET_TERMS_INPUT,term)
        }
        async clickFontStyleDropdown(){
            await this.clickElementReturnedFromAnArray(TEXT_STYLING_BUTTONS,1)
        }
        async clickBoldStyleIcon(){
            await this.clickElementReturnedFromAnArray(TEXT_STYLING_BUTTONS,6)
        }
        async clickItalicStyleIcon(){
            await this.clickElementReturnedFromAnArray(TEXT_STYLING_BUTTONS,7)
        }
        async clickParagraph(){
            await this.click(TEXT_SELECTOR_PARAGRAPH);
        }
        async clickHeading1(){
            await this.click(TEXT_SELECTOR_HEADING_1);
        }
        async clickHeading2(){
            await this.click(TEXT_SELECTOR_HEADING_2);
        }
        async clickHeading3(){
            await this.click(TEXT_SELECTOR_HEADING_3);
        }
        async clickSaveTermButton(){
            await this.click(SAVE_TERMS_BUTTON)
        }

        async createBoldHeader1Term(){
            await this.clickFontStyleDropdown();
            await this.heading3IsDisplayed();
            await this.clickHeading1();
            await this.clickBoldStyleIcon();
            await this.typeInInput("Bold Heading 1")
            await this.clickEnterKey(TICKET_TERMS_INPUT)
        }

        async createItalicParagraph(){
            await this.clickFontStyleDropdown();
            await this.heading3IsDisplayed();
            await this.clickParagraph();
            await this.clickItalicStyleIcon();
            await this.typeInInput("Italic Paragraph");
            await this.clickEnterKey(TICKET_TERMS_INPUT)
        }

        async saveTerms(){
            await this.createBoldHeader1Term();
            await this.createItalicParagraph();
            await this.clickSaveTermButton();
            await this.timeout(1000);
        }

        async assertTicketTermsIsEmpty(){
            await this.timeout(500);
            let emptyTextBox = await this.getElementText(TICKET_TERMS_INPUT);
            assert.equal(emptyTextBox, "");
        }

        async assertElementsInTheTermsBoxAfterSavingTerms(){
            let textBox = await this.find(TICKET_TERMS_INPUT);
            let header1 = await textBox.findElement(By.css("*:first-child"));
            let headerTag = await header1.getTagName()
            assert.equal(headerTag, "h2");
            let strongHeader = await header1.findElement(By.css("*:first-child"));
            let strongTag = await strongHeader.getTagName()
            assert.equal(strongTag, "strong");
            let paragraph = await textBox.findElement(By.css("*:nth-child(2)"));
            let paragraphTag = await paragraph.getTagName()
            assert.equal(paragraphTag, "p");
            let italic = await paragraph.findElement(By.css("*:first-child"));
            let italicTag = await italic.getTagName();
            assert.equal(italicTag, "i");
            let strongItalic = await italic.findElement(By.css("*:first-child"));
            let strongItalicTag = await strongItalic.getTagName();
            assert.equal(strongItalicTag, "strong");
            let strongHeaderText = await strongHeader.getText();
            assert.equal(strongHeaderText, "Bold Heading 1");
            let strongItalicText = await strongItalic.getText();
            assert.equal(strongItalicText, "Italic Paragraph");

        }
    }
    module.exports = TicketTermsPage;