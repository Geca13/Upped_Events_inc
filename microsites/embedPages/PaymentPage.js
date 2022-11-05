    const BasePage = require('../../BasePage');
    const assert = require('assert');
    const NewCardComponent = require('../../microsites/components/NewCardComponent');
    const CARD_SERVICE_TAB = { xpath: "//*[text()='Pay with Card or Service']"}
    const NEW_CARD_TAB = { xpath: "//*[text()='Pay with New Card']"}
    const DISCOUNT_LABEL = { xpath: "//div[contains(@class , 'form-group')]//label" }
    const DISCOUNT_INPUT = { className: "discount"}
    const APPLY_DISCOUNT_BUTTON = { className: "apply-btn"}
    const PAY_WALLET_BUTTON = { id: "payTitle"}
    const SAVED_CARD = { className: "user-card" } //list
    const TABS = { xpath: "//div[contains(@class , 'pay-container')]//div[@class='box-container']" }
    const SECTION_HEADERS = { xpath: "//div[@class='title']" }
    const SELECTED_CARD = { xpath: "//div[contains(@class , 'selected-user-card')]"}


    class PaymentPage extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async isAtPaymentPage(){
            await this.isDisplayed(CARD_SERVICE_TAB, 5000);
        }
      
        async clickPayWithWalletButton(){
            await this.click(PAY_WALLET_BUTTON);
            await this.timeout(500);
        }

        async clickNewCardTab(){
            await this.isAtPaymentPage();
            await this.click(NEW_CARD_TAB);
        }
        
        async isOnPayWithNewCardTab(){
            let newCardComponent = new NewCardComponent(this.driver);
            await newCardComponent.isAtNewCardTab();
        }

        async confirmElementsOnPayWithCardOrServiceTab(){
            await this.isAtPaymentPage();
            await this.timeout(1000);
            let tabs = await this.returnElementsCount(TABS);
            assert.equal(tabs, 2);
            let cards = await this.returnElementsCount(SAVED_CARD);
            assert.equal(cards, 0);
            let firstTab = await this.getElementTextFromAnArrayByIndex(TABS, 0);
            let secondTab = await this.getElementTextFromAnArrayByIndex(TABS, 1);
            assert.equal(firstTab, "Pay with Card or Service");
            assert.equal(secondTab, "Pay with New Card");
            let firstTitle = await this.getElementTextFromAnArrayByIndex(SECTION_HEADERS, 0);
            let secondTitle = await this.getElementTextFromAnArrayByIndex(SECTION_HEADERS, 1);
            assert.equal(firstTitle, "Saved Cards");
            assert.equal(secondTitle, "Pay with Other Service");
            let payWithWalletButton = await this.getElementText(PAY_WALLET_BUTTON);
            assert.equal(payWithWalletButton, "Pay with wallet");
            let discountLabel = await this.getElementTextFromAnArrayByIndex(DISCOUNT_LABEL,0);
            assert.equal(discountLabel, "Discount Code");
            let applyDiscountButton = await this.getElementText(APPLY_DISCOUNT_BUTTON);
            assert.equal(applyDiscountButton, "Apply");
            let inputs = await this.returnElementsCount(DISCOUNT_INPUT);
            assert.equal(inputs, 1);

        }

        async confirmElementsOnPayWithNewCardTab(){
            let newCardComponent = new NewCardComponent(this.driver);
            await newCardComponent.isAtNewCardTab();
            await newCardComponent.assertFieldsLabelsOnEmbed();
            await newCardComponent.assertFieldsAreDisplayed();
            await newCardComponent.assertCountryOptionsAndSaveButtonNames();
        }

        async fillValidDataOnCardOnTheEmbed(firstName,lastName){
            let newCard = new NewCardComponent(this.driver);
            await newCard.fillNewCardWithVisaData(firstName, lastName);
            await newCard.clickEmbedSaveCardButton();
        }

        async clickSavedCardByIndex(index){
            await this.clickElementReturnedFromAnArray(SAVED_CARD,index);
            await this.isDisplayed(SELECTED_CARD, 5000);
        }

        async getSelectedCardData(){
            let brand = await this.getChildTextByParentIndexAndChildIndex(SELECTED_CARD,0, 0);
            let number = await this.getChildTextByParentIndexAndChildIndex(SELECTED_CARD,0, 1);
            return brand + " " + number;
        }

      
    }
    module.exports = PaymentPage;