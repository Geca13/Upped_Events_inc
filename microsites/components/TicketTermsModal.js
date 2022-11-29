    const BasePage = require('../../BasePage');
    const {By} = require("selenium-webdriver");
    const assert = require("assert");
    const TICKETS_TERMS_MODAL = { id: "termsCond" };
    const TERMS_IMAGE = { xpath: "//div[@class='header']//img" }
    const TERMS_EVENT_NAME = { xpath: "//div[@class='content-title']" }
    const TERMS_TEXT_WRAPPER = { xpath: "//div[@class='content']" }
    const CLOSE_MODAL_BUTTON = { xpath: "//button[@type='button']" }


    class TicketTermsModal extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async checkFirstTicketTermsScenarioElementsAndClose(){

            await this.isDisplayed(TERMS_EVENT_NAME,5000);
            await this.termsModalIsDisplayed();
            await this.timeout(500);
            let textBox = await this.find(TERMS_TEXT_WRAPPER);
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
            await this.assertImagePlaceholderIsDisplayedInTheModal("https://events.stage.uppedevents.com/assets/images/placeholder2.png");
            await this.click(CLOSE_MODAL_BUTTON);
            await this.timeout(500)
            await this.termsModalIsNotDisplayed();

        }

        async assertImagePlaceholderIsDisplayedInTheModal(src){
            let imageSrc = await this.returnImgSrcAttribute(TERMS_IMAGE);
            assert.equal(imageSrc, src);
        }

        async termsModalIsDisplayed(){
            let openedModal = await this.returnElementsCount(TICKETS_TERMS_MODAL);
            assert.equal(openedModal, 1);
            await this.timeout(500)
        }

        async termsModalIsNotDisplayed(){
            let closedModal = await this.returnElementsCount(TICKETS_TERMS_MODAL);
            assert.equal(closedModal, 0);
            await this.timeout(500)
        }

        async assertTicketTermsImageSrcMatchBannerImageSrc(src){
            let termsImageSrc = await this.returnImgSrcAttribute(TERMS_IMAGE);
            assert.equal(termsImageSrc, src);
        }

    }
    module.exports = TicketTermsModal