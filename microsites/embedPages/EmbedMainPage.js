   const BasePage = require('../../BasePage');
   const Alerts = require('../../portal/portalComponents/Alerts')
   const assert = require('assert')
   const IFRAME = { id: "uwWidget"}
   const EVENT_NAME = { className: 'event-title' }
   const NO_TICKETS_MESSAGE = { xpath: "//p[contains(@class, 'pt-5')]" }
   const NEXT_BUTTON = { xpath: "//*[text()='Next']"}
   const CONFIRM_PAYMENT_BUTTON = { xpath: "//*[text()='Confirm Payment']"}
   const SELECT_PAYMENT_BUTTON = { xpath: "//*[text()='Select Payment']"}
   const SOLD_OUT_MESSAGE = { xpath: "//div[contains(@class , 'quantity-container')]//span" }
   const TERMS_LABEL = { xpath: "//label[@for='isSavedCheck']"}
   const TERMS_CHECKBOX = { xpath: "//input[@type='checkbox']"}
   const PREVIOUS_PAGE_BUTTON = { xpath: "//button[contains(@class, 'embed-previous-btn')]"}
   const EVENT_INFO_BANNER = { xpath: "//span[@class='title-new']" }
   const LOGIN_LINK = { linkText: "Login" }
   const CREATE_LINK = { linkText: "Create" }
   const CREATE_LOGIN_MODAL = { xpath: "//div[@class='modal-content']" }
   const LOGOUT_LINK = { linkText: "Logout" }
   const WELCOME_MESSAGE = { xpath: "//p[contains(@class, 'login_text')]" }




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
      
      async login_createModalIsDisplayed(){
         await this.isDisplayed(CREATE_LOGIN_MODAL, 5000);
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
      
      async clickConfirmPaymentButton(){
         await this.isDisplayed(CONFIRM_PAYMENT_BUTTON, 5000);
         await this.click(CONFIRM_PAYMENT_BUTTON)
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

      async ticketTermsLabelIsDisplayedAndAssertText(){
         await this.isDisplayed(TERMS_LABEL, 5000);
         await this.timeout(500)
         let label = await this.getElementText(TERMS_LABEL);
         assert.equal(label, "Ticket Terms and Conditions");
      }

      async assertLabelColorChangedToRedAfterClickNextAndNoTicketsSelected(){
         await this.timeout(500);
         await this.clickNextPageButton();
         let labelColor = await this.getFontColorFromAnArray(TERMS_LABEL,0);
         assert.equal(labelColor,'rgba(255, 0, 0, 1)');
      }

      async clickTermsLabel(){
         await this.click(TERMS_LABEL);
      }

      async clickTermsCheckboxAndAssertFontColorIsBlack(){
         await this.click(TERMS_CHECKBOX);
         await this.timeout(500);
         let labelColor = await this.getFontColorFromAnArray(TERMS_LABEL,0);
         assert.equal(labelColor,'rgba(33, 37, 41, 1)');
      }

      async clickTicketTermsCheckbox(){
         await this.timeout(500);
         await this.isDisplayed(TERMS_CHECKBOX, 5000);
         await this.timeout(500);
         await this.click(TERMS_CHECKBOX)
      }

      async clickPreviousPageButton(){
         await this.click(PREVIOUS_PAGE_BUTTON);
         await this.timeout(1000);
      }

      async assertNavbarText(text){
         await this.isDisplayed(EVENT_INFO_BANNER, 5000);
         let navbar = await this.getElementText(EVENT_INFO_BANNER);
         assert.equal(navbar, text);
      }

      async assertPreviousPageButtonText(text){
         await this.isDisplayed(PREVIOUS_PAGE_BUTTON, 5000 );
         let button = await this.getElementText(PREVIOUS_PAGE_BUTTON);
         assert.equal(button, text);
      }

      async assertAlertVisibleAndText(text){
         let alert = new Alerts(this.driver);
         await alert.alertDangerIsDisplayAndAssertText(text)
      }
      
      async clickLoginLink(){
         await this.isDisplayed(LOGIN_LINK, 5000);
         await this.click(LOGIN_LINK)
         await this.login_createModalIsDisplayed();
      }
      
      async clickCreateAccountLink(){
         await this.isDisplayed(CREATE_LINK, 5000);
         await this.click(CREATE_LINK);
         await this.login_createModalIsDisplayed();
      }
      
      async assertUserFirstNameAndLogoutLinkAreDisplayed(firstName){
         await this.isDisplayed(LOGOUT_LINK, 15000);
         let fullMessage = await this.getElementText(WELCOME_MESSAGE);
         let message = fullMessage.split("L")[0];
         let firstLetter = firstName.charAt(0)
         let slicedName = firstName.substring(1);
         let firstLetterCap = firstLetter.toUpperCase();
         assert.equal('Welcome back, '+ firstLetterCap+slicedName +'! Not you?  ', message)
      }
      
      async getTransactionTimeDate(){
         return await this.dateTimeNow();
      }
      
      async clickSelectPaymentButton(){
         await this.isDisplayed(SELECT_PAYMENT_BUTTON, 5000)
         await this.click(SELECT_PAYMENT_BUTTON);
      }

      
   }
   module.exports = EmbedMainPage;

