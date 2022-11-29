    const BasePage = require('../../../BasePage');
    const assert = require('assert')
    const Alerts = require('../../portalComponents/Alerts')
    const TableComponent = require('../../portalComponents/TableComponent')
    const DONATIONS_YES_RADIO = { xpath: "//label[@for='yes']"}
    const DONATIONS_NO_RADIO = { xpath: "//label[@for='no']"}
    const ADD_DONATION_BUTTON = { xpath: "//a[contains(@class,'add-btn')]"}


    class DonationsPage extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async returnTable(){
            let table = new TableComponent(this.driver);
            await table.tableIsDisplayed();
            return table;
        }
        
        async donationPageIsVisible(){
            await this.isDisplayed(DONATIONS_YES_RADIO,5000);
        }
        
        async activateDonationsOnEvent(){
            await this.donationPageIsVisible();
            await this.click(DONATIONS_YES_RADIO);
            await this.isDisplayed(ADD_DONATION_BUTTON, 5000);
        }
        
        async clickAddDonationButton(){
            await this.isDisplayed(ADD_DONATION_BUTTON,5000);
            await this.click(ADD_DONATION_BUTTON)
        }

        async clickEditOrganizationByOrganizationName(organizationName){
            let table = await this.returnTable();
            await table.clickEditTableRowByObjectName(organizationName);
        }


    }
    module.exports = DonationsPage;