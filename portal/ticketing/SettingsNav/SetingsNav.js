    const BasePage = require('../../../BasePage');
    const TAXES_AND_FEES_SUBNAV = { xpath: "//*[text()='Taxes & Fees']"}
    
    class SettingsNav extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async taxesAndFeesSubTabIsDisplayed(){
            await this.timeout(500)
            await this.isDisplayed(TAXES_AND_FEES_SUBNAV,5000)
        }
        async clickTaxesAndFeesSubNav(){
            await this.click(TAXES_AND_FEES_SUBNAV,5000)
        }
      

    }
    module.exports = SettingsNav;