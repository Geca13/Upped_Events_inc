    const BasePage = require("../../BasePage");
    const Alerts = require('../../Validations&Alerts/Alerts')
    const PAY_CONTAINER = { className: 'pay-container' };
    const PAY_TABS = { className: 'box-container' };
    const SAVED_CARDS_HEADER = { xpath: "//*[text()='Saved Cards']"};
    const PAY_WITH_SERVICE_HEADER = { xpath: "//*[text()='Pay with Other Service']"};
    const PAY_WITH_SERVICE_TAB = { xpath: "//*[text()='Pay with Card or Service']"};
    const PAY_WITH_NEW_CARD_TAB = { xpath: "//*[text()='Pay with New Card']"};
    const PAY_WITH_WALLET_OPTION = { xpath: "//*[text()=' Pay with wallet ']"};
    const PAY_WITH_WALLET_BUTTON = { xpath: "//*[text()='Pay with wallet']"};
    const PAY_WITH_CARD_BUTTON = { xpath: "//*[text()='Pay with card']"};
    const APPLY_DISCOUNT_BUTTON = { xpath: "//*[text()='Apply']"};
    const DISCOUNT_CODE_LABEL = { xpath: "//*[text()='Discount Code ']"};
    const DISCOUNT_CODE_INPUT = { className: 'height'};
    const SAVED_CARDS_LIST = { className: 'user-card'}; //list
    const INVALID_PROMO_CODE_TRIANGLE = { className: 'fa-exclamation-triangle' }

    class PayTab extends BasePage {
        constructor(driver) {
            super(driver);
        }
        async savedCardsHeaderIsPresent() {
            return await this.isDisplayed(SAVED_CARDS_HEADER,5000);
            await this.timeout(1000);
        }
        async clickFirstCard(){
            await this.click(SAVED_CARDS_LIST);
        }
        async clickPayWithNewCardTab(){
            await this.click(PAY_WITH_NEW_CARD_TAB);
        }
        async clickPayWithCardOrServiceTab(){
            await this.click(PAY_WITH_SERVICE_TAB);
        }
        async clickPayWithCardButton(){
            await this.timeout(500);
            await this.click(PAY_WITH_CARD_BUTTON);
        }
        async clickPayWithWalletOption(){

            await this.click(PAY_WITH_WALLET_OPTION);
        }
        async clickPayWithWalletButton(){
            await this.timeout(500);
            await this.click(PAY_WITH_WALLET_BUTTON);
        }
        async payWithWalletButtonIsDisplayed() {
            return await this.isDisplayed(PAY_WITH_WALLET_BUTTON,5000);
        }
        async payWithCardButtonIsDisplayed() {
            return await this.isDisplayed(PAY_WITH_CARD_BUTTON,5000);
        }
        async invalidPromoCodeIsDisplayed() {
            return await this.isDisplayed(INVALID_PROMO_CODE_TRIANGLE,5000);
        }
        async clickApplyDiscountButton(){
            await this.timeout(500);
            await this.click(APPLY_DISCOUNT_BUTTON);
        }
        async clearDiscountField(DISCOUNT_CODE_INPUT){
            await this.clearInputField();
        }
        async enterPromotionCode(promoCode){
            await this.sentKeys(DISCOUNT_CODE_INPUT,promoCode);
            await this.timeout(500);
        }

        async promotionForStaffErrorMessageIsDisplayed(){
            let alert = new Alerts(this.driver)
            await alert.errorAlertIsDisplayed("Unfortunately, it appears that your account is not eligible for one or more of the tickets in your cart. " +
                "If you believe this is an error, please ensure that you are logged in with the appropriate email address and" +
                "/or reach out to null at null to discuss further.")
        }

    }

    module.exports = PayTab;