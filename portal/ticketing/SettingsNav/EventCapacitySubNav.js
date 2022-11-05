    const BasePage = require('../../../BasePage');
    const SHOW_DEFAULT_TICKETS_LINK = { xpath: "//a[text()='+ Show Default Tickets']"}
    const ADD_TYPE_BUTTON = { className: "icon-add" }
    const LIMIT_MAX_TICKET_PER_USER_INPUT = { name: "totalTicketLimit" }
    const SAVE_BUTTON = { xpath: "//button[text()='Save']"}

    class EventCapacitySubNav extends BasePage{
        constructor(driver) {
            super(driver);
        }
        async isOnEventCapacitySubNav(){
            await this.isDisplayed(SAVE_BUTTON,5000);
        }
        async setLimitPerAccount(keys){
            await this.isOnEventCapacitySubNav();
            await this.sentKeys(LIMIT_MAX_TICKET_PER_USER_INPUT, keys);
            await this.click(SAVE_BUTTON);
            await this.timeout(2000);
        }
        async removeLimit(){
            await this.isOnEventCapacitySubNav();
            await this.clickBackspaceKey(LIMIT_MAX_TICKET_PER_USER_INPUT);
            await this.clickBackspaceKey(LIMIT_MAX_TICKET_PER_USER_INPUT);
            await this.click(SAVE_BUTTON);
            await this.timeout(3000);
        }
    }
    module.exports = EventCapacitySubNav;