    const BasePage = require('../../BasePage');
    const assert = require('assert')
    const GAMES_TAB = { xpath: "//div[@class='box-container' and text()='Games']"}
    const GAMES_TITLE = { xpath: "//div[@class='content-title' and text()='Games']"}
    const DANCE_TAB = { xpath: "//div[@class='box-container' and text()='Dance']"}
    const DANCE_TITLE = { xpath: "//div[@class='content-title' and text()='Dance']"}
    const YOGA_TAB = { xpath: "//div[@class='box-container' and text()='Yoga']"}
    const YOGA_TITLE = { xpath: "//div[@class='content-title' and text()='Yoga']"}
    const CAMPING_TAB = { xpath: "//div[@class='box-container' and text()='Camping']"}
    const CAMPING_TITLE = { xpath: "//div[@class='content-title' and text()='Camping']"}
    const MISC_TAB = { xpath: "//div[@class='box-container' and text()='Misc.']"}
    const MISC_TITLE = { xpath: "//div[@class='content-title' and text()='Misc.']"}
    const PARADE_TAB = { xpath: "//div[@class='box-container' and text()='Parade']"}
    const PARADE_TITLE = { xpath: "//div[@class='content-title' and text()='Parade']"}
    const COMPETITION_TAB = { xpath: "//div[@class='box-container' and text()='Competition']"}
    const COMPETITION_TITLE = { xpath: "//div[@class='content-title' and text()='Competition']"}
    const OVERVIEW_TAB = { xpath: "//*[text()='Overview']"}//list
    const ACTIVITY_CONTAINER = { className: 'activity-container' } //list
    const TAGS_CONTAINER = { id: 'tagsContainer' }//list
    const TAG_LIST = { className: 'tag' }
    const TAGS_LEFT_CHEVRON = { className: 'fa-chevron-left' } //list index 4
    const TAGS_RIGHT_CHEVRON = { className: 'fa-chevron-right' } //list index 4

    const ACTIVITIES_DETAILS_CONTAINER = { className: 'activity-details' } //list
    const ACTIVITY_NAME = { className: 'activity-title' } //list
    const ACTIVITY_TIME_AND_WHERE_LABELS = { className: 'activity-detail-item-label' } //list
    const ACTIVITY_TIME_AND_WHERE_VALUES = { className: 'activity-detail-item' } //list

    const OVERVIEW_NFL_LIST_ITEM = { xpath: "//li[@class='ng-star-inserted' and text()=' Nfl Football Game ']"}
    const FOOTBALL_ACTIVITY_TITLE = { xpath: "//div[@class='activity-title' and text()='Nfl Football Game']"}
    const VIKINGS_TAG_ITEM = { xpath: "//div[@class='tag' and text()=' #Vikings ']"}
    const EAGLES_TAG_ITEM = { xpath: "//div[@class='tag' and text()=' #Eagles ']"}


    class ActivitiesTab extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async isAtActivitiesTab(){
            await this.isDisplayed(COMPETITION_TAB,5000, "activitiesTabCompetition")
        }

        async verifyElementsOnActivitiesTab(){
            await this.isAtActivitiesTab();
            await this.isDisplayed(COMPETITION_TITLE,5000);
            await this.isDisplayed(OVERVIEW_NFL_LIST_ITEM,5000);
            await this.click(COMPETITION_TAB);
            await this.isDisplayed(FOOTBALL_ACTIVITY_TITLE,5000);
            let vikings = await this.getChildTextByParentIndexAndChildIndex(TAGS_CONTAINER,2,0);
            assert.equal(vikings,'#Vikings');
            let eagles = await this.getChildTextByParentIndexAndChildIndex(TAGS_CONTAINER,2,1);
            assert.equal(eagles,'#Eagles');
        }
    }
    module.exports = ActivitiesTab;