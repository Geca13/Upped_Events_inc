﻿const {By} = require("selenium-webdriver");
const until = require('selenium-webdriver').until;
const moment = require('moment');


class BasePage {
    constructor(driver) {
        this.driver = driver
    }

    async visit(url) {
        await this.driver.get(url)
    }
    
    find(locator) {
        return this.driver.findElement(locator)
    }

    findAll(locator) {
        return this.driver.findElements(locator);
    }

    async returnElementsCount(locator){
        await this.timeout(1000);
        let elements =  await this.findAll(locator);
        return elements.length
    }

    async click(locator) {
        await this.find(locator).click()
    }

    async clickElementByLinkText(text){
        let element = await this.driver.findElement(By.linkText(text));
        await element.click();
    }
    
    async numberWithCommas(locator) {
        let x = await this.getEnteredTextInTheInput(locator);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    async formatDateTimeInputToIncludeComma(locator) {
        let array = []
        let fullDate = []
        let value = await this.getEnteredTextInTheInput(locator);
        array = value.split(" ");
        fullDate = array[0].split("/")
        let formatedYear = fullDate[2].substring(2);
        return array[0].substring(0, array[0].length - 4) + formatedYear + ', ' + array[1] + ' ' + array[2];
    }

    async getOnlyFullDateFromDateTimeInput(locator){
        let fullDateTime = []
        let dateTimeValue = await this.getEnteredTextInTheInput(locator);
        fullDateTime = dateTimeValue.split(" ")
        let date = fullDateTime[0];
        return moment().format(date, 'M/D/YYYY');
    }
    async returnNumberWith$Sign(locator){
        let number = await this.getEnteredTextInTheInput(locator);
        return '$'+number;
    }

    async getEnteredTextInTheInput(locator){
        let input =  await this.find(locator);
        return input.getAttribute("value");
    }
    

    async clearInputField(locator){
        let element = await this.find(locator);
        await element.clear();
        await this.timeout(500)
    }
    
   
    async getElementFromAnArrayByIndex(locator, index){
        let elements = await this.findAll(locator);
        return await elements[index];
    }
    async clickElementReturnedFromAnArray(locator,index){
        let element = await this.getElementFromAnArrayByIndex(locator, index);
        await element.click();
    }
  
    async sendKeysToElementReturnedFromAnArray(locator,index,keys){
        let element = await this.getElementFromAnArrayByIndex(locator, index);
        await element.sendKeys(keys);
    }
    
    async getElementText(locator) {
        return await this.find(locator).getText();
    }

    
    async returnIndexWhenTextIsKnown(locator,text){
        let array = await this.findAll(locator)
        for(let i = 0; i < array.length; i++){
            if(await array[i].getText() === text){
                return i;
            }
        }
    }

    async getElementTextFromAnArrayByIndex(locator, index){
        let elements = await this.findAll(locator);
        return await elements[index].getText();
    }
    
    async sentKeys(locator, inputText) {
        await this.find(locator).sendKeys(inputText)
    }
    
    async moveToElement(locator) {
        const actions = this.driver.actions({bridge: true});
        let element = await this.find(locator);
        await actions.move({duration:500,origin:element,x:0,y:0}).perform();
    }

    async moveToElementFromArrayByIndex(locator,index) {
        const actions = this.driver.actions({bridge: true});
        let elements = await this.findAll(locator);
        let element = elements[index];
        await actions.move({duration:1000,origin:element,x:0,y:0}).perform();
    }
    
   
    async scrollToView(locator){
        let element = await this.find(locator)
        await this.driver.executeScript("arguments[0].scrollIntoView();", element);
    }
    
    async switchToAnIframe(locator){
        let frame = await this.find(locator)
        await this.driver.switchTo().frame(frame);
    }
    
    async isDisplayed(locator,timeout) {
        if (timeout){
            await this.driver.wait(until.elementLocated(locator), timeout)
            await this.driver.wait(until.elementIsVisible(this.find(locator)), timeout)
            await this.driver.wait(until.elementIsEnabled(this.find(locator)), timeout)
            await this.timeout(500)
            return true
        } else{
            try {
                return await this.find(locator).isDisplayed()
            } catch (error) {
                return false
            }
        }
    }
    async timeout(ms) {
        return await new Promise(resolve => setTimeout(resolve, ms));
    }
    async elementByTextWithoutSpacesIsDisplayed(text){
        await this.isDisplayed(this.driver.findElement(By.xpath("//*[text()='"+text+"']")));
    }

    async locateElementByTextAndClick(text){
        let element = await this.driver.findElement(By.xpath("//*[text()='"+text+"']"));
        await element.click();
    }

    async getOriginalWindowOrTab(){
        return await this.driver.getWindowHandle();
    }

    async switchToNewlyOpenedWindowOrTab(originalWindow){
        const windows = await this.driver.getAllWindowHandles();
        for (const window of windows) {
            if (window !== originalWindow) {
                await this.driver.switchTo().window(window);
            }
        }
    }

    async getChildTextByParentIndexAndChildIndex(locator, parentIndex, childIndex) {
        let parent = await this.findAll(locator);
        let children = await parent[parentIndex].findElements(By.xpath("./child::*"));
        return await children[childIndex].getText();
    }

    async scrollUpOrDown(vertical){
        await this.driver.executeScript(`window.scrollBy(0,${vertical}), ""`);
    }

    async sentKeysToChildByIndexAndParentIndex(locator, parentIndex, childIndex, keys) {
        let parent = await this.findAll(locator);
        let children = await parent[parentIndex].findElements(By.xpath("./child::*"));
        return await children[childIndex].sendKeys(keys);
    }

    async returnImgSrcAttribute(locator){
        await this.timeout(2000)
        let img = await this.find(locator);
        return await img.getAttribute('src');
    }

    async getPlaceholderTextFromInputByIndex(locator, index){
        let inputs =  await this.findAll(locator);
        let input = inputs[index];
        return input.getAttribute("placeholder");
    }

    async getSubstringOfPriceString(locator){
        let result = await this.getElementText(locator);
        return result.substring(1);
    }

    async clearInputFieldByIndexAndSendKeys(locator , index, keys){
        let elements = await this.findAll(locator);
        let element = elements[index];
        await element.clear();
        await element.sendKeys(keys);
    }

    async getElementTextForTheLastElementFromAnArray(locator){
        let elements = await this.findAll(locator);
        let element = await elements[elements.length - 1]
        return element.getText();
    }
    
}

module.exports = BasePage;