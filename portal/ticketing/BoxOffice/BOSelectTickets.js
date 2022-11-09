    const BasePage = require('../../../BasePage');
    const assert = require('assert')
    const { expect }= require('chai');
    const Alerts = require('../../portalComponents/Alerts')
    const OverrideTicketModal = require('./OverrideTicketModal');
    const TableComponent = require('../../portalComponents/TableComponent');
    const BOStepper = require('../BoxOffice/BOStepper');
    const TICKET_GROUPS_TABS = { xpath: "//a[contains(@class, 'single-group')]" }
    const TICKETS_GROUPS_TICKET_COUNT = { xpath: "//a[contains(@class, 'single-group')]//span" }
    const COLUMN_TICKET_NAME = { className: "table-ticket-name" } //list
    const COLUMN_PRICE = { xpath: "//td[contains(@class, 'column-price')]//span" } //list
    const COLUMN_DESCRIPTION = { xpath: "//td[contains(@class, 'column-description')]//span//span" } //list
    const COLUMN_QUANTITY = { className: "column-quantity" } //list
    const COLUMN_SOLD = { className: "column-sold" } //list
    const COLUMN_SELECTS = { className: "numeric-dropdown" } //list
    const OVERRIDEN_TICKET_PRICE = { xpath: "//span[contains(@class, 'overriden')]" }
    const COLUMN_OVERRIDE = { className: "text-second" } //list
    const SAVE_BUTTON = { xpath: "//button[contains(@class, 'btn-purple')]"};




    class BOSelectTickets extends BasePage{
        constructor(driver) {
            super(driver);
        }

        async openBoxOfficeDirectly(eventId){
            await this.visit("https://dev.portal.uppedevents.com/dashboard/event/" + eventId + "/ticket/box-office")
            await this.isOnBoxOfficePage();
        }

        async isOnBoxOfficePage(){
            await this.isDisplayed(SAVE_BUTTON,5000);
        }

        async returnTotalTicketsInBox(){
            return await this.returnElementsCount(COLUMN_TICKET_NAME);
        }

        async assertTicketsCount(tickets){
            let newList = await this.returnTotalTicketsInBox();
            assert.equal(newList , parseInt(tickets)-1)
        }

        async assertTicketDataByTicketName(ticketName,ticketPrice, ticketQuantity){

            await this.isOnBoxOfficePage();
            let i = await this.returnIndexWhenTextIsKnown(COLUMN_TICKET_NAME, ticketName);
            let ticketOne = await this.getTextFromElementOfArray(COLUMN_TICKET_NAME,i);
            let description = await this.getTextFromElementOfArray(COLUMN_DESCRIPTION,i);
            let price = await this.getTextFromElementOfArray(COLUMN_PRICE,i);
            let quantity = await this.getTextFromElementOfArray(COLUMN_QUANTITY,i);
            let sold = await this.getTextFromElementOfArray(COLUMN_SOLD,i);
            let selectValue = await this.getEnteredTextInTheInputByIndex(COLUMN_SELECTS,i);
            expect(ticketOne).to.equal(ticketName)
            expect(description).to.equal(ticketName + " description")
            expect(price).to.equal("$" + ticketPrice)
            expect(quantity).to.equal(ticketQuantity.toString())
            expect(sold).to.equal("0")
            expect(selectValue).to.equal("0")

        }

        async assertTicketsOrder(ticketOneName, ticketTwoName, ticketThreeName, ticketFourName, staffTicket){
            let tickets = await this.findAll(COLUMN_TICKET_NAME);
            assert.equal(await tickets[0].getText(), ticketOneName);
            assert.equal(await tickets[1].getText(), ticketTwoName);
            assert.equal(await tickets[2].getText(), ticketThreeName);
            assert.equal(await tickets[3].getText(), ticketFourName);
            assert.equal(await tickets[4].getText(), staffTicket);
        }

        async assertTicketsOrderAfterChangedOrder(ticketOneName, ticketTwoName, ticketThreeName, ticketFourName){
            await this.isDisplayed(COLUMN_TICKET_NAME, 5000);
            let tickets = await this.findAll(COLUMN_TICKET_NAME);
            assert.equal(await tickets[1].getText(), ticketOneName);
            assert.equal(await tickets[2].getText(), ticketTwoName);
            assert.equal(await tickets[3].getText(), ticketThreeName);
            assert.equal(await tickets[0].getText(), ticketFourName);
        }

        async assertTicketsByGroups(ticketOneName, ticketTwoName, ticketThreeName, ticketFourName){
            await this.clickElementReturnedFromAnArray(TICKET_GROUPS_TABS, 1);
            await this.timeout(500);
            let ticketsInTable = await this.returnElementsCount(COLUMN_TICKET_NAME);
            assert.equal(ticketsInTable, 2);
            let ticketName = await this.getElementText(COLUMN_TICKET_NAME);
            assert.equal(await ticketName, ticketOneName);
            await this.clickElementReturnedFromAnArray(TICKET_GROUPS_TABS, 2);
            await this.timeout(500);
            ticketsInTable = await this.returnElementsCount(COLUMN_TICKET_NAME);
            assert.equal(ticketsInTable, 2);
            ticketName = await this.getElementTextFromAnArrayByIndex(COLUMN_TICKET_NAME, 0);
            assert.equal(await ticketName, ticketTwoName);
            ticketName = await this.getElementTextFromAnArrayByIndex(COLUMN_TICKET_NAME, 1);
            assert.equal(await ticketName, ticketThreeName);
            await this.clickElementReturnedFromAnArray(TICKET_GROUPS_TABS, 3);
            await this.timeout(500);
            ticketsInTable = await this.returnElementsCount(COLUMN_TICKET_NAME);
            assert.equal(ticketsInTable, 1);
            ticketName = await this.getElementText(COLUMN_TICKET_NAME);
            assert.equal(await ticketName, ticketFourName);

        }

        async selectTicketByIndexSendQuantityAndSave(index, quantity){
            await this.isOnBoxOfficePage();
            await this.timeout(500);
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,index,quantity);
            await this.click(SAVE_BUTTON);
        }

        async selectTwoTickets(){
            await this.isOnBoxOfficePage();
            await this.timeout(1000);
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,3,"2");
            await this.click(SAVE_BUTTON);
        }

        async select3Tickets(){
            await this.isOnBoxOfficePage()
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,2,"3");
            await this.click(SAVE_BUTTON);
        }

        async select23TicketsForPromotionWithLimits(){
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,0,"7");
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,2,"6");
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,3,"10");
            await this.click(SAVE_BUTTON);
        }

        async select18Tickets(){
           
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,0,"5");
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,1,"3");
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,2,"4");
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,3,"6");
            await this.click(SAVE_BUTTON);
          
        }

        async addNewQuantityAndSetNewPrice(){
            
            await this.clickElementReturnedFromAnArray(COLUMN_OVERRIDE,0);
            let override = new OverrideTicketModal(this.driver);
            await override.overrideModalIsDisplayed();
            await override.loginToTheOverrideModal();
            await this.timeout(500);
            await override.setNewPrice('5');
            await override.clickSaveChangesButton();
            await this.timeout(1500);
            let newPrice = await this.getElementText(OVERRIDEN_TICKET_PRICE);
            assert.equal(newPrice,'$15.00');
            let fontColor = await this.getFontColorFromAnArray(OVERRIDEN_TICKET_PRICE,0);
            assert.equal(fontColor,'rgba(255, 0, 0, 1)');

        }
        
        async selectFourIndividualTickets(){
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,0,"1");
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,1,"1");
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,2,"1");
            await this.sendKeysToElementReturnedFromAnArray(COLUMN_SELECTS,3,"1");
            await this.click(SAVE_BUTTON);
        }
        
        async getSelectedTicketsNames(ticketOneName,ticketTwoName,ticketThreeName,ticketFourName, staffTicket){
            let ticketOne = await this.getTextFromElementOfArray(COLUMN_TICKET_NAME,0);
            let ticketTwo = await this.getTextFromElementOfArray(COLUMN_TICKET_NAME,1);
            let ticketThree = await this.getTextFromElementOfArray(COLUMN_TICKET_NAME,2);
            let ticketFour = await this.getTextFromElementOfArray(COLUMN_TICKET_NAME,3);
            let ticketFive = await this.getTextFromElementOfArray(COLUMN_TICKET_NAME,4);
            assert.equal(ticketFourName,ticketOne);
            assert.equal(ticketOneName,ticketTwo);
            assert.equal(ticketTwoName,ticketThree);
            assert.equal(ticketThreeName,ticketFour);
            assert.equal(staffTicket,ticketFive);
        }

        async assertBoxOfficeTicketsTableHeaders(){
            await this.isOnBoxOfficePage();
            let table = new TableComponent(this.driver);
            await table.assertColumnNamesByIndex(0 ,"Ticket Name");
            await table.assertColumnNamesByIndex(1 ,"Description");
            await table.assertColumnNamesByIndex(2 ,"Price");
            await table.assertColumnNamesByIndex(3 ,"Quantity");
            await table.assertColumnNamesByIndex(4 ,"Sold");
            await table.assertColumnNamesByIndex(5,"Select Ticket");
            await table.assertColumnNamesByIndex(6 ,"Overrides: Price/Quantity");
        }

        async assertNoTicketMessage(){
            await this.isOnBoxOfficePage();
            let table = new TableComponent(this.driver);
            await table.messageWhenTableIsEmpty("No record available")
        }

        async clickSaveButtonWhenTicketsNotSelectedAssertErrorMessage(){
            let selected = await this.getEnteredTextInTheInput(COLUMN_SELECTS);
            assert.equal(selected, "0");
            await this.click(SAVE_BUTTON);
            let alert = new Alerts(this.driver)
            await alert.errorInfoMessageIsDisplayed("Please select at least one ticket.");

        }

        async assertNavigationButtonsCountAndText(){
            let stepper = new BOStepper(this.driver);
            await stepper.assertNavStepsCountAndStepsNames();
        }

        async clickAddExtrasNavButtonWhenTicketsNotSelectedAssertErrorMessage(){
         
            let stepper = new BOStepper(this.driver);
            await stepper.clickNavElementByIndex(1);
            let alert = new Alerts(this.driver)
            await alert.errorInfoMessageIsDisplayed("Please select at least one ticket.");
        }

        async clickNavButtonByIndexWhenTicketsSelected(index){
            let stepper = new BOStepper(this.driver);
            await stepper.clickNavElementByIndex(index);
        }

        async assertSelectedQtyByIndex(index, value){
            await this.isOnBoxOfficePage();
            let selected = await this.getEnteredTextInTheInputByIndex(COLUMN_SELECTS, index);
            assert.equal(selected, value);
        }

        async assertTicketGroupsTabsCountAndNames(ticketGroupOne, ticketGroupTwo, ticketGroupThree){
            
            let groupTabs = await this.returnElementsCount(TICKET_GROUPS_TABS);
            assert.equal(groupTabs, 4);
            let groupAll = await this.getElementTextFromAnArrayByIndex(TICKET_GROUPS_TABS, 0);
            let groupOne = await this.getElementTextFromAnArrayByIndex(TICKET_GROUPS_TABS, 1);
            let groupTwo = await this.getElementTextFromAnArrayByIndex(TICKET_GROUPS_TABS, 2);
            let groupThree = await this.getElementTextFromAnArrayByIndex(TICKET_GROUPS_TABS, 3);
            assert.equal(groupAll.replace('\n',' ').split(' ')[0], 'All');
            assert.equal(groupOne.replace('\n',' ').split(' ')[0], ticketGroupOne);
            assert.equal(groupTwo.replace('\n',' ').split(' ')[0], ticketGroupTwo);
            assert.equal(groupThree.replace('\n',' ').split(' ')[0], ticketGroupThree);
            
        }

        async assertTicketQuantityByGroup(){
            let allTicketsInGroup;
            let ticketsInTable
            await this.isOnBoxOfficePage();
            await this.timeout(500);
            allTicketsInGroup = await this.getElementTextFromAnArrayByIndex(TICKETS_GROUPS_TICKET_COUNT, 0);
            ticketsInTable = await this.returnElementsCount(COLUMN_TICKET_NAME);
            assert.equal(allTicketsInGroup, ticketsInTable);
            await this.clickElementReturnedFromAnArray(TICKET_GROUPS_TABS, 1);
            await this.timeout(500);
            allTicketsInGroup = await this.getElementTextFromAnArrayByIndex(TICKETS_GROUPS_TICKET_COUNT, 1);
            ticketsInTable = await this.returnElementsCount(COLUMN_TICKET_NAME);
            assert.equal(allTicketsInGroup, ticketsInTable);
            await this.clickElementReturnedFromAnArray(TICKET_GROUPS_TABS, 2);
            await this.timeout(500);
            allTicketsInGroup = await this.getElementTextFromAnArrayByIndex(TICKETS_GROUPS_TICKET_COUNT, 2);
            ticketsInTable = await this.returnElementsCount(COLUMN_TICKET_NAME);
            assert.equal(allTicketsInGroup, ticketsInTable);
            await this.clickElementReturnedFromAnArray(TICKET_GROUPS_TABS, 3);
            await this.timeout(500);
            allTicketsInGroup = await this.getElementTextFromAnArrayByIndex(TICKETS_GROUPS_TICKET_COUNT, 3);
            ticketsInTable = await this.returnElementsCount(COLUMN_TICKET_NAME);
            assert.equal(allTicketsInGroup, ticketsInTable);
                
        }

        async assertTicketCountInAllTabEqualsSumOfIndividualGroups(){
            
            await this.isOnBoxOfficePage();
            let ticketCount = await this.findAll(TICKETS_GROUPS_TICKET_COUNT);
            let all = await ticketCount[0].getText();
            let sum = 0;
            for(let i = 1; i < ticketCount.length ; i++){
                sum = sum + parseInt(await ticketCount[i].getText())
            }
            assert.equal(parseInt(all), sum);
       
        }

        async getSoldTicketsNumberForEachTicket(){
            return await this.returnArrayOfStrings(COLUMN_SOLD);
        }


    }
    module.exports = BOSelectTickets;