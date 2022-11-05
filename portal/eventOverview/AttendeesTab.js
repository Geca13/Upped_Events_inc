    const BasePage = require('../../BasePage');
    const QuestionsResponseModal = require('../portalModals/QuestionsResponseModal')
    const assert = require('assert')
    const ATTENDEES_TABLE = { id: "dataTable" }
    const ATTENDEES_NAMES = { xpath: "//td[contains(@class, 'column-fullname')]//a[contains(@class, 'table-ticket-name')]//span" } //list
    const PURCHASED_TICKETS = { xpath: "//td[@class='column-totaltickets']//span" }
    const ATTENDEES_RESPONSES_COUNT = { xpath: "//td[contains(@class, 'column-totalquests')]//a[contains(@class, 'table-ticket-name')]//span" } //list



    class AttendeesTab extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async isOnAttendeesTab(){
            await this.isDisplayed(ATTENDEES_TABLE,35000);
        }

        
        async checkForTicketQuestionsResponsesForTheFirstTwoPurchases(base, index){
            await this.isOnAttendeesTab();
            await this.clickElementReturnedFromAnArray(ATTENDEES_RESPONSES_COUNT, index);
            let responses = new QuestionsResponseModal(this.driver)
            await responses.assertTicketsForFirstTwoPurchases(base);

        }

        async checkForTicketQuestionsResponsesForTheUpdated(base,index){
            await this.isOnAttendeesTab();
            await this.clickElementReturnedFromAnArray(ATTENDEES_RESPONSES_COUNT, index);
            let responses = new QuestionsResponseModal(this.driver)
            await responses.assertForTicketQuestionsResponsesForTheUpdated(base);
        }

        async getAlreadyPurchasedByCustomerFullName(customerFirstName, customerLastName){
            let fullName = customerFirstName + " " + customerLastName;
            let index = await this.returnIndexWhenTextIsKnown(ATTENDEES_NAMES, fullName);
            let purchasedTickets = await this.getElementTextFromAnArrayByIndex(PURCHASED_TICKETS, index);
            assert.notEqual(purchasedTickets, "0");
            return purchasedTickets;

        }
    }
    module.exports = AttendeesTab;