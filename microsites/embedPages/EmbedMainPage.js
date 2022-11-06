   const BasePage = require('../../BasePage');
   const Alerts = require('../../portal/portalComponents/Alerts')
   const assert = require('assert')
   const IFRAME = { id: "uwWidget"}
   const EVENT_NAME = { className: 'event-title' }
   const NO_TICKETS_MESSAGE = { xpath: "//p[contains(@class, 'pt-5')]" }
   const NEXT_BUTTON = { xpath: "//*[text()='Next']"}
   const SOLD_OUT_MESSAGE = { xpath: "//div[contains(@class , 'quantity-container')]//span" }
   const TERMS_LABEL = { xpath: "//label[@for='isSavedCheck']"}
   const TERMS_CHECKBOX = { xpath: "//input[@type='checkbox']"}



   class EmbedMainPage extends BasePage {
      constructor(driver) {
         super(driver);
      }

      async openEmbedPage(){
         await this.visit('https://dummy.dev.uppedevents.com/');
      }
      async switchToIframe(){
         await this.isDisplayed(IFRAME , 20000)
         await this.switchToAnIframe(IFRAME);

      }

      async getNewlyOpenedTab(originalWindow){
         await this.switchToNewlyOpenedWindowOrTab(originalWindow);
      }

      async isInFrame(eventName){
         await this.driver.executeScript("document.body.style.transform='scale(0.8, 0.8)'");
         await this.timeout(5000);
         await this.isDisplayed(EVENT_NAME,5000);
         let extractedEventName = await this.getElementText(EVENT_NAME);
         assert.equal(eventName,extractedEventName)
         await this.timeout(1000)

      }

      async assertSoldOutMessageIsDisplayed(){
         await this.isDisplayed(SOLD_OUT_MESSAGE,5000);
         let message = await this.getElementText(SOLD_OUT_MESSAGE);
         assert.equal(message, "Sold out!");
      }

      async assertNoTicketsMessageIsDisplayed(){
         await this.isDisplayed(NO_TICKETS_MESSAGE,5000);
         let message = await this.getElementText(NO_TICKETS_MESSAGE);
         assert.equal(message, "No tickets are currently available for this event");
      }

      async nextButtonIsVisible(){
         await this.isDisplayed(NEXT_BUTTON,5000);
         await this.timeout(500);

      }
      async clickNextPageButton(){
         await this.nextButtonIsVisible();
         await this.moveToElement(NEXT_BUTTON);
         await this.click(NEXT_BUTTON)
         await this.timeout(500);
      }

      async limitInfoMessageIsDisplayed(number){
         let info = new Alerts(this.driver);
         await info.correctInfoMessageIsDisplayed("You have exceeded maximum (" + number + ") limit to buy tickets");
         await this.timeout(5000);
      }

      async ticketTermsCheckBoxAndLabelAreNotDisplayed(){
         let termsCheckbox = await this.returnElementsCount(TERMS_CHECKBOX)
         assert.equal(termsCheckbox, 0);
         let termsLabel = await this.returnElementsCount(TERMS_LABEL);
         assert.equal(termsLabel, 0);
         await this.timeout(1000);
      }

      async ticketTermsCheckBoxAndLabelAreDisplayed(){
         let termsCheckbox = await this.returnElementsCount(TERMS_CHECKBOX)
         assert.equal(termsCheckbox, 1);
         let termsLabel = await this.returnElementsCount(TERMS_LABEL);
         assert.equal(termsLabel, 1);
      }

      
   }
   module.exports = EmbedMainPage;

