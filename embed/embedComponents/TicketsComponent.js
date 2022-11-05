    const BasePage = require("../../BasePage");
    const assert = require('assert')
    const TICKET_NOT_AVAILABLE_SOLD = { xpath: "//div[contains(@class, 'quantity-container')]//span" }
    const TICKET_CONTAINER = { xpath: "//li[contains(@class, 'list-group-item')]" }
    const TICKET_NAME_AND_PRICE = { className: "name" }
    const TICKET_QUANTITY_CONTAINER = { xpath: "//div[contains(@class, 'quantity-container')]" }
    const TICKETS_LIST = { className: "tickets-list" }
    
    class TicketsComponent extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async ticketListIsDisplayed(){
            await this.isDisplayed(TICKETS_LIST, 5000);
        }


        async assertFullTicketNameDisplay(ticketOneName, ticketOnePrice){
            await this.driver.executeScript("document.getElementsByClassName('ticket-info')[0].style.visibility='hidden'");
            let fullName = await this.getElementText(TICKET_NAME_AND_PRICE);
            assert.equal(fullName, ticketOneName + ' ($'+ticketOnePrice+")")
        }

        async assertNumberOfTickets(number){
            let tickets = await this.returnElementsCount(TICKET_CONTAINER);
            assert.equal(tickets, number);
        }

        async assertTicketNotAvailableMessageIsDisplayed(){
            await this.isDisplayed(TICKET_NOT_AVAILABLE_SOLD, 5000);
            let message = await this.getElementText(TICKET_NOT_AVAILABLE_SOLD);
            assert.equal(message, "Ticket not available!")
        }

        async sentKeysToTicketInputByTicketName(ticketName, qty){
            let i = await this.getTicketIndexByTicketName(ticketName);
            await this.sentKeysToChildByIndexAndParentIndex(TICKET_QUANTITY_CONTAINER, i, 0, qty)
            await this.timeout(1000)
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
        
    }

    module.exports = TicketsComponent;