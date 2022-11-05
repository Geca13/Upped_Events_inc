    const BasePage = require('../../../BasePage');
    const COLOR_PICKER = { xpath: "//input[@type='color']" } //list
    const NEXT_BUTTON = { xpath: "//a[text()='Next']"}
    const WEBSITE_INPUT = { className: "origin-input" };
    const GENERATE_BUTTON = { xpath: "//a[text()='Generate']"};
    const CLOSE_POPUP_BUTTON = { className: "popup-close" };
    const COPY_EMBED_ICON = { className: "icon-copy" };
    const TICKETING_ONLY_BUTTON = { xpath: "//*[text()=' Ticketing Only ']"}



    class EmbeddingPage extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async isOnEmbeddingTab(){
            await this.isDisplayed(COLOR_PICKER, 5000);
        }

        async sentKeysToColorInputByIndex(index, hex){
            await this.timeout(500)
            await this.sendKeysToElementReturnedFromAnArray(COLOR_PICKER,index, hex);
            await this.timeout(500)
        }

        async originWebsite(){
            await this.clearInputField(WEBSITE_INPUT);
            await this.sentKeys(WEBSITE_INPUT,"https://dummy.dev.uppedevents.com/");
        }

        async setEmbedViewForEvent(){
            await this.isOnEmbeddingTab();
            await this.clickElementReturnedFromAnArray(COLOR_PICKER, 0);
            await this.sentKeysToColorInputByIndex(0, "#ed05f5");
            await this.clickElementReturnedFromAnArray(COLOR_PICKER, 1);
            await this.timeout(500)
            await this.sentKeysToColorInputByIndex(1, "#0595f5");
            await this.click(TICKETING_ONLY_BUTTON);
            await this.timeout(1000);
            await this.click(NEXT_BUTTON);
            await this.timeout(1000);
            await this.scrollToView(WEBSITE_INPUT);
            await this.moveToElement(WEBSITE_INPUT);
            await this.originWebsite();
            await this.click(GENERATE_BUTTON);
            await this.isDisplayed(COPY_EMBED_ICON, 5000);
            await this.click(COPY_EMBED_ICON);
            await this.timeout(2000);
            await this.click(CLOSE_POPUP_BUTTON);
            await this.timeout(2000);

        }

    }
    module.exports = EmbeddingPage;