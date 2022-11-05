    const BasePage = require("../../BasePage");
    const assert = require('assert')
    const {By} = require("selenium-webdriver");
    const {expect} = require("chai");
    const TICKET_SELECT = { xpath: "//div[contains(@class, 'quantity-container')]//select"};
    const TICKET_SELECT_OPTIONS = { xpath: "//select//option"}
    const TICKETS_LIST = { className: "tickets-list" }
    const TICKET_NOT_AVAILABLE_SOLD = { xpath: "//div[contains(@class, 'quantity-container')]//span" }
    const TICKET_CONTAINER = { xpath: "//li[contains(@class, 'list-group-item')]" }
    const TICKET_QUANTITY_CONTAINER = { xpath: "//div[contains(@class, 'quantity-container')]" }
    const TICKET_NAME_AND_PRICE = { className: "name" }
    const TICKET_PRICE = { xpath: "//span[@class='ticket-price']" }
    const DISCOUNTED_TICKET_PRICE = { xpath: "//span[contains(@class, 'has-discount')]" }
    const TICKET_GROUPS = { xpath: "//ul[@id='pills-tab']//li" }
    const TICKET_GROUPS_MOBILE = { xpath: "//ul[@id='pills-tab-mobile']//li" }
    const TICKET_GROUPS_DROPDOWN = { tagName: "ng-select" }
    const TICKET_GROUPS_DROPDOWN_OPTIONS = { xpath: "//div[contains(@class, 'ng-option-marked')]//span" }

    class TicketsComponent extends BasePage {
        constructor(driver) {
            super(driver);
        }


        async assertFullTicketNameDisplay(ticketOneName, ticketOnePrice){
            await this.driver.executeScript("document.getElementsByClassName('ticket-info')[0].style.visibility='hidden'");
            let fullName = await this.getElementText(TICKET_NAME_AND_PRICE);
            assert.equal(fullName, ticketOneName + ' ($'+ticketOnePrice+")")
        }

        async getTicketPriceByTicketName(ticketName) {
            let tickets = await this.findAll(TICKET_NAME_AND_PRICE);
            let prices = await this.findAll(TICKET_PRICE);
            for(let i = 0; i < tickets.length; i++){
                let ticket = await this.getElementTextFromAnArrayByIndex(TICKET_NAME_AND_PRICE,i);
                let ticketname = ticket.split(" ")[0]
                if(await ticketname === ticketName){
                    return await prices[i].getText();
                }
            }
        }

        async getCleanTicketsNames() {
            let cleaned = [];
            let tickets = await this.findAll(TICKET_NAME_AND_PRICE);
            for(let i = 0; i < tickets.length; i++){
                let ticket = await this.getElementTextFromAnArrayByIndex(TICKET_NAME_AND_PRICE,i);
                let name = ticket.split(" ")[0]
                cleaned.push(name)
            }
            return cleaned;
        }

        async getCleanTicketPriceFromPriceWithBrackets(ticketName){
            let price = await this.getTicketPriceByTicketName(ticketName);
            return price.substring(2, price.length - 1);
        }

        async getSelectedQtyByTicketName(ticketName) {
            let qtyContainers = await this.findAll(TICKET_QUANTITY_CONTAINER);
            let i = await this.getTicketIndexByTicketName(ticketName);
            let ticketQty = qtyContainers[i].findElement(By.css("*:first-child"));
            return ticketQty.getAttribute("value");
        }

        async assertTicketSelectValueByName(staffTicket, value){
            let tickets = await this.getSelectedQtyByTicketName(staffTicket);
            expect(tickets).to.equal(value);
        }

        async selectedTicketTotal(ticketName){
            let ticketRawPrice = await this.getTicketPriceByTicketName(ticketName);
            let ticketPrice = ticketRawPrice.substring(2, ticketRawPrice.length-1);
            let selectedQty = await this.getSelectedQtyByTicketName(ticketName);
            let total = parseFloat(ticketPrice) * parseInt(selectedQty);
            return total.toFixed(2);
        }

        async sentKeysToTicketInputByTicketName(ticketName, qty){
            let i = await this.getTicketIndexByTicketName(ticketName);
            await this.sentKeysToChildByIndexAndParentIndex(TICKET_QUANTITY_CONTAINER, i, 0, qty)
            await this.timeout(1000)
        }

        async getFullTicketLayoutByTicketName(ticketName) {
            let tickets = await this.findAll(TICKET_NAME_AND_PRICE);
            for(let i = 0; i < tickets.length; i++){
                let ticket = await this.getElementTextFromAnArrayByIndex(TICKET_NAME_AND_PRICE,i);
                let ticketname = ticket.split(" ")[0]
                if(await ticketname === ticketName){
                    return ticket
                }
            }
        }

        async getTicketIndexByTicketName(ticketName) {
            let tickets = await this.findAll(TICKET_NAME_AND_PRICE);
            for(let i = 0; i < tickets.length; i++){
                let ticket = await this.getElementTextFromAnArrayByIndex(TICKET_NAME_AND_PRICE,i);
                let ticketname = ticket.split(" ")[0]
                if(await ticketname === ticketName){
                    return i
                }
            }
        }

        async assertNumberOfTickets(number){
            let tickets = await this.returnElementsCount(TICKET_CONTAINER);
            assert.equal(tickets, number);
        }

        async sentKeysToTicketInput(index, quantity){
            let input = await this.getElementFromAnArrayByIndex(TICKET_SELECT, index);
            await input.sendKeys(quantity);
        }

        async assertTicketNotAvailableMessageIsDisplayed(){
            await this.isDisplayed(TICKET_NOT_AVAILABLE_SOLD, 5000);
            let message = await this.getElementText(TICKET_NOT_AVAILABLE_SOLD);
            assert.equal(message, "Ticket not available!")
        }

        async confirmEnteredValuesBeforeLogin(){

            let firstSelectValue =await this.getEnteredTextInTheInputByIndex(TICKET_SELECT, 1);
            let secondSelectValue =await this.getEnteredTextInTheInputByIndex(TICKET_SELECT, 2);
            let thirdSelectValue =await this.getEnteredTextInTheInputByIndex(TICKET_SELECT, 3);
            //let fourthSelectValue =await this.getEnteredTextInTheInputByIndex(TICKET_SELECT, 3);
            assert.equal(firstSelectValue,2);
            assert.equal(secondSelectValue,3);
            assert.equal(thirdSelectValue,1);
            //assert.equal(fourthSelectValue,0);

        }

        async assertTicketCountInOrderTotal(summary){
            await this.timeout(500);
            let selected = [];
            let selects = await this.findAll(TICKET_SELECT);
            for(let i = 0; i < selects.length; i++){
                let select = await this.getEnteredTextInTheInputByIndex(TICKET_SELECT, i);
                selected.push(select);
            }
            let totalSelected = await this.convertAndCalculateStringArrayToNumberWithArray(selected);
            let ticketsInSummary = await summary.returnTicketCount();
            assert.equal(totalSelected, ticketsInSummary);

        }


        async ticketListIsDisplayed(){
            await this.isDisplayed(TICKETS_LIST, 5000);
        }

        async assertGroupNamesAndCount(one, two, three){
            let grOne = await this.getElementTextFromAnArrayByIndex(TICKET_GROUPS, 0);
            let grTwo = await this.getElementTextFromAnArrayByIndex(TICKET_GROUPS, 1);
            let grThree = await this.getElementTextFromAnArrayByIndex(TICKET_GROUPS, 2);
            let grFour = await this.getElementTextFromAnArrayByIndex(TICKET_GROUPS, 3);
            assert.equal(grOne, "All")
            assert.equal(grTwo, one)
            assert.equal(grThree, two)
            assert.equal(grFour, three);
            let count = await this.returnElementsCount(TICKET_GROUPS);
            assert.equal(count, 4);
        }

        async clickGroupTabByIndexInEmbed(index){
            await this.clickElementReturnedFromAnArray(TICKET_GROUPS,index);
            await this.timeout(1000);
        }

        async clickGroupTabByIndexInMobileEmbed(index){
            await this.clickElementReturnedFromAnArray(TICKET_GROUPS_MOBILE,index);
            await this.timeout(1000);
        }

        async assertTicketsByGroupsAndClassIsAppliedWhenClickedOnFullEmbed(base, clas){
            let tickets ;
            let allTab = await this.checkIfClassIsApplied(TICKET_GROUPS, 0, clas);
            let first = await this.checkIfClassIsApplied(TICKET_GROUPS, 1, clas);
            let second = await this.checkIfClassIsApplied(TICKET_GROUPS, 2, clas);
            let third = await this.checkIfClassIsApplied(TICKET_GROUPS, 3, clas);
            expect(allTab).to.be.true;
            expect(first).to.be.false;
            expect(second).to.be.false;
            expect(third).to.be.false;
            await this.clickGroupTabByIndexInEmbed(1);
            let count = await this.returnElementsCount(TICKET_NAME_AND_PRICE);
            expect(count).to.equal(2);
            tickets = await this.getCleanTicketsNames();
            expect(tickets[0]).to.equal(base.toString() +"T1");
            expect(tickets[1]).to.equal(base.toString() +"staff");
            allTab = await this.checkIfClassIsApplied(TICKET_GROUPS, 0, clas);
            first = await this.checkIfClassIsApplied(TICKET_GROUPS, 1, clas);
            second = await this.checkIfClassIsApplied(TICKET_GROUPS, 2, clas);
            third = await this.checkIfClassIsApplied(TICKET_GROUPS, 3, clas);
            expect(allTab).to.be.false;
            expect(first).to.be.true;
            expect(second).to.be.false;
            expect(third).to.be.false;
            await this.clickGroupTabByIndexInEmbed(2);
            count = await this.returnElementsCount(TICKET_NAME_AND_PRICE);
            expect(count).to.equal(2);
            tickets = await this.getCleanTicketsNames();
            expect(tickets[0]).to.equal(base.toString() + "T2");
            expect(tickets[1]).to.equal(base.toString() + "T3");
            allTab = await this.checkIfClassIsApplied(TICKET_GROUPS, 0, clas);
            first = await this.checkIfClassIsApplied(TICKET_GROUPS, 1, clas);
            second = await this.checkIfClassIsApplied(TICKET_GROUPS, 2, clas);
            third = await this.checkIfClassIsApplied(TICKET_GROUPS, 3, clas);
            expect(allTab).to.be.false;
            expect(first).to.be.false;
            expect(second).to.be.true;
            expect(third).to.be.false;
            await this.clickGroupTabByIndexInEmbed(3);
            count = await this.returnElementsCount(TICKET_NAME_AND_PRICE);
            expect(count).to.equal(1);
            tickets = await this.getCleanTicketsNames();
            expect(tickets[0]).to.equal(base.toString() + "T4");
            allTab = await this.checkIfClassIsApplied(TICKET_GROUPS, 0, clas);
            first = await this.checkIfClassIsApplied(TICKET_GROUPS, 1, clas);
            second = await this.checkIfClassIsApplied(TICKET_GROUPS, 2, clas);
            third = await this.checkIfClassIsApplied(TICKET_GROUPS, 3, clas);
            expect(allTab).to.be.false;
            expect(first).to.be.false;
            expect(second).to.be.false;
            expect(third).to.be.true;

        }

        async assertTicketsByGroupsWhenOrderIsChangedOnFullEmbed(base){
            let tickets = await this.getCleanTicketsNames();
            expect(tickets[0]).to.equal(base.toString() +"T4");
            expect(tickets[1]).to.equal(base.toString() +"T1");
            expect(tickets[2]).to.equal(base.toString() +"T2");
            expect(tickets[3]).to.equal(base.toString() +"T3");
            expect(tickets[4]).to.equal(base.toString() +"staff");
            await this.clickGroupTabByIndexInEmbed(1);
            let count = await this.returnElementsCount(TICKET_NAME_AND_PRICE);
            tickets = await this.getCleanTicketsNames();
            expect(count).to.equal(3);
            expect(tickets[0]).to.equal(base.toString() +"T1");
            expect(tickets[1]).to.equal(base.toString() +"T2");
            expect(tickets[2]).to.equal(base.toString() +"staff");
            await this.clickGroupTabByIndexInEmbed(2);
            count = await this.returnElementsCount(TICKET_NAME_AND_PRICE);
            tickets = await this.getCleanTicketsNames();
            expect(count).to.equal(1);
            expect(tickets[0]).to.equal(base.toString() + "T3");
            await this.clickGroupTabByIndexInEmbed(3);
            count = await this.returnElementsCount(TICKET_NAME_AND_PRICE);
            tickets = await this.getCleanTicketsNames();
            expect(count).to.equal(1);
            expect(tickets[0]).to.equal(base.toString() + "T4");

        }

        async assertTicketsByGroupsWhenOrderIsChangedOnMobileEmbed(base){
            let tickets = await this.getCleanTicketsNames();
            expect(tickets[0]).to.equal(base.toString() +"T4");
            expect(tickets[1]).to.equal(base.toString() +"T1");
            expect(tickets[2]).to.equal(base.toString() +"T2");
            expect(tickets[3]).to.equal(base.toString() +"T3");
            expect(tickets[4]).to.equal(base.toString() +"staff");
            await this.clickGroupTabByIndexInMobileEmbed(1);
            let count = await this.returnElementsCount(TICKET_NAME_AND_PRICE);
            tickets = await this.getCleanTicketsNames();
            expect(count).to.equal(3);
            expect(tickets[0]).to.equal(base.toString() +"T1");
            expect(tickets[1]).to.equal(base.toString() +"T2");
            expect(tickets[2]).to.equal(base.toString() +"staff");
            await this.clickGroupTabByIndexInMobileEmbed(2);
            count = await this.returnElementsCount(TICKET_NAME_AND_PRICE);
            tickets = await this.getCleanTicketsNames();
            expect(count).to.equal(1);
            expect(tickets[0]).to.equal(base.toString() + "T3");
            await this.click(TICKET_GROUPS_DROPDOWN);
            await this.isDisplayed(TICKET_GROUPS_DROPDOWN_OPTIONS,5000);
            await this.click(TICKET_GROUPS_DROPDOWN_OPTIONS);
            count = await this.returnElementsCount(TICKET_NAME_AND_PRICE);
            tickets = await this.getCleanTicketsNames();
            expect(count).to.equal(1);
            expect(tickets[0]).to.equal(base.toString() + "T4");

        }

        async assertDropDownElementsEqualsAvailableTickets(availableTickets){
            await this.isDisplayed(TICKET_SELECT_OPTIONS,5000);
            let dropdownOptions = await this.getElementTextForTheLastElementFromAnArray(TICKET_SELECT_OPTIONS);
            let converted = parseInt(dropdownOptions);
            assert.equal(converted, availableTickets);
        }

        async assertDropDownElementsEquals(number){
            await this.isDisplayed(TICKET_SELECT_OPTIONS,5000);
            let dropdownOptions = await this.getElementTextForTheLastElementFromAnArray(TICKET_SELECT_OPTIONS);
            console.log(dropdownOptions)
            assert.equal(dropdownOptions, number);
        }

        async assertTheNewTicketPriceEqualsDiscountedPrice(ticketName, discountedPrice){
            let price = await this.getTicketPriceByTicketName(ticketName);
            assert.equal( price , "($" + parseFloat(discountedPrice).toFixed(2) + ")");
        }

        async assertNewTicketNamePricesLayout(ticketName, originalPrice, discountedPrice){
            let fullTicketLayout = await this.getFullTicketLayoutByTicketName(ticketName);
            assert.equal(fullTicketLayout, ticketName + " " + originalPrice + "($" + parseFloat(discountedPrice).toFixed(2) + ")")
        }

        async assertFontColorAndStrikeOnOriginalPrice(ticketName){
            let index = await this.getTicketIndexByTicketName(ticketName)
            let fontColor = await this.getFontColorFromAnArray(DISCOUNTED_TICKET_PRICE,index);
            assert.equal(fontColor,'rgba(173, 3, 3, 1)');
            let decoration = await this.getFontTextDecorationFromAnArray(DISCOUNTED_TICKET_PRICE,index);
            let strike = decoration.split(" ")[0]
            assert.equal(strike,"line-through");
        }

        async getListOfTicketsWhereQuantityIsBiggerThen0(){
            await this.isDisplayed(TICKET_SELECT, 5000)
            let selectIndex = 0;
            let ticketNames = [];
            let qtyContainer = await this.findAll(TICKET_QUANTITY_CONTAINER);
                for(let i = 0;i < qtyContainer.length; i++){
                    let parent = await this.getElementFromAnArrayByIndex(TICKET_QUANTITY_CONTAINER, i);
                    let child = parent.findElement(By.css("*:first-child"))
                    let tag = await child.getTagName();
                    if (tag === "select") {
                        let ticketQty = await this.getEnteredTextInTheInputByIndex(TICKET_SELECT, selectIndex);
                        if (parseInt(ticketQty) !== 0) {
                            let fullTicketName = await this.getElementTextFromAnArrayByIndex(TICKET_NAME_AND_PRICE, i);
                            let ticketName = fullTicketName.split(" ");
                            ticketNames.push(ticketName[0]);
                            selectIndex = selectIndex+1;
                        }else{
                            selectIndex = selectIndex + 1;
                        }
                    }
                }
            return ticketNames;
        }




    }

    module.exports = TicketsComponent;