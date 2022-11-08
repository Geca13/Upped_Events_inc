    const { Builder } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const Inbox = require("../helpers/Inbox");
    const CreateAccountPage = require("../microsites/embedPages/CreateAccountPage");
    const PortalLoginPage = require('../portal/portalPages/PortalLoginPage');
    const SettingsNav = require('../portal/ticketing/SettingsNav/SetingsNav');
    const TaxesAndFeesPage = require('../portal/ticketing/SettingsNav/TaxesAndFeesPage');
    const EventTickets = require('../portal/ticketing/EventTickets');
    const LoginPage = require('../microsites/embedPages/LoginPage')
    const DashboardPage = require('../portal/dashboard/Dashboard');
    const CreateEventModal = require('../portal/portalModals/CreateEventModal');
    const DateTimePickerModal = require('../portal/portalModals/DateTimePickerModal');
    const MyEventsPage = require('../portal/dashboard/MyEventsTab');
    const EventOptionTabs = require('../portal/eventOverview/EventOptionTabs');
    const SideMenu = require('../portal/portalComponents/SideMenu');
    const SectionsNavs = require('../portal/portalComponents/SectionsNavs');
    const CreateTicketModal = require('../portal/portalModals/CreateTicketModal');
    const TicketsNav = require('../portal/ticketing/TicketsNav');
    const GeneralDetailsTab = require('../portal/eventOverview/GeneralDetailsTab');
    const EmbedMainPage = require("../microsites/embedPages/EmbedMainPage");
    const TicketsComponent = require("../microsites/components/TicketsComponent");
    const EmbeddingPage = require("../portal/eventOverview/DesignNav/EmbeddingPage");
    const Files = require('../helpers/Files')
    const SummaryComponent = require("../microsites/components/SummaryComponent");
    const AddMoneyComponent = require("../microsites/components/AddMoneyComponent")
    const PaymentPage = require('../microsites/embedPages/PaymentPage')
    const EmbedOrderDetailsPage = require("../microsites/embedPages/EmbedOrderDetailsPage");
    const ConfirmPage = require("../microsites/embedPages/ConfirmPage");
    const ExtrasPage = require("../microsites/embedPages/ExtrasPage");
    const EventCapacitySubNav = require('../portal/ticketing/SettingsNav/EventCapacitySubNav')
    const AttendeesTab = require('../portal/eventOverview/AttendeesTab')
    const TicketTermsPage = require('../portal/ticketing/SettingsNav/TicketTermsPage')
    const TicketTermsModal = require('../microsites/components/TicketTermsModal');
    const DonationPage = require('../portal/eventOverview/eventSettings/DonationsPage')
    const DonateComponent = require('../microsites/components/DonateComponent')
    const PromotionsPage = require('../portal/promotions/PromotionsPage');
    const CreatePromotionModal = require('../portal/portalModals/CreatePromotionModal');
    const ReceiptPopup = require('../microsites/components/ReceiptPopup')
    const StepsComponent = require('../microsites/components/StepsComponent')
    const TicketQuestionsModal = require('../microsites/components/TicketQuestionsModal')
    const TicketQuestionsPage = require('../portal/ticketing/SettingsNav/TicketQuestionsPage')
    

    describe('Should do embed tests', function () {
        this.timeout(500000);
        let driver;
        let portalLogin;
        let dashboard;
        let createEvent;
        let myEvents;
        let dateTime;
        let eventOptionTabs;
        let createTicket;
        let ticketsNav;
        let eventDetails;
        let main;
        let embedTickets;
        let embedding;
        let files;
        let sideMenu;
        let sectionsNavs;
        let embedLogin;
        let inbox;
        let createAccount;
        let originalWindow;
        let ticketSettings;
        let taxesAndFees;
        let eventTickets;
        let summary;
        let addMoney;
        let payment;
        let orderDetails;
        let extras;
        let confirm;
        let capacity;
        let attendees;
        let ticketTerms;
        let termsModal;
        let donation;
        let donate;
        let promotions;
        let newPromotion;
        let receipt;
        let steps;
        let questionsModal;
        let questions;

        let base =  Math.floor(100000 + Math.random() * 900000);
        let eventName =  base.toString() + " FullEventName";
        let shortName = base.toString();
        let ticketOneName = base.toString() +"T1";
        let embedTicketQuantity = 2;
        let ticketOneQuantity = 999;
        let ticketOnePrice = "1.00";
        let ticketTwoName = base.toString() +"T2";
        let ticketTwoQuantity = 888;
        let ticketTwoPrice = "1.20";
        let ticketThreeName = base.toString() +"T3";
        let ticketThreeQuantity = 777;
        let ticketThreePrice = "0.75";
        let ticketFourName = base.toString() +"T4";
        let ticketFourQuantity = 666;
        let ticketFourPrice = "0.40";
        let staffTicket = base.toString() +"staff";
        let ticketStaffQuantity = 2;
        let ticketStaffPrice = "0.25";
        let promoOneName = base.toString() +"PN1";
        let promoThreeName = base.toString() +"PN3";
        let promoCodeOne = base.toString() +"PC1";
        let promoCodeThree = base.toString() +"PC3";
        let ticketGroupOne = base.toString() +"TG1";
        let ticketGroupTwo = base.toString() +"TG2";
        let ticketGroupThree = base.toString() +"TG3";
        let customerFirstName = 'cfn'+base.toString();
        let customerLastName = 'cln'+base.toString();
        let customerEmail = customerFirstName + '@' + customerLastName+'.com';
        let customerPassword = base.toString() + 'Password';

        beforeEach(async function(){
            driver = new Builder().forBrowser('chrome')
                .setChromeOptions(new chrome.Options().addArguments('--headless'))
                .build();
            await driver.manage().window().setRect({width: 1300, height: 1080});
        });

        afterEach(async function(){
            await driver.quit()
        })

       
        //PORTAL
        it('Test_01 - should create new event and verify data in events page and General Details',async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            createEvent = new CreateEventModal(driver);
            myEvents = new MyEventsPage(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await driver.sleep(1000);
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await dashboard.clickCreateEventButton();
            await createEvent.createEventModalIsDisplayed();
            await createEvent.fillFormWithValidDataAndSave(eventName,shortName);
        });
        
        //PORTAL
        it('Test_02 - should create first ticket and check data in tickets table and update modal ',async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            eventOptionTabs = new EventOptionTabs(driver);
            ticketsNav = new TicketsNav(driver);
            createTicket = new CreateTicketModal(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await eventDetails.clickPublishButton()
            await eventDetails.unpublishButtonIsDisplayed();
            await eventOptionTabs.ticketingTabIsDisplayed();
            await eventOptionTabs.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickAddTicketButton();
            await createTicket.createFirstTicketAndAssertDataOnTicketsAndUpdate(ticketOneName,ticketOnePrice,embedTicketQuantity);

        });
        
        //PORTAL -> EMBED
        it('Test_03 - should make embed view for event', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver)
            embedding = new EmbeddingPage(driver);
            files = new Files(driver);
            main = new EmbedMainPage(driver);
            
            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await driver.sleep(2000);
            await sectionsNavs.clickNavByIndex(1);
            await embedding.isOnEmbeddingTab();
            await embedding.setEmbedViewForEvent();
            await sideMenu.clickEventFullNameTab();
            await eventDetails.unpublishButtonIsDisplayed();
            let text = await eventDetails.getEmbedScriptVariable();
            await files.openDummyPage();
            await files.loginToDummy();
            await files.clickIndexHtmlLink();
            await files.editCode(text);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);

        });
        
        //EMBED
        it('Test_04 - should get no tickets available message on embed when tickets are not activated ',async function () {

            main = new EmbedMainPage(driver);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.assertNoTicketsMessageIsDisplayed()

        });

        //PORTAL -> EMBED
        it('Test_05 - should check button text when tickets are in the future ',async function () {
            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            ticketsNav = new TicketsNav(driver);
            createTicket = new CreateTicketModal(driver);
            dateTime = new DateTimePickerModal(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickActivateTicketToggle(ticketOneName);
            await ticketsNav.clickEditTicketButton(0);
            await createTicket.ticketNameInputIsDisplayed();
            await createTicket.clickStartDateTimeInput();
            await dateTime.datePickerIsVisible();
            await dateTime.updateTimeToXMinLater(1);
            await dateTime.clickSetButton();
            await createTicket.clickEndDateTimeInput();
            await dateTime.datePickerIsVisible();
            await dateTime.updateHourByOne();
            await createTicket.clickSaveTicketButton();
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.assertNumberOfTickets(1);
            await embedTickets.assertTicketNotAvailableMessageIsDisplayed();
            await embedTickets.assertFullTicketNameDisplay(ticketOneName, ticketOnePrice);
        });

        //EMBED
        it('Test_06 - should assert create account button is disabled on create account modal in embed until fields are empty', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            createAccount = new CreateAccountPage(driver);
            inbox = new Inbox(driver);
            originalWindow = inbox.getOriginalWindow();

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.clickRegisterLink();
            await createAccount.assertCreateAccountButtonIsDisabledUntilFieldsArePopulated();

        });

        //EMBED
        it('Test_07 - should create new account on embed login and get success login message', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            createAccount = new CreateAccountPage(driver);
            inbox = new Inbox(driver);
            originalWindow = inbox.getOriginalWindow();

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.nextButtonIsVisible();
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.clickRegisterLink();
            await createAccount.createAccountOnEmbed(customerFirstName,customerLastName,customerEmail,customerPassword);
            await inbox.loadInbox();
            await inbox.elementIsDisplayedInInbox('<'+customerEmail+'>');
            await inbox.findAndClickTheEmailForNewAccount('<'+customerEmail+'>');
            await inbox.switchToInboxIFrame();
            await inbox.verifyEmailButtonIsDisplayed();
            await inbox.verifyEmail();
            await driver.switchTo().defaultContent();
            await main.getNewlyOpenedTab(originalWindow);
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerEmail);
            await driver.sleep(2000);

        });

        //PORTAL
        it('Test_08 - should add excluded tax and check if bayer total is updated in ticket update modal', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver)
            ticketsNav = new TicketsNav(driver);
            createTicket = new CreateTicketModal(driver);
            ticketSettings = new SettingsNav(driver);
            taxesAndFees = new TaxesAndFeesPage(driver);
            eventTickets = new EventTickets(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
            await createTicket.ticketNameInputIsDisplayed();
            await createTicket.assertTicketPriceEqualsBuyerTotalPriceWhenNoTaxesOrFees();
            await createTicket.closeCreateUpdateTicketModal();
            await ticketsNav.addTicketButtonIsDisplayed();
            await sectionsNavs.clickNavByText("Settings")
            await ticketSettings.taxesAndFeesSubTabIsDisplayed();
            await ticketSettings.clickTaxesAndFeesSubNav();
            await taxesAndFees.addOneTaxForTickets();
            await taxesAndFees.clickSaveTaxesAndFeesButton();
            let savedTaxValue = await taxesAndFees.getFloatNumberForTaxOrFee(1,1);
            await eventTickets.clickTicketsTab();
            await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
            await createTicket.assertBuyerTotalEqualsTicketPriceMultipliedByTaxPercentage(savedTaxValue);

        });

        //PORTAL
        it('Test_09 - should remove tax and add $ value fee and assert price in update modal', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            ticketsNav = new TicketsNav(driver);
            createTicket = new CreateTicketModal(driver);
            ticketSettings = new SettingsNav(driver);
            taxesAndFees = new TaxesAndFeesPage(driver);
            eventTickets = new EventTickets(driver)
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await eventTickets.clickSettingsTab();
            await ticketSettings.taxesAndFeesSubTabIsDisplayed();
            await ticketSettings.clickTaxesAndFeesSubNav();
            await taxesAndFees.clickRemoveTaxOrFeeButtonByIndex(0);
            await taxesAndFees.clickSaveTaxesAndFeesButton();
            await eventTickets.clickTicketsTab();
            await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
            await createTicket.ticketNameInputIsDisplayed();
            await createTicket.assertTicketPriceEqualsBuyerTotalPriceWhenNoTaxesOrFees();
            await createTicket.closeCreateUpdateTicketModal();
            await ticketsNav.addTicketButtonIsDisplayed();
            await eventTickets.clickSettingsTab();
            await ticketSettings.taxesAndFeesSubTabIsDisplayed();
            await ticketSettings.clickTaxesAndFeesSubNav();
            await taxesAndFees.set$FeeForTickets("Check $ Fee", ".17");
            await taxesAndFees.clickSaveTaxesAndFeesButton();
            let saved$FeeValue = await taxesAndFees.get$FeeFromInputByIndex(1);
            await eventTickets.clickTicketsTab();
            await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
            await createTicket.assertBuyerTotalEqualsTicketPricePlus$Fee(saved$FeeValue);

        });

        it('Test_10 - should add excluded tax again and check if bayer total is updated in ticket update modal', async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            ticketsNav = new TicketsNav(driver);
            createTicket = new CreateTicketModal(driver);
            ticketSettings = new SettingsNav(driver);
            taxesAndFees = new TaxesAndFeesPage(driver);
            eventTickets = new EventTickets(driver)
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await eventTickets.clickSettingsTab();
            await ticketSettings.taxesAndFeesSubTabIsDisplayed();
            await ticketSettings.clickTaxesAndFeesSubNav();
            await taxesAndFees.addOneTaxForTickets();
            await taxesAndFees.clickSaveTaxesAndFeesButton();
            let savedTaxValue = await taxesAndFees.getFloatNumberForTaxOrFee(1,1);
            let saved$FeeValue = await taxesAndFees.get$FeeFromInputByIndex(2);
            await eventTickets.clickTicketsTab();
            await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
            await createTicket.assertBuyerTotalEqualsTicketPriceMultipliedByTaxPercentageAndAdded$Fee(savedTaxValue, saved$FeeValue);

        });

        //EMBED
        it('Test_11 - should calculate subtotal and total on one ticket quantity 2 with tax and fee in embed', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketOneName, '2');
            await summary.calculateSubtotalAndTotalBeforeDonationIsAdded();
        });

        //EMBED
        it('Test_12 - should check if subtotal equals before and after login on embed', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            summary = new SummaryComponent(driver);
            embedLogin = new LoginPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketOneName, '2');
            let ticketsTotal = await summary.getTicketsTotal();
            let ticketsSubtotal = await summary.getSubtotalValue();
            let taxes = await summary.getTaxesValue();
            let fees = await summary.getFeesValue();
            let total = await summary.getTotalValue();
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await summary.assertSummaryEqualsBeforeSignIn( ticketsTotal, ticketsSubtotal, taxes, fees, total);

        });

        //EMBED
        it('Test_13 - should assert elements on Add Money component in embed', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            addMoney = new AddMoneyComponent(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketOneName, '2');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickNextPageButton();
            await addMoney.assertAddMoneyComponentElements();

        });

        //EMBED
        it('Test_14 - should assert elements on Payment screen component in embed when user has no cards', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            addMoney = new AddMoneyComponent(driver)
            payment = new PaymentPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketOneName, '2');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickNextPageButton();
            await addMoney.addMoneyComponentIsDisplayed();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.confirmElementsOnPayWithCardOrServiceTab();
            await payment.clickNewCardTab();
            await payment.isOnPayWithNewCardTab();
            await payment.confirmElementsOnPayWithNewCardTab();

        });

        //EMBED
        it('Test_15 - should assert elements on Order Details screen when payment with wallet', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            addMoney = new AddMoneyComponent(driver)
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketOneName, '2');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickNextPageButton();
            await addMoney.addMoneyComponentIsDisplayed();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickPayWithWalletButton();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.assertElementsWhenOneTicketIsSelected(ticketOneName);

        });

        //EMBED
        it('Test_16 - should click payment info edit link on Order Details and assert landing on Payment screen', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            addMoney = new AddMoneyComponent(driver)
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketOneName, '2');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickNextPageButton();
            await addMoney.addMoneyComponentIsDisplayed();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickPayWithWalletButton();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickEditPaymentLinkAndAssertItIsOnPaymentPage();

        });

        //EMBED
        it('Test_17 - should make payment with new card in embed and assert card is saved',async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInput(0, 2)
            await main.nextButtonIsVisible();
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithEmailAndPassword(customerEmail, customerPassword);
            await main.nextButtonIsVisible();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.clickNewCardTab();
            await payment.fillValidDataOnCardOnTheEmbed(customerFirstName,customerLastName);
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();

        });

        //PORTAL -> EMBED
        it('Test_18 - should get Sold out message when there is no qty available for selected ticket in embed', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            ticketsNav = new TicketsNav(driver);
            main = new EmbedMainPage(driver);
            sectionsNavs = new SectionsNavs(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.assertQuantityEqualsSoldColumnByTicket(ticketOneName);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.assertSoldOutMessageIsDisplayed();

        });

        //EMBED
        it('Test_19 - should check that if available tickets are less then 100 the tickets dropdown in embed is the same that number', async function () {
            portalLogin = new PortalLoginPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            ticketsNav = new TicketsNav(driver);
            createTicket = new CreateTicketModal(driver);
            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await driver.sleep(1000);
            await portalLogin.enterValidCredentialsAndLogin();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
            await createTicket.updateTicketQuantity("50");
            await ticketsNav.addTicketButtonIsDisplayed();
            let availableTickets = await ticketsNav.calculateAvailableTicketsByTicket(ticketOneName);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await driver.sleep(7000);
            await embedTickets.assertDropDownElementsEqualsAvailableTickets(availableTickets)

        });

        //EMBED
        it('Test_20 - should update ticket quantity and check that if available tickets are more then 100 the tickets dropdown in embed is limited to 100', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            ticketsNav = new TicketsNav(driver);
            createTicket = new CreateTicketModal(driver);
            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await driver.sleep(5000);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
            await createTicket.updateTicketQuantity(ticketOneQuantity);
            await ticketsNav.addTicketButtonIsDisplayed();
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.assertDropDownElementsEquals("100");

        });

        //PORTAL -> EMBED
        it('Test_21 - should limit the tickets per account and check if all dropdowns are at that maximum in the embed', async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver)
            capacity = new EventCapacitySubNav(driver);
            ticketsNav = new TicketsNav(driver);
            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await sectionsNavs.clickNavByText("Settings");
            await sectionsNavs.taxesAndFeesNavIsDisplayed();
            await sectionsNavs.clickSubNavByText("Event Capacity");
            await capacity.setLimitPerAccount("26");
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.assertDropDownElementsEquals("26");
        });

        // PORTAL -> EMBED
        it('Test_22 - should get exceeding limitation message when user have already purchased tickets and asks for more then limit', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver);
            attendees = new AttendeesTab(driver);
            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            addMoney = new AddMoneyComponent(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await sideMenu.ticketingTabIsDisplayed();
            await sectionsNavs.clickNavByText("Attendees")
            await attendees.isOnAttendeesTab();
            let purchasedTickets = await attendees.getAlreadyPurchasedByCustomerFullName(customerFirstName, customerLastName);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInput(0, 26);
            let accountAvailable = 26-parseInt(purchasedTickets);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickNextPageButton();
            await main.limitInfoMessageIsDisplayed(accountAvailable);
            await embedTickets.sentKeysToTicketInput(0, accountAvailable);
            await main.clickNextPageButton();
            await addMoney.addMoneyComponentIsDisplayed();
        });

        //PORTAL
        it('Test_23 - should remove limitation on tickets per account ',async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver);
            capacity = new EventCapacitySubNav(driver);
            ticketsNav = new TicketsNav(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await driver.sleep(2000);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await sectionsNavs.clickNavByText("Settings")
            await sectionsNavs.taxesAndFeesNavIsDisplayed();
            await sectionsNavs.clickSubNavByText("Event Capacity");
            await capacity.removeLimit();

        });

        //EMBED
        it('Test_24 - should assert when wallet was selected on start then edited to card , the card info is in Order Details', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            addMoney = new AddMoneyComponent(driver)
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketOneName, '2');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickNextPageButton();
            await addMoney.addMoneyComponentIsDisplayed();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickPayWithWalletButton();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.walletOptionIsDisplayedAndAssertText();
            await orderDetails.clickEditPaymentLinkAndAssertItIsOnPaymentPage();
            await payment.clickSavedCardByIndex(0);
            let cardData = await payment.getSelectedCardData();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.assertSelectedCardIsDisplayedAndAssertData(cardData);

        });

        //EMBED
        it('Test_25 - should click ticket edit link on Order Details and assert landing on Ticketing screen', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            addMoney = new AddMoneyComponent(driver)
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketOneName, '2');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickNextPageButton();
            await addMoney.addMoneyComponentIsDisplayed();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickPayWithWalletButton();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickEditLinkOnDisplayedTicketAssertIsOnTicketsPage(embedTickets);

        });

        //EMBED
        it('Test_26 - should make payment with wallet and assert elements on Confirmation page', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            addMoney = new AddMoneyComponent(driver)
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketOneName, '2');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickNextPageButton();
            await addMoney.addMoneyComponentIsDisplayed();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickPayWithWalletButton();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();
            await confirm.assertElementsOnConfirmPage();

        });

        //PORTAL
        it('Test_27 - should create three more tickets and ticket groups, then assert data in tickets table ',async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            ticketsNav = new TicketsNav(driver);
            createTicket = new CreateTicketModal(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.createTicketsGroup(ticketGroupOne);
            await ticketsNav.successTicketGroupBannerIsDisplayed();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.createTicketsGroup(ticketGroupTwo);
            await ticketsNav.clickGroupTabByIndex(2);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickAddTicketButton();
            await createTicket.ticketNameInputIsDisplayed();
            await createTicket.createNewTicket(ticketTwoName,ticketTwoPrice,ticketTwoQuantity);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.createdTicketIsInTheTable(ticketTwoName);
            await ticketsNav.clickActivateTicketToggle(ticketTwoName);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickAddTicketButton();
            await createTicket.ticketNameInputIsDisplayed();
            await createTicket.createNewTicket(ticketThreeName,ticketThreePrice,ticketThreeQuantity);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.createdTicketIsInTheTable(ticketThreeName);
            await ticketsNav.clickActivateTicketToggle(ticketThreeName);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.createTicketsGroup(ticketGroupThree);
            await ticketsNav.clickGroupTabByIndex(3);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickAddTicketButton();
            await createTicket.ticketNameInputIsDisplayed();
            await createTicket.createNewTicket(ticketFourName,ticketFourPrice,ticketFourQuantity);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.createdTicketIsInTheTable(ticketFourName);
            await ticketsNav.clickActivateTicketToggle(ticketFourName);
            await ticketsNav.clickGroupTabByIndex(0);
            await ticketsNav.assertTicketGroupNames(ticketGroupOne, ticketGroupTwo, ticketGroupThree);
            await ticketsNav.assertTicketNamePriceAndQuantity(ticketOneName,ticketOnePrice,ticketOneQuantity);
            await ticketsNav.assertTicketNamePriceAndQuantity(ticketTwoName,ticketTwoPrice,ticketTwoQuantity);
            await ticketsNav.assertTicketNamePriceAndQuantity(ticketThreeName,ticketThreePrice,ticketThreeQuantity);
            await ticketsNav.assertTicketNamePriceAndQuantity(ticketFourName,ticketFourPrice,ticketFourQuantity);

        });

        // PORTAL -> EMBED
        it('Test_28 - should assert that ticket terms elements in embed are not displayed when not created in portal', async function () {
            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            sideMenu = new SideMenu(driver);
            ticketsNav = new TicketsNav(driver);
            eventTickets = new EventTickets(driver);
            ticketTerms = new TicketTermsPage(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await eventTickets.clickSettingsTab();
            await ticketTerms.termsPageIsDisplayed();
            await ticketTerms.assertTicketTermsIsEmpty();
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.ticketTermsCheckBoxAndLabelAreNotDisplayed();
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.ticketTermsCheckBoxAndLabelAreNotDisplayed()

        });

        // PORTAL
        it('Test_29 - should set ticket terms in the portal and assert entered tags and text', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            sideMenu = new SideMenu(driver);
            ticketsNav = new TicketsNav(driver);
            eventTickets = new EventTickets(driver);
            ticketTerms = new TicketTermsPage(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await eventTickets.clickSettingsTab();
            await ticketTerms.termsPageIsDisplayed();
            await ticketTerms.saveTerms();
            await ticketTerms.assertElementsInTheTermsBoxAfterSavingTerms();
        });

        // EMBED
        it('Test_30 - should assert that ticket terms are displayed only when user is logged in', async function () {
            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.ticketTermsCheckBoxAndLabelAreNotDisplayed();
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.ticketTermsCheckBoxAndLabelAreDisplayed();

        });

        // EMBED
        it('Test_31 - should assert correct ticket terms behaviour and image placeholder', async function () {
            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            termsModal = new TicketTermsModal(driver);
            addMoney = new AddMoneyComponent(driver)
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.ticketTermsLabelIsDisplayedAndAssertText();
            await main.assertLabelColorChangedToRedAfterClickNextAndNoTicketsSelected();
            await main.clickTermsLabel();
            await termsModal.checkFirstTicketTermsScenarioElementsAndClose();
            await main.clickTermsCheckboxAndAssertFontColorIsBlack();
            await main.clickTermsLabel();
            await termsModal.termsModalIsDisplayed();
            await main.clickTermsLabel();
            await termsModal.termsModalIsNotDisplayed();
            await embedTickets.sentKeysToTicketInput(0, 2);
            await main.clickNextPageButton();
            await addMoney.addMoneyComponentIsDisplayed();

        });

        // PORTAL
        it('Test_32 - should set event banner in the portal', async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await eventDetails.setBannerImageInThePortalAndAssertElements();

        });

        // PORTAL -> EMBED
        it('Test_33 - should assert event banner image is present in the ticket terms modal', async function () {
            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            termsModal = new TicketTermsModal(driver);
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            let src = await eventDetails.getBannerImageSrc();
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickTermsLabel();
            await termsModal.assertTicketTermsImageSrcMatchBannerImageSrc(src);

        });

        // PORTAL
        it('Test_34 - should remove event banner in the portal', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await eventDetails.removeBannerImageAndAssertPreviewAndAlertAreNotDisplayed();

        });

        // EMBED
        it('Test_35 - should assert terms image placeholder is returned after banner is removed in the portal', async function () {
            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            termsModal = new TicketTermsModal(driver);
            embedTickets = new TicketsComponent(driver);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.ticketTermsLabelIsDisplayedAndAssertText();
            await main.assertLabelColorChangedToRedAfterClickNextAndNoTicketsSelected();
            await main.clickTermsLabel();
            await termsModal.assertImagePlaceholderIsDisplayedInTheModal("https://events.dev.uppedevents.com/assets/images/placeholder2.png");

        });

        //PORTAL
        it('Test_36 - should assert elements on donation page in portal and enable donations',async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver);
            donation = new DonationPage(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.ticketingTabIsDisplayed();
            await sectionsNavs.clickNavByText("Settings");
            await sectionsNavs.clickSubNavByText("Donations");
            await donation.assertElementsOnDonationPageOnStart();
            await donation.clickCheckboxAndAssertNewElements();
            await donation.enterDonationMessageAndSaveDonation();

        });

        //PORTAL - > EMBED
        it('Test_37 - should assert elements on donation page in the embed',async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver);
            donation = new DonationPage(driver);
            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            donate = new DonateComponent(driver)
            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.ticketingTabIsDisplayed();
            await sectionsNavs.clickNavByText("Settings");
            await sectionsNavs.subNavsAreDisplayed();
            let donationMessage = await donation.getDonationMessage();
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await donate.assertElementsOnDonateTab(eventName, donationMessage);

        });

        //EMBED
        it('Test_38 - should assert when donation button is clicked the amount is visible in donation input in the embed',async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            donate = new DonateComponent(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await donate.assertCorrectValuesInInputAfterDonationButtonIsClicked(0);
            await donate.assertCorrectValuesInInputAfterDonationButtonIsClicked(1);
            await donate.assertCorrectValuesInInputAfterDonationButtonIsClicked(2);
            await donate.assertCorrectValuesInInputAfterDonationButtonIsClicked(3);

        });

        //EMBED
        it('Test_39 - should assert when donation is added to order the amount is visible in Order Total in the embed',async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            donate = new DonateComponent(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await donate.addDonationToOrderAndAssertDataInOrderTotal(0);
            await donate.clickResetDonationButtonAndAssertInputIsReset();
            await donate.addDonationToOrderAndAssertDataInOrderTotal(1);
            await donate.clickResetDonationButtonAndAssertInputIsReset();
            await donate.addDonationToOrderAndAssertDataInOrderTotal(2);
            await donate.clickResetDonationButtonAndAssertInputIsReset();
            await donate.addDonationToOrderAndAssertDataInOrderTotal(3);
            await donate.clickResetDonationButtonAndAssertInputIsReset();

        });

        //EMBED
        it('Test_40 - should assert when custom donation is added to order the amount is visible in Order Total in the embed',async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            donate = new DonateComponent(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await donate.addCustomDonationAndAssertIsAddedInOrderTotal();

        });

        //EMBED
        it('Test_41 - should assert when donation is added to order calculates corectly in Order Total in the embed',async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            donate = new DonateComponent(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await donate.calculateTheOrderTotalAfterDonationIsAdded();

        });

        //EMBED
        it('Test_42 - should assert add / reset buttons disabled scenarios',async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            donate = new DonateComponent(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await donate.checkWhenInputValue0AddDonationButtonIsDisabledAndResetEnabled();
            await donate.clickOneDonationValueButton(2)
            await donate.checkWhenInputValueNot0AddDonationButtonIsEnabledAndResetDisabled();

        });

        //EMBED
        it('Test_43 - should click donation edit link on Order Details and assert landing on extras screen', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            donate = new DonateComponent(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await donate.clickOneDonationValueButton(2);
            await donate.clickAddDonationButton();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickPayWithWalletButton();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickEditDonationLinkAndAssertItIsOnExtrasPage(donate);

        });

        //PORTAL
        it('Test_44 - should create first promotion with $ value and assert data on promotions page and update promotion modal', async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            promotions = new PromotionsPage(driver);
            newPromotion = new CreatePromotionModal(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickPromotionsTab();
            await promotions.addPromotionButtonIsVisible();
            await promotions.clickAddPromotionButton();
            await newPromotion.addPromotionModalIsDisplayed();
            let promotion = await newPromotion.createPromotionForOneTicketWith$Value(ticketTwoName, promoOneName, promoCodeOne);
            await promotions.assertThe$PromotionIsSavedCorrectOnPromotionsPage(promotion);
            await promotions.findPromotionByNameAndClickUpdateButton(promotion[0]);
            await newPromotion.assertDataFromCreateEqualsUpdateData(promotion)
        });

        //PORTAL
        it('Test_45 - should create promotion for 3 tickets and limit qty on two', async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            promotions = new PromotionsPage(driver);
            newPromotion = new CreatePromotionModal(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickPromotionsTab();
            await promotions.clickAddPromotionButton();
            await newPromotion.addPromotionModalIsDisplayed();
            await newPromotion.newPromotionForThreeWithLimitOnTwo(ticketTwoName, ticketThreeName, ticketFourName, promoThreeName, promoCodeThree);
            await promotions.assertDataForPromotionWithThreeTicketsAndLimitOnTwoWithoutDateTime(promoThreeName, ticketTwoName,ticketTwoPrice);
            await promotions.findPromotionByNameAndClickUpdateButton(promoThreeName);
            await newPromotion.assertDataOnUpdateModalForPromotionWithThreeTicketsAndLimit(ticketTwoName, ticketThreeName, ticketFourName, promoThreeName, promoCodeThree)

        });

        //PORTAL -> EMBED
        it('Test_46 - should disable promotion and check for error message on embed', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            promotions = new PromotionsPage(driver);
            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickPromotionsTab();
            await promotions.addPromotionButtonIsVisible();
            await promotions.disablePromotionByPromoName(promoOneName);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInput(0, 2);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.enterPromoCode(promoCodeOne);
            await payment.clickApplyDiscountButton();
            await payment.invalidCodeMessagesAreShown("The entered promotion code does not exist.")

        });

        //PORTAL -> EMBED
        it('Test_47 - should enable promotion and check promotion is applied and input is hidden', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            promotions = new PromotionsPage(driver);
            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickPromotionsTab();
            await promotions.addPromotionButtonIsVisible();
            await promotions.enablePromotionByPromoName(promoOneName);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.successfullyAddedPromotionElementsAreShown(promoCodeOne);
            await payment.assertDiscountFormIsNotDisplayed();

        });

        //EMBED
        it('Test_48 - should add promo code and assert donation value + new price equals original ticket price in summary', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '1');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotionAndCheckTicketPriceEqualsNewPricePlusDiscount(promoCodeOne,ticketTwoPrice);

        });

        //EMBED
        it('Test_49 - should add promo code and assert new price and original price are displayed on tickets page next to ticket name', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '1');
            let originalPrice = await embedTickets.getTicketPriceByTicketName(ticketTwoName);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeOne);
            let discountedPrice = await summary.getTicketsTotal();
            await main.clickPreviousPageButton();
            await extras.isAtExtrasPage();
            await main.clickPreviousPageButton();
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.assertTheNewTicketPriceEqualsDiscountedPrice(ticketTwoName, discountedPrice);
            await embedTickets.assertNewTicketNamePricesLayout(ticketTwoName, originalPrice, discountedPrice);
            await embedTickets.assertFontColorAndStrikeOnOriginalPrice(ticketOneName);

        });

        //EMBED
        it('Test_50 - should assert when three different tickets selected three ticket edit links on Order details', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '2');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '2');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickPayWithWalletButton();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.assertNumberOfEditTicketsLinks(3);

        });

        //EMBED
        it('Test_51 - should assert when three different tickets selected all three tickets displayed in Order details', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '2');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '2');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            let tickets = await embedTickets.getListOfTicketsWhereQuantityIsBiggerThen0();
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickPayWithWalletButton();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.assertSelectedTicketsAreDisplayedInOrderDetails(tickets);

        });

        //EMBED
        it('Test_52 - should assert when three different tickets selected for each ticket total equals selected quantity times price', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, 2);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, 1);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, 3);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            let ticketThreeTotal = await embedTickets.selectedTicketTotal(ticketThreeName);
            let ticketTwoTotal = await embedTickets.selectedTicketTotal(ticketTwoName);
            let ticketFourTotal = await embedTickets.selectedTicketTotal(ticketFourName);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickPayWithWalletButton();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.assertTicketTotalByTicketName(ticketThreeName, ticketThreeTotal);
            await orderDetails.assertTicketTotalByTicketName(ticketTwoName, ticketTwoTotal);
            await orderDetails.assertTicketTotalByTicketName(ticketFourName, ticketFourTotal);

        });

        //EMBED
        it('Test_53 - should assert selected ticket quantity is displayed in the Order Total corectly', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '3');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '4');
            await embedTickets.assertTicketCountInOrderTotal(summary);

        });

        //EMBED
        it('Test_54 - should assert when order details tickets sum equals order total tickets value & summary tickets and subtotal', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '3');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '1');
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.confirmEnteredValuesBeforeLogin();
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickPayWithWalletButton();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.assertTicketsSumEqualsSubtotalAndOrderTotalTicketsAndSubtotalValues(summary);

        });

        //EMBED
        it('Test_55 - should make regular purchase with three different tickets and quantities and assert tickets on receipt', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            receipt = new ReceiptPopup(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, 2);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, 1);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, 3);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();
            await confirm.clickViewReceiptButton();
            await receipt.receiptPopupIsVisible();
            await receipt.assertTicketsOnReceipt(ticketTwoName,ticketThreeName,ticketFourName);

        });

        //EMBED
        it('Test_56 - should make regular purchase and check event name and date of purchase', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            receipt = new ReceiptPopup(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, 2);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickPlaceOrderButton();
            let timeDate = await orderDetails.getTransactionTimeDate();
            await confirm.isAtConfirmPage();
            await confirm.clickViewReceiptButton();
            await receipt.receiptPopupIsVisible();
            await receipt.timeDateAndEventName(timeDate, eventName);

        });

        //EMBED
        it('Test_57 - should assert text on navbar on all pages', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.assertNavbarText(eventName + " Ticketing");
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await main.assertNavbarText("Upped Login");
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.assertNavbarText(eventName + " Ticketing");
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, 2);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.assertNavbarText("Extras");
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await main.assertNavbarText("Payment");
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await main.assertNavbarText("Double check your order details");
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();
            await main.assertNavbarText("Confirmation");

        });

        //EMBED
        it('Test_58 - should assert previous page button text', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, 2);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.assertPreviousPageButtonText("Back to Event Info");
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await main.assertPreviousPageButtonText("Back to Extras");
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await main.assertPreviousPageButtonText("Back to Payment");

        });

        //EMBED
        it('Test_59 - when not logged in navigate to the login page with no tickets selected , when logged in alert select ticket should appear', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await main.assertAlertVisibleAndText("Please select a ticket first");

        });

        //EMBED
        it('Test_60 - should get alert danger when next button clicked and payment method not selected', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, 2);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await main.clickNextPageButton();
            await main.assertAlertVisibleAndText("Please select a payment method!");

        });

        //EMBED
        it('Test_61 - should assert steps names', async function () {

            main = new EmbedMainPage(driver);
            steps = new StepsComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await steps.assertStepNames();

        });

        //EMBED
        it('Test_62 - should assert completed steps count and current step name', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            steps = new StepsComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await steps.numberOfCompletedStepsAndCurrentStepName("Select Tickets",0);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await steps.numberOfCompletedStepsAndCurrentStepName("Select Tickets",0);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, 2);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await steps.numberOfCompletedStepsAndCurrentStepName("Add Extras",1);
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await steps.numberOfCompletedStepsAndCurrentStepName("Payment Details",2);
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await steps.numberOfCompletedStepsAndCurrentStepName("Review and Pay",3);
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();
            await steps.numberOfCompletedStepsAndCurrentStepName("All Done!",4);

        });

        //EMBED
        it('Test_63 - should assert completed steps checkmark image is displayed', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            steps = new StepsComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await steps.numberOfCompletedStepsAndCurrentStepName("Select Tickets",0);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await steps.numberOfCompletedStepsAndCurrentStepName("Select Tickets",0);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, 2);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await steps.checkThatCheckmarkImageIsDisplayedWhenStepIsCompeted();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await steps.checkThatCheckmarkImageIsDisplayedWhenStepIsCompeted();
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await steps.checkThatCheckmarkImageIsDisplayedWhenStepIsCompeted();
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();
            await steps.checkThatCheckmarkImageIsDisplayedWhenStepIsCompeted();

        });

        //EMBED
        it('Test_64 - should assert proper steps behaviour with fillin class on navbar on all pages', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            steps = new StepsComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await steps.checkIfFillinClassIsAppliedToStep(0,true);
            await steps.checkIfFillinClassIsAppliedToStep(1,false);
            await steps.checkIfFillinClassIsAppliedToStep(2,false);
            await steps.checkIfFillinClassIsAppliedToStep(3,false);
            await steps.checkIfFillinClassIsAppliedToStep(4,false);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await steps.checkIfFillinClassIsAppliedToStep(0,false);
            await steps.checkIfFillinClassIsAppliedToStep(1,false);
            await steps.checkIfFillinClassIsAppliedToStep(2,false);
            await steps.checkIfFillinClassIsAppliedToStep(3,false);
            await steps.checkIfFillinClassIsAppliedToStep(4,false);
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await steps.checkIfFillinClassIsAppliedToStep(0,true);
            await steps.checkIfFillinClassIsAppliedToStep(1,false);
            await steps.checkIfFillinClassIsAppliedToStep(2,false);
            await steps.checkIfFillinClassIsAppliedToStep(3,false);
            await steps.checkIfFillinClassIsAppliedToStep(4,false);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, 2);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await steps.checkIfFillinClassIsAppliedToStep(0,false);
            await steps.checkIfFillinClassIsAppliedToStep(1,true);
            await steps.checkIfFillinClassIsAppliedToStep(2,false);
            await steps.checkIfFillinClassIsAppliedToStep(3,false);
            await steps.checkIfFillinClassIsAppliedToStep(4,false);
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await steps.checkIfFillinClassIsAppliedToStep(0,false);
            await steps.checkIfFillinClassIsAppliedToStep(1,false);
            await steps.checkIfFillinClassIsAppliedToStep(2,true);
            await steps.checkIfFillinClassIsAppliedToStep(3,false);
            await steps.checkIfFillinClassIsAppliedToStep(4,false);
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await steps.checkIfFillinClassIsAppliedToStep(0,false);
            await steps.checkIfFillinClassIsAppliedToStep(1,false);
            await steps.checkIfFillinClassIsAppliedToStep(2,false);
            await steps.checkIfFillinClassIsAppliedToStep(3,true);
            await steps.checkIfFillinClassIsAppliedToStep(4,false);
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();
            await steps.checkIfFillinClassIsAppliedToStep(0,false);
            await steps.checkIfFillinClassIsAppliedToStep(1,false);
            await steps.checkIfFillinClassIsAppliedToStep(2,false);
            await steps.checkIfFillinClassIsAppliedToStep(3,false);
            await steps.checkIfFillinClassIsAppliedToStep(4,true);

        });

        //EMBED
        it('Test_65 - should assert proper steps behaviour with active class on navbar on all pages', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            steps = new StepsComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await steps.checkIfActiveClassIsAppliedToStep(0,true);
            await steps.checkIfActiveClassIsAppliedToStep(1,false);
            await steps.checkIfActiveClassIsAppliedToStep(2,false);
            await steps.checkIfActiveClassIsAppliedToStep(3,false);
            await steps.checkIfActiveClassIsAppliedToStep(4,false);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await steps.checkIfActiveClassIsAppliedToStep(0,false);
            await steps.checkIfActiveClassIsAppliedToStep(1,false);
            await steps.checkIfActiveClassIsAppliedToStep(2,false);
            await steps.checkIfActiveClassIsAppliedToStep(3,false);
            await steps.checkIfActiveClassIsAppliedToStep(4,false);
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await steps.checkIfActiveClassIsAppliedToStep(0,true);
            await steps.checkIfActiveClassIsAppliedToStep(1,false);
            await steps.checkIfActiveClassIsAppliedToStep(2,false);
            await steps.checkIfActiveClassIsAppliedToStep(3,false);
            await steps.checkIfActiveClassIsAppliedToStep(4,false);
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, 2);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await steps.checkIfActiveClassIsAppliedToStep(0,false);
            await steps.checkIfActiveClassIsAppliedToStep(1,true);
            await steps.checkIfActiveClassIsAppliedToStep(2,false);
            await steps.checkIfActiveClassIsAppliedToStep(3,false);
            await steps.checkIfActiveClassIsAppliedToStep(4,false);
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await steps.checkIfActiveClassIsAppliedToStep(0,false);
            await steps.checkIfActiveClassIsAppliedToStep(1,false);
            await steps.checkIfActiveClassIsAppliedToStep(2,true);
            await steps.checkIfActiveClassIsAppliedToStep(3,false);
            await steps.checkIfActiveClassIsAppliedToStep(4,false);
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await steps.checkIfActiveClassIsAppliedToStep(0,false);
            await steps.checkIfActiveClassIsAppliedToStep(1,false);
            await steps.checkIfActiveClassIsAppliedToStep(2,false);
            await steps.checkIfActiveClassIsAppliedToStep(3,true);
            await steps.checkIfActiveClassIsAppliedToStep(4,false);
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();
            await steps.checkIfActiveClassIsAppliedToStep(0,false);
            await steps.checkIfActiveClassIsAppliedToStep(1,false);
            await steps.checkIfActiveClassIsAppliedToStep(2,false);
            await steps.checkIfActiveClassIsAppliedToStep(3,false);
            await steps.checkIfActiveClassIsAppliedToStep(4,true);

        });

        //EMBED
        it('Test_66 - should make purchase for two tickets of same type with donation and promotion and assert data on the receipt', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            donate = new DonateComponent(driver)
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            receipt = new ReceiptPopup(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await donate.clickOneDonationValueButton(2);
            await donate.clickAddDonationButton();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeOne);
            await summary.discountIsDisplayed();
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            let tickets = await summary.getTicketsTotal();
            let donations = await summary.getDonationValue();
            let subtotal = await summary.getSubtotalValue();
            let taxes = await summary.getTaxesValue();
            let fees = await summary.getFeesValue();
            let discount = await summary.getDiscountValue();
            let total = await summary.getTotalValue();
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();
            await confirm.clickViewReceiptButton();
            await receipt.receiptPopupIsVisible();
            await receipt.assertDataFromSummaryEqualReceiptValues(tickets,donations,subtotal,taxes,fees,discount,total)

        });

        //EMBED
        it('Test_67 - should select four tickets exceeding the limit of promotion assert tickets total equals promoted plus regular prices in Order Details ', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '4');
            let originalPrice = await embedTickets.getCleanTicketPriceFromPriceWithBrackets(ticketTwoName);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeOne);
            await summary.discountIsDisplayed();
            await payment.exceedingPromotionQuantityAlertIsDisplayed();
            await main.clickPreviousPageButton();
            await extras.isAtExtrasPage();
            await main.clickPreviousPageButton();
            await embedTickets.ticketListIsDisplayed();
            let promotedPrice = await embedTickets.getCleanTicketPriceFromPriceWithBrackets(ticketTwoName);
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.assertPromotedPlusRegularPriceTotalIsDisplayed(originalPrice, promotedPrice);

        });

        //EMBED
        it('Test_68 - should make purchase with four tickets exceeding the limit of promotion assert promotion applied to only 3 tickets', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '4');
            let originalPrice = await embedTickets.getCleanTicketPriceFromPriceWithBrackets(ticketTwoName);
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeOne);
            await summary.discountIsDisplayed();
            await payment.exceedingPromotionQuantityAlertIsDisplayed();
            await main.clickPreviousPageButton();
            await extras.isAtExtrasPage();
            await main.clickPreviousPageButton();
            await embedTickets.ticketListIsDisplayed();
            let promotedPrice = await embedTickets.getCleanTicketPriceFromPriceWithBrackets(ticketTwoName);
            await summary.assertTotalEqualsThreePromotedPlusOneRegularTicketPrice(originalPrice, promotedPrice);
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();

        });

        //EMBED 
        it('Test_69 - should apply the promotion code when promotion qty is finished and get promo error message and assert input field still visible', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '4');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeOne);
            await payment.promotionNoLongerValidDangerMessageIsVisible();

        });
        
        //PORTAL
        it('Test_70 - should get promocode error validation when promotion code exists for current event', async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            sideMenu = new SideMenu(driver);
            promotions = new PromotionsPage(driver);
            newPromotion = new CreatePromotionModal(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickPromotionsTab();
            await promotions.clickAddPromotionButton();
            await newPromotion.addPromotionModalIsDisplayed();
            await newPromotion.errorValidationIsReturnedWhenExistingCodeIsEnteredAsPromoCodeForNewPromotion(promoCodeThree);

        });

        //EMBED
        it('Test_71 - should assert that percentage taxes are recalculated and dollar value fees are same when promotion is applied', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '6');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            let fees = await summary.getFeesValue();
            let taxes = await summary.getTaxesValue();
            await payment.applyPromotion(promoCodeThree);
            await summary.assertTaxesAndFeesAreRefactoredToMatchNewPrice(fees,taxes);

        });

        //PORTAL
        it('Test_72 - should create staff ticket in portal', async function () {
            
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            sideMenu = new SideMenu(driver);
            eventDetails = new GeneralDetailsTab(driver);
            ticketsNav = new TicketsNav(driver);
            createTicket = new CreateTicketModal(driver);
            sectionsNavs = new SectionsNavs(driver)

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.clickAddTicketButton();
            await createTicket.createStaffTicket(staffTicket, ticketStaffPrice ,ticketStaffQuantity);
            await ticketsNav.assertTicketNamePriceAndQuantity(staffTicket, ticketStaffPrice, ticketStaffQuantity);
            await ticketsNav.clickActivateTicketToggle(staffTicket);

        });

        //EMBED
        it('Test_73 - should select account limit quantity for all tickets that have promotion in promotion with limit then add promo code and assert only highest price ticket gets discount when subtotal calculated in order total', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '10');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '10');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await summary.calculateAndAssertTotalEquals10PromotedTicketsForOriginalHighestPriceAnd10RegularForLowerPriced(ticketTwoPrice, ticketFourPrice);

        });

        //EMBED
        it('Test_74 - should select total of account limit quantity for limited tickets that have promotion in promotion with limit then add promo code and assert subtotal equals tickets discounted prices times quantity', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '4');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '6');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await summary.calculateAndAssertTotalEquals10PromotedTicketsByEachTicketPromotedPrice(ticketTwoPrice, ticketFourPrice);

        });

        //EMBED
        it('Test_75 - should select more then total of account limit quantity for limited tickets that have promotion in promotion with limit then add promo code and ' +
            'assert subtotal equals tickets discounted prices times quantity + regular price for cheaper ticket times exceeding limit qty + assert exceeding promo message', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '4');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '9');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await payment.exceedingPromotionQuantityAlertIsDisplayed();
            await summary.calculateAndAssertTotalEquals10PromotedTicketsByEachTicketPromotedPricePlusExceedingTicketsByRegularPrice(ticketTwoPrice, ticketFourPrice);

        });

        //EMBED
        it('Test_76 - should select more then total of account limit quantity for not limited ticket that have promotion ' +
            'in promotion with limit then add promo code and assert subtotal equals tickets discounted prices times quantity ', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '15');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await payment.exceedingPromotionQuantityAlertIsNotDisplayed();
            await summary.calculateAndAssertTotalEquals15PromotedTicketsForNotLimitedTicket(ticketThreePrice);

        });

        //EMBED
        it('Test_77 - should select more then promotion available qty for not limited ticket that have promotion in promotion with limit then add promo code and' +
            ' assert subtotal equals available promotion tickets qty discounted price + regular price for exceeding qty and get exceeding info message ', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '25');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await payment.exceedingPromotionQuantityAlertIsDisplayed();
            await summary.calculateAndAssertTotalEquals20PromotedTicketsPlus5RegularPriceForNotLimitedTicket(ticketThreePrice);

        });

        //EMBED
        it('Test_78 - should select 25 tickets, 11 for limited 14 for not limited, top of limited priced and 13 of not limited should get discount, limited as cheapest will not ', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '7');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '14');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '4');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await payment.exceedingPromotionQuantityAlertIsDisplayed();
            await summary.calculateAndAssertTotalEquals20PromotedTicketsByEachTicketPromotedPricePlusExceeding5TicketsByRegularPrice(ticketTwoPrice, ticketThreePrice, ticketFourPrice);

        });

        //EMBED
        it('Test_79 - should select 30 tickets, 10 for each, should get discount on total 20 - top priced from limited * 10 and not limited *10 , second limited regular price ', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '10');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '10');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '10');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await payment.exceedingPromotionQuantityAlertIsDisplayed();
            await summary.calculateAndAssertTotalEquals20PromotedTicketsTopPrice10NotLimited10(ticketTwoPrice, ticketThreePrice, ticketFourPrice);

        });

        //EMBED
        it('Test_80 - should select 30 tickets, 12 for top priced in limited, 12 for not limited, 6 for lower priced limited should get discount' +
            ' on total 20 - top priced from limited * 10 and not limited *10 , second limited regular price, 2 tickets from discounted on regular ', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '12');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '12');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '6');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await payment.exceedingPromotionQuantityAlertIsDisplayed();
            await summary.calculateAndAssertTotalEquals20PromotedTicketsTopPrice10NotLimited10RestOnRegular(ticketTwoPrice, ticketThreePrice, ticketFourPrice);

        });

        //EMBED
        it('Test_81 - should make purchase for 9 tickets with promotion with limits and assert total discounted value per ticket is displayed', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            receipt = new ReceiptPopup(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '3');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '3');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '3');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await summary.discountIsDisplayed();
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();
            await confirm.clickViewReceiptButton();
            await receipt.receiptPopupIsVisible();
            await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketTwoName, 0);
            await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketThreeName, 0);
            await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketFourName, 0);

        });

        //EMBED
        it('Test_82 - should make purchase for 16 tickets exceeding account limit and promotion limit and assert exceeding message and discount is applied only for quantity inside limits', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            summary = new SummaryComponent(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            receipt = new ReceiptPopup(driver)

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '5');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '10');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '1');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await summary.discountIsDisplayed();
            await payment.exceedingPromotionQuantityAlertIsDisplayed();
            await payment.clickSavedCardByIndex(0);
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickPlaceOrderButton();
            await confirm.isAtConfirmPage();
            await confirm.clickViewReceiptButton();
            await receipt.receiptPopupIsVisible();
            await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketTwoName, 1);
            await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketThreeName, 3);
            await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketFourName, 1);

        });

        //EMBED
        it('Test_83 - should try to make purchase for 12 tickets when promo quantity is completed and receive promo no longer valid', async function () {

            main = new EmbedMainPage(driver);
            embedLogin = new LoginPage(driver);
            embedTickets = new TicketsComponent(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '4');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '4');
            await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '4');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.applyPromotion(promoCodeThree);
            await payment.promotionNoLongerValidDangerMessageIsVisible();

        });

        //EMBED
        it('Test_84 - should assert on staff ticket only one ticket can be selected', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.assertTicketSelectValueByName(staffTicket, "0");
            await embedTickets.sentKeysToTicketInputByTicketName(staffTicket, 5);
            await embedTickets.assertTicketSelectValueByName(staffTicket, "0");
            await embedTickets.sentKeysToTicketInputByTicketName(staffTicket, 1);
            await embedTickets.assertTicketSelectValueByName(staffTicket, "1");

        });

        //EMBED
        it('Test_85 - should check staff modal elements and submit fully filled form', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            questionsModal = new TicketQuestionsModal(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(staffTicket, '1');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickSavedCardByIndex(0);
            await main.nextButtonIsVisible();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickPlaceOrderButton();
            await questionsModal.assertElementsOnStaffModal(staffTicket);
            await questionsModal.shouldAnswerStaffFormWithRandomButValidData(base);
            await confirm.isAtConfirmPage()

        });

        //PORTAL
        it('Test_86 - should set ticket Simple Yes No question and assert saved data on questions table in portal', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver)
            eventDetails = new GeneralDetailsTab(driver);
            questions = new TicketQuestionsPage(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await sectionsNavs.clickNavByText("Settings")
            await sectionsNavs.taxesAndFeesNavIsDisplayed();
            await sectionsNavs.clickNavByText("Ticket Questions")
            await questions.createSimpleYesNoQuestionAndAssertSavedDataAndElements(base, ticketOneName, ticketThreeName);

        });

        //EMBED
        it('Test_87 - should check ticket questions modal for Yes/No question and submit answers in embed', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            questionsModal = new TicketQuestionsModal(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.sentKeysToTicketInputByTicketName(ticketOneName, '1');
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickSavedCardByIndex(0);
            await main.nextButtonIsVisible();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickPlaceOrderButton();
            await questionsModal.answerSimpleYesNo(base,ticketOneName);
            await confirm.isAtConfirmPage();

        });

        //PORTAL
        it('Test_88 - should set ticket question with asked input text', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver);
            eventDetails = new GeneralDetailsTab(driver);
            questions = new TicketQuestionsPage(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await driver.sleep(5000);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await sectionsNavs.clickNavByText("Settings")
            await sectionsNavs.taxesAndFeesNavIsDisplayed();
            await sectionsNavs.clickNavByText("Ticket Questions")
            await questions.clickDeactivateQuestionButton(0);
            await questions.createQuestionWithInput(base);

        });

        //EMBED
        it('Test_89 - should answer ticket questions for question with input', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            questionsModal = new TicketQuestionsModal(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInput(0, 1)
            await main.nextButtonIsVisible();
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await driver.sleep(1000);
            await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
            await main.nextButtonIsVisible();
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickSavedCardByIndex(0);
            await main.nextButtonIsVisible();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickPlaceOrderButton();
            await questionsModal.answerTicketQuestionWithTextInput(base,ticketOneName);
            await confirm.isAtConfirmPage();

        });

        //PORTAL
        it('Test_90 - should check for first two ticket questions responses made in embed', async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver);
            attendees = new AttendeesTab(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await driver.sleep(500);
            await sideMenu.ticketingTabIsDisplayed();
            await sectionsNavs.clickNavByText("Attendees");
            await attendees.checkForTicketQuestionsResponsesForTheFirstTwoPurchases(base,0);

        });

        //PORTAL
        it('Test_91 - should update first ticket question with asked input text', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver);
            eventDetails = new GeneralDetailsTab(driver);
            questions = new TicketQuestionsPage(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await sectionsNavs.clickNavByText("Settings")
            await sectionsNavs.taxesAndFeesNavIsDisplayed();
            await sectionsNavs.clickNavByText("Ticket Questions")
            await questions.clickActivateQuestionButton(0);
            await questions.updateFirstQuestionToIncludeInputAndForEachTicket(base);

        });

        //EMBED
        it('Test_92 - should login with facebook assert updated ticket questions for first question , answer and submit answers', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            embedLogin = new LoginPage(driver);
            extras = new ExtrasPage(driver);
            payment = new PaymentPage(driver);
            orderDetails = new EmbedOrderDetailsPage(driver);
            confirm = new ConfirmPage(driver);
            questionsModal = new TicketQuestionsModal(driver);

            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.sentKeysToTicketInput(0, 2);
            await embedTickets.sentKeysToTicketInput(2, 1);
            await main.nextButtonIsVisible();
            await main.clickNextPageButton();
            await embedLogin.isAtLoginPage();
            await driver.sleep(1000);
            await embedLogin.completeSwitchTo();
            await embedLogin.isAtFacebookPage();
            await driver.sleep(10000);
            await embedLogin.completeSignInWithFacebook();
            await driver.switchTo().window(originalWindow);
            await driver.sleep(7000);
            await main.switchToIframe();
            await main.nextButtonIsVisible();
            await main.clickTicketTermsCheckbox();
            await main.clickNextPageButton();
            await extras.isAtExtrasPage();
            await main.clickNextPageButton();
            await payment.isAtPaymentPage();
            await payment.clickSavedCardByIndex(0);
            await main.nextButtonIsVisible();
            await main.clickNextPageButton();
            await orderDetails.isOnOrderDetailsPage();
            await orderDetails.clickPlaceOrderButton();
            await questionsModal.assertFormAndInputAndOption(base,ticketOneName, ticketThreeName)
            await questionsModal.answerTicketQuestionWithPerTicketQuestions();
            await confirm.isAtConfirmPage();

        });

        //PORTAL
        it('Test_93 - should check response provided for the updated question', async function () {

            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver);
            attendees = new AttendeesTab(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await sideMenu.ticketingTabIsDisplayed();
            await sectionsNavs.clickNavByText("Attendees");
            await attendees.checkForTicketQuestionsResponsesForTheUpdated(base,1);

        });

        //EMBED
        it('Test_94 - should assert tickets groups in embed', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.assertGroupNamesAndCount(ticketGroupOne, ticketGroupTwo, ticketGroupThree);

        });

        //EMBED
        it('Test_95 - should assert tickets by groups and active class is applied when clicked on group in embed', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.assertTicketsByGroupsAndClassIsAppliedWhenClickedOnFullEmbed(base, "active");

        });

        //PORTAL
        it('Test_96 - should change ticket order in portal', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            ticketsNav = new TicketsNav(driver);
            sectionsNavs = new SectionsNavs(driver)
            sideMenu = new SideMenu(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.dragThirdTicketInTopPosition();

        });

        //PORTAL
        it('Test_97 - should change ticket location from one group 2 to group 1 in portal and assert change', async function () {
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            ticketsNav = new TicketsNav(driver);
            sectionsNavs = new SectionsNavs(driver)
            sideMenu = new SideMenu(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();
            await sectionsNavs.clickNavByText("My Events");
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.unpublishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickGroupTabsByIndexAssertNumberOfTickets(ticketOneName, ticketTwoName, ticketThreeName, staffTicket);
            await ticketsNav.dragTicketFromGroupTwoToGroupOne();
            await ticketsNav.assertTicketIsRemovedFromGroupTwoAndAddedToGroupOne(ticketOneName, ticketTwoName, ticketThreeName, staffTicket);

        });

        //EMBED
        it('Test_98 - should assert tickets by groups when order and ticket group is changed in embed', async function () {

            main = new EmbedMainPage(driver);
            embedTickets = new TicketsComponent(driver);
            await main.openEmbedPage();
            await main.switchToIframe();
            await main.isInFrame(eventName);
            await embedTickets.ticketListIsDisplayed();
            await embedTickets.assertTicketsByGroupsWhenOrderIsChangedOnFullEmbed(base);

        });

    });