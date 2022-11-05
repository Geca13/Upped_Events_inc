    const BasePage = require("../../BasePage");
    const TICKET_TERMS_MODAL = { tagName: 'ticket-terms-modal' }
    const CLOSE_TICKET_TERMS_MODAL_BUTTON = { xpath: '//ngb-modal-window//ticket-terms-modal//div//div' }
    const TICKET_TERMS_BODY = { className: 'terms-body' }

    class TicketTermsModal extends BasePage {
        constructor(driver) {
            super(driver);
        }
        async ticketTermsModalIsDisplayed(){
            await this.isDisplayed(TICKET_TERMS_BODY,5000);
        }
        async clickCloseTermsModalButton(){
            await this.getElementFromAnArrayByIndex(CLOSE_TICKET_TERMS_MODAL_BUTTON,1);
        }
    }
    module.exports = TicketTermsModal;