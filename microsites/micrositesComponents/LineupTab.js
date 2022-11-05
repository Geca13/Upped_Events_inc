    const BasePage = require('../../BasePage');
    const OVERVIEW_TAB = { xpath: "//*[text()='Overview']"}
    const LINEUP_CONTAINER = { className: 'lineup-container' } //list
    const COMEDY_TAB = { xpath: "//*[text()='Comedy']"} //list
    const TAGS_CONTAINER = { id: 'tagsContainer' }
    const TAG_LIST = { className: 'tag' }
    const TAGS_LEFT_CHEVRON = { className: 'fa-chevron-left' } //list index 2
    const TAGS_RIGHT_CHEVRON = { className: 'fa-chevron-right' } //list index 2

    const LINEUP_DETAILS_CONTAINER = { className: 'lineup-details' } //list
    const LINEUP_NAME = { className: 'lineup-title' } //list
    const LINEUP_TIME_AND_WHERE_LABELS = { className: 'lineup-detail-item-label' } //list
    const LINEUP_TIME_AND_WHERE_VALUES = { className: 'lineup-detail-item' } //list


    class LineupTab extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async isOnComedyTab(){
            await this.isDisplayed(LINEUP_DETAILS_CONTAINER,5000);
        }
        async isOnOverviewTab(){
            await this.isDisplayed(LINEUP_CONTAINER,5000);
        }

        async checkForPerformancesInOverviewTab(performanceName){
            await this.elementByTextIsDisplayed(performanceName)
        }

        async checkForElementsInComedyTab(name){
            await this.elementByTextIsDisplayed(name);
        }
        async clickComedyTab(){
            await this.clickElementReturnedFromAnArray(COMEDY_TAB,0);

        }
        async checkLineupForPerformances(){
            await this.isOnOverviewTab();
            await this.checkForPerformancesInOverviewTab('Chuck');
            await this.clickComedyTab();
            await this.isOnComedyTab();
            await this.checkForElementsInComedyTab('#Bartowski');
            await this.checkForElementsInComedyTab('#Grimes');
            await this.elementFromArrayOfElementsIsDisplayed(LINEUP_NAME,0);
        }

    }
    module.exports = LineupTab;