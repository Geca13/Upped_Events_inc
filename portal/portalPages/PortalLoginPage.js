    const BasePage = require('../../BasePage');
    const SIGN_IN_BUTTON = { xpath: "//button[@type='submit']"}
    const EMAIL_INPUT = { css: "input[formControlName=email]" };
    const PASSWORD_INPUT = { css: "input[formControlName=password]" };

    class PortalLoginPage extends BasePage {
        constructor(driver){
            super(driver);
        }
       

        async loadPortalUrl(){
            //await this.visit('https://portal.pr-tickets.uppedevents.com/')
            await this.visit('https://dev.portal.uppedevents.com/')
            //await this.returnBrowserName();
           await this.timeout(1000);
        }
        async isAtPortalLoginPage(){
            await this.isDisplayed(SIGN_IN_BUTTON, 90000)
        }


        async enterValidCredentialsAndLogin(){
            //await this.sentKeys(EMAIL_INPUT,"louis@uppedevents.com");
            await this.sentKeys(EMAIL_INPUT,"vardar123@vardar123.mk");
            await this.sentKeys(PASSWORD_INPUT,"Test@123");
            await this.click(SIGN_IN_BUTTON)
        }
        

    }

    module.exports = PortalLoginPage;
