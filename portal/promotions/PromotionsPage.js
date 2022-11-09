    const BasePage = require('../../BasePage');
    const assert = require('assert');
    const Alerts = require('../portalComponents/Alerts')
    const ADD_PROMOTION_BUTTON = { xpath: "//*[text()='Add']"}
    const DEACTIVATED_PROMOTION_TOGGLE = {className: 'lc_off' }
    const ACTIVATED_PROMOTION_TOGGLE = {className: 'lc_on' }
    const PROMOTION_NAME = { xpath: "//td[contains(@class, 'column-name')]//span" };
    const PROMOTION_DESCRIPTION = { xpath: "//td[contains(@class, 'column-name')]//p" };
    const PROMOTION_TICKET = { xpath: "//td[contains(@class, 'column-ticketname')]//span" };
    const PROMOTION_QUANTITY = { xpath: "//td[contains(@class, 'column-quantity')]//span" };
    const PROMOTION_ORIGINAL_PRICE = { xpath: "//td[contains(@class, 'column-ticketprice')]//span" };
    const PROMOTION_ADJUSTMENT = { xpath: "//td[contains(@class, 'column-adjustment')]//span" };
    const PROMOTION_NEW_PRICE = { xpath: "//td[contains(@class, 'column-discountedprice')]//span" };
    const PROMOTION_START_DATE = { xpath: "//td[contains(@class, 'column-startdate')]" };
    const PROMOTION_END_DATE = { xpath: "//td[contains(@class, 'column-enddate')]" };
    const EDIT_PROMO_BUTTON = { xpath: "//a[@class='text-second']//span[contains(@class, 'icon-edit')]"}
    const PROMOTIONS_HEADER = { xpath: "//*[text()='Promotions']"}



    class PromotionsPage extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async promotionsHeaderIsVisible(){
            await this.isDisplayed(PROMOTIONS_HEADER,5000)
        }
        
        
        async clickAddPromotionButton(){
            await this.timeout(500);
            await this.addPromotionButtonIsVisible()
            await this.timeout(500);
            await this.click(ADD_PROMOTION_BUTTON)
        }
        async addPromotionButtonIsVisible(){
            await this.timeout(500);
            await this.isDisplayed(ADD_PROMOTION_BUTTON, 5000);
            await this.timeout(2000);
        }
        


        async assertThe$PromotionIsSavedCorrectOnPromotionsPage(promotion){
            await this.isDisplayed(PROMOTION_NAME,5000);
            let i = await this.returnIndexWhenTextIsKnown(PROMOTION_NAME,promotion[0]);
            await this.timeout(500);
            let namePromo = await this.getElementTextFromAnArrayByIndex(PROMOTION_NAME,i);
            let extDescription = await this.getElementTextFromAnArrayByIndex(PROMOTION_DESCRIPTION,i);
            let nameTicket = await this.getElementTextFromAnArrayByIndex(PROMOTION_TICKET, i);
            let promoQty = await this.getElementTextFromAnArrayByIndex(PROMOTION_QUANTITY, i);
            let orPrice = await this.getElementTextFromAnArrayByIndex(PROMOTION_ORIGINAL_PRICE, i);
            let adjustment = await this.getElementTextFromAnArrayByIndex(PROMOTION_ADJUSTMENT, i);
            let priceNew = await this.getElementTextFromAnArrayByIndex(PROMOTION_NEW_PRICE, i);
            let start = await this.getElementTextFromAnArrayByIndex(PROMOTION_START_DATE, i);
            let end = await this.getElementTextFromAnArrayByIndex(PROMOTION_END_DATE, i);
            assert.equal(namePromo, promotion[0]);
            assert.equal(extDescription, "Single general promo code");
            assert.equal(nameTicket, promotion[2]);
            assert.equal(promoQty, promotion[3]);
            assert.equal(orPrice, promotion[4]);
            assert.equal(adjustment, promotion[5]);
            assert.equal(priceNew, promotion[6]);
            assert.equal(start, promotion[7]);
            assert.equal(end, promotion[8]);
        }

        async findPromotionByNameAndClickUpdateButton(promoName){
            let i = await this.returnIndexWhenTextIsKnown(PROMOTION_NAME,promoName);
            await this.isDisplayed(EDIT_PROMO_BUTTON,5000);
            await this.clickElementReturnedFromAnArray(EDIT_PROMO_BUTTON, i);
        }

        async assertDataForPromotionWithThreeTicketsAndLimitOnTwoWithoutDateTime(promoName, ticketName,ticketPrice){
            await this.isDisplayed(PROMOTION_NAME,5000);
            let i = await this.returnIndexWhenTextIsKnown(PROMOTION_NAME,promoName);
            await this.timeout(550);
            let namePromo = await this.getElementTextFromAnArrayByIndex(PROMOTION_NAME,i);
            let extDescription = await this.getElementTextFromAnArrayByIndex(PROMOTION_DESCRIPTION,i);
            let nameTicket = await this.getElementTextFromAnArrayByIndex(PROMOTION_TICKET, i);
            let promoQty = await this.getElementTextFromAnArrayByIndex(PROMOTION_QUANTITY, i);
            let orPrice = await this.getElementTextFromAnArrayByIndex(PROMOTION_ORIGINAL_PRICE, i);
            let priceNew = await this.getElementTextFromAnArrayByIndex(PROMOTION_NEW_PRICE, i);
            assert.equal(namePromo, promoName);
            assert.equal(extDescription, "Single general promo code");
            assert.equal(nameTicket, ticketName);
            assert.equal(promoQty, "20");
            assert.equal(orPrice, "$"+parseFloat(ticketPrice).toFixed(2));
            let discountedPriceForFirstTicket = parseFloat(ticketPrice) - (parseFloat(ticketPrice) * (75/100));
            let discountedToFixed = discountedPriceForFirstTicket.toFixed(2);
            assert.equal(priceNew, "$"+discountedToFixed.toString());

        }

        async disablePromotionByPromoName(promoName){
            let i = await this.returnIndexWhenTextIsKnown(PROMOTION_NAME,promoName);
            await this.clickElementReturnedFromAnArray(ACTIVATED_PROMOTION_TOGGLE, i);
            let alert = new Alerts(this.driver);
            await alert.updatedSuccessMessageIsShown("Promotion updated successfully!");
            await this.timeout(500);
        }

        async enablePromotionByPromoName(promoName){
            let i = await this.returnIndexWhenTextIsKnown(PROMOTION_NAME,promoName);
            await this.clickElementReturnedFromAnArray(DEACTIVATED_PROMOTION_TOGGLE, i);
            let alert = new Alerts(this.driver);
            await alert.updatedSuccessMessageIsShown("Promotion updated successfully!");
            await this.timeout(500);
        }

    }
    module.exports = PromotionsPage;
