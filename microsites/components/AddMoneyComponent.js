    const BasePage = require("../../BasePage");
    const assert = require('assert')
    const BALANCE_LABEL = { className: 'balance-label' };
    const BALANCE = { className: 'balance' };
    const LOGO_WALLET_IMAGE= { className: 'wallet-img' };
    const BALANCE_SUBTITLE = { className: 'balance-subtitle' };
    const ADD_FUNDS_INPUT = { xpath: "//div[@class='col-8']//input" };
    const ADD_MONEY_BUTTON = { xpath: "//div[@class='col-4']//button"};
    const LOGO_WALLET_TEXT = { xpath: "//div[@class='tab-info']//div"};
    const LOGO_WALLET_BALANCE = { xpath: "//div[@class='tab-info']//div[2]"};


    class AddMoneyComponent extends BasePage {
        constructor(driver) {
            super(driver);
        }
        async getBalanceLabelText(){
            return await this.getElementText(BALANCE_LABEL);
        }

        async getBalanceSubtitleText(){
            return await this.getElementText(BALANCE_SUBTITLE);
        }

        async getInputPlaceholder(){
            return await this.getPlaceholderTextFromInputByIndex(ADD_FUNDS_INPUT, 0);
        }

        async getButtonText(){
            return await this.getElementText(ADD_MONEY_BUTTON);
        }

        async getBalanceStringValue(){
            return await this.getElementText(BALANCE);
        }

        async getLogoBalanceStringValue(){
            return await this.getElementText(LOGO_WALLET_BALANCE);
        }

        async getLogoBalanceMoneyValue(){
            let balanceString = await this.getLogoBalanceStringValue();
            let balance = balanceString.substring(2, balanceString.length - 1);
            let parsed = parseFloat(balance);
            return parsed.toFixed(2);
        }

        async getBalanceMoneyValue(){
            let balanceString = await this.getBalanceStringValue();
            let balance = balanceString.substring(1);
            let parsed = parseFloat(balance);
            return parsed.toFixed(2);
        }

        async getLogoSrcText(){
            return await this.returnImgSrcAttribute(LOGO_WALLET_IMAGE);
        }

        async getLogoWalletText(){
            return await this.getElementText(LOGO_WALLET_TEXT);
        }

        async addMoneyComponentIsDisplayed(){
            await this.isDisplayed(ADD_MONEY_BUTTON, 5000);
        }

        async assertAddMoneyComponentElements(){
            await this.addMoneyComponentIsDisplayed()
            let logoSrc = await this.getLogoSrcText();
            assert.equal(logoSrc, "https://events.pr-tickets.uppedevents.com/assets/images/wallet.png");
            let logoText = await this.getLogoWalletText();
            assert.equal(logoText, "Upped Wallet");
            let logoBalanceValue = await this.getLogoBalanceMoneyValue();
            let balance = await this.getBalanceMoneyValue();
            assert.equal(logoBalanceValue, balance);
            let label = await this.getBalanceLabelText();
            assert.equal(label, "Your Current Wallet Balance is:");
            let subtitle = await this.getBalanceSubtitleText();
            assert.equal(subtitle, "You can add money to your digital wallet to make purchases at the event.");
            let placeholder = await this.getInputPlaceholder();
            assert.equal(placeholder, "Enter Value");
            let button = await this.getButtonText();
            assert.equal(button, "Add Money");

        }
    }
    module.exports = AddMoneyComponent;