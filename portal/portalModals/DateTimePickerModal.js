    const BasePage = require('../../BasePage');
    const NEXT_MONTH_BUTTON = { css: "button[aria-label='Next month']" };
    const DAY_13_OF_MONTH = { xpath: "//*[text()='13']"};
    const SET_DATE_TIME_BUTTON = { xpath: "//*[normalize-space(text())='Set']"};
    const HOUR_MINUTES_INPUTS = { className: "owl-dt-timer-input" }; //list
    const TODAY_DAY_BUTTON = { xpath: "//span[contains(@class , 'owl-dt-calendar-cell-today')]" };
    const ADD_HOURS_BUTTON = { css: "button[aria-label='Add a hour']" };




    class DateTimePickerModal extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async datePickerIsVisible(){
           await this.isDisplayed(SET_DATE_TIME_BUTTON, 5000)
        }
        async clickNextMonthButton(){
            await this.click(NEXT_MONTH_BUTTON);
        }
        
        async selectTodayDate(){
            await this.click(TODAY_DAY_BUTTON);
        }

        async select13Day(){
            await this.click(DAY_13_OF_MONTH);
        }
        async clickSetButton(){
            await this.click(SET_DATE_TIME_BUTTON);
            await this.timeout(1500)
            let set = await this.findAll(SET_DATE_TIME_BUTTON);
            if(set.length > 0){
                await this.click(SET_DATE_TIME_BUTTON);
                await this.timeout(1000);
            }
        }
        

         getHoursNow(){
            let today = new Date();
            let hour = today.getHours();
            if (hour > 12) {
               return (hour-12).toString();
            }else{
                return hour.toString();
            }
        }

        async enterTimeNow(){
           let hours = await this.getElementFromAnArrayByIndex(HOUR_MINUTES_INPUTS,0);
           hours.clear();
           await this.timeout(500)
           let hour = this.getHoursNow();
          await hours.sendKeys(hour);
        }

        getUtcHoursNow(){
            let today = new Date();
            let hour = today.getUTCHours();
            if (hour > 12) {
                return ((hour-12)-5).toString();
            }else{
                return (hour - 5).toString();
            }
        }

        async enterUtcTimeNow(){
            let hours = await this.getElementFromAnArrayByIndex(HOUR_MINUTES_INPUTS,0);
            hours.clear();
            await this.timeout(500)
            let hour = this.getUtcHoursNow();
            await hours.sendKeys(hour);
        }


        async updateTimeToXMinLater(minutesToAdd){
            await this.isDisplayed(HOUR_MINUTES_INPUTS,5000);
            await this.timeout(500);
            let today = new Date();
            let minutes = today.getMinutes();
            let updatedMinutes = minutes + parseInt(minutesToAdd);
            let minutesInput = await this.getElementFromAnArrayByIndex(HOUR_MINUTES_INPUTS,1);
            await minutesInput.clear();
            await minutesInput.sendKeys(updatedMinutes.toString())

        }

        async updateHourByOne(){
            await this.click(ADD_HOURS_BUTTON);
            await this.timeout(500);
            await this.clickSetButton();
        }


    }
    module.exports = DateTimePickerModal;
