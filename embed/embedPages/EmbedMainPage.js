   const BasePage = require('../../BasePage');
   const assert = require('assert')
   const IFRAME = { id: "uwWidget"}
   const EVENT_NAME = { className: 'event-title' }
   const NO_TICKETS_MESSAGE = { xpath: "//p[contains(@class, 'pt-5')]" }

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

      

      async isInFrame(eventName){
         await this.driver.executeScript("document.body.style.transform='scale(0.8, 0.8)'");
         await this.timeout(5000);
         await this.isDisplayed(EVENT_NAME,5000);
         let extractedEventName = await this.getElementText(EVENT_NAME);
         assert.equal(eventName,extractedEventName)
         await this.timeout(1000)

      }

     

      async assertNoTicketsMessageIsDisplayed(){
         await this.isDisplayed(NO_TICKETS_MESSAGE,5000);
         let message = await this.getElementText(NO_TICKETS_MESSAGE);
         assert.equal(message, "No tickets are currently available for this event");
      }

      
   }
   module.exports = EmbedMainPage;

