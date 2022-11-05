    const BasePage = require('../../BasePage');
    const ADD_MONEY_TAB = { xpath: "//*[text()='Add Money to Wallet']"}
    const DONATE_TAB = { xpath: "//*[text()='Donate']"}

    class ExtrasPage extends BasePage {
        constructor(driver) {
            super(driver);
        }
        async isAtExtrasPage(){
            await this.isDisplayed(ADD_MONEY_TAB, 5000);
        }
        async clickAddMoneyTab(){
            await this.click(ADD_MONEY_TAB);
        }
        async clickDonateTab(){
            await this.click(DONATE_TAB);
        }

    }

    module.exports = ExtrasPage;