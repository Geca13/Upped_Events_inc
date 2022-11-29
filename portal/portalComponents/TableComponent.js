    const BasePage = require('../../BasePage');
    const assert = require('assert')
    const TABLE_COLUMN_NAMES = { xpath: "//table[@id='dataTable']//tr/th//span" } //starts from index 1
    const TABLE_EMPTY_MESSAGE = { xpath: "//div[contains(@class, 'data-empty')]//h5" }
    const DELETE_TABLE_ROW_BUTTONS = { className : "text-danger" }
    const EDIT_TABLE_ROW_BUTTONS = { className : "text-second"}
    const COLUMN_NAMES = { className: "column-name" };


    class TableComponent extends BasePage{
        constructor(driver) {
            super(driver);
        }

        async tableIsDisplayed(){
            await this.isDisplayed(TABLE_COLUMN_NAMES, 5000);
        }
        
        async assertColumnNamesByIndex(index, column){
            let columnName = await this.getElementTextFromAnArrayByIndex(TABLE_COLUMN_NAMES, index);
            assert.equal(columnName,column);
        }

        async messageWhenTableIsEmpty(message){
            let empty = await this.getElementText(TABLE_EMPTY_MESSAGE);
            assert.equal(empty,message);
        }



        async clickEditTableRowByObjectName(objectName){
            await this.isDisplayed(COLUMN_NAMES,5000);
            let i = await this.returnIndexWhenTextIsKnown(COLUMN_NAMES, objectName);
            await this.timeout(2000);
            await this.clickElementReturnedFromAnArray(EDIT_TABLE_ROW_BUTTONS,i);
            await this.timeout(1000);
        }

        async clickDeleteTableRowByIndex(index){
            await this.tableIsDisplayed()
            await this.clickElementReturnedFromAnArray(DELETE_TABLE_ROW_BUTTONS, index);
        }
        
    }
    module.exports = TableComponent;