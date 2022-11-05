    const BasePage = require('../../BasePage');
    const MY_EVENTS_TAB = { id: "tab-myevent" }
    const CREATE_EVENT_BUTTON = { id: "createEventSide"}
    const DASHBOARD_HEADER = { xpath: "//div[@class='signup-top-block']//h3"}



    class Dashboard extends BasePage {
        constructor(driver) {
            super(driver);
        }
        async clickMyEventsTab(){
            await this.click(MY_EVENTS_TAB);
        }

        async clickCreateEventButton(){
            await this.click(CREATE_EVENT_BUTTON);
        }
        async isAtDashboardPage(){
            await this.isDisplayed(DASHBOARD_HEADER,90000);
        }
    }
    module.exports = Dashboard;