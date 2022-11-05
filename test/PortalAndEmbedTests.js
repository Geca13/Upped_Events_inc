    const { Builder } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const Inbox = require("../Inbox/Inbox")
    const PortalLoginPage = require('../portal/portalPages/PortalLoginPage');
    const DashboardPage = require('../portal/dashboard/Dashboard');
    const AttendeesTab = require('../portal/eventOverview/AttendeesTab')
    const CreateEventModal = require('../portal/portalModals/CreateEventModal');
    const DateTimePickerModal = require('../portal/portalModals/DateTimePickerModal');
    const MyEventsPage = require('../portal/dashboard/MyEventsTab');
    const EventOptionTabs = require('../portal/eventOverview/EventOptionTabs');
    const SideMenu = require('../portal/portalComponents/SideMenu');
    const SectionsNavs = require('../portal/portalComponents/SectionsNavs');
    const CreateTicketModal = require('../portal/portalModals/CreateTicketModal');
    const TicketsNav = require('../portal/ticketing/TicketsNav');
    const GeneralDetailsTab = require('../portal/eventOverview/GeneralDetailsTab');
    const PromotionsPage = require('../portal/promotions/PromotionsPage');
    const AddNewPromotionModal = require('../portal/portalModals/AddNewPromotionModal');
    const SettingsNav = require('../portal/ticketing/SettingsNav/SetingsNav');
    const EventSettingsNav = require('../portal/eventOverview/SettingsNav/SettingsNavs');
    const TaxesAndFeesPage = require('../portal/ticketing/SettingsNav/TaxesAndFeesPage');
    const TicketQuestionsPage = require('../portal/ticketing/SettingsNav/TicketQuestionsPage')
    const TicketTermsPage = require('../portal/ticketing/SettingsNav/TicketTermsPage');
    const TicketsTab = require('../microsites/micrositesComponents/TicketsTab');
    const ExtrasTab = require('../microsites/micrositesComponents/ExtrasTab');
    const AddMoneyComponent = require("../microsites/micrositesComponents/AddMoneyComponent")
    const TicketQuestionsModal = require('../microsites/micrositesComponents/TicketQuestionsModal')
    const PayTab = require('../microsites/micrositesComponents/PayTab');
    const NewCardComponent = require('../microsites/micrositesComponents/NewCardComponent');
    const EventTickets = require('../portal/ticketing/EventTickets');
    const EmbedMainPage = require("../embed/embedPages/EmbedMainPage");
    const TicketsComponent = require("../embed/embedComponents/TicketsComponent");
    const SummaryComponent = require("../embed/embedComponents/SummaryComponent");
    const LoginPage = require("../embed/embedPages/LoginPage");
    const ExtrasPage = require("../embed/embedPages/ExtrasPage");
    const PaymentPage = require("../embed/embedPages/PaymentPage");
    const EmbedOrderDetailsPage = require("../embed/embedPages/EmbedOrderDetailsPage");
    const ConfirmPage = require("../embed/embedPages/ConfirmPage");
    const EventCapacitySubNav = require('../portal/ticketing/SettingsNav/EventCapacitySubNav');
    const CreateAccountPage = require("../embed/embedPages/CreateAccountPage");
    const EmbeddingPage = require("../portal/eventOverview/DesignNav/EmbeddingPage");
    const EmbedTicketTermsModal = require('../embed/embedComponents/EmbedTicketTermsModal');
    const DonationPage = require('../portal/eventOverview/SettingsNav/DonationsPage');
    const EmbedDonateComponent = require('../embed/embedComponents/EmbedDonateComponent');
    const StepsComponent = require('../embed/embedComponents/StepsComponent');
    const ReceiptPopup = require('../microsites/micrositesComponents/ReceiptPopup');
    const Files = require('../dummy/Files')

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
        let attendees;
        let eventDetails;
        let promotions;
        let newPromotion;
        let settingsNav;
        let taxesAndFees;
        let ticketTerms;
        let events;
        let eventTickets;
        let info;
        let ticketing;
        let tickets;
        let extras;
        let pay;
        let login;
        let confirm;
        let newCardComponent;
        let eventSettingsNav;
        let inbox;
        let originalWindow;
        let questions;
        let questionsModal;
        let main;
        let embedTickets;
        let summary;
        let embedLogin;
        let embedExtras;
        let payment;
        let orderDetails;
        let embedConfirm;
        let capacity;
        let embedCreate;
        let addMoney;
        let embedding;
        let files;
        let termsModal;
        let donation;
        let embedDonate;
        let receipt;
        let steps;
        let sideMenu;
        let sectionsNavs;

        let base = Math.floor(100000 + Math.random() * 900000);
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
            driver = await new Builder().forBrowser('chrome').build();
            await driver.manage().window().maximize();
        });

        
        afterEach(async function(){
            await driver.quit()
        })

       
        //PORTAL
        it('should create new event and verify data in events page and General Details',async function () {
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
        it('should create first ticket and check data in tickets table and update modal ',async function () {

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
                it('should make embed view for event', async function () {
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
                it('should get no tickets available message on embed when tickets are not activated ',async function () {
        
                    main = new EmbedMainPage(driver);
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await main.assertNoTicketsMessageIsDisplayed()
        
                });
        
                //PORTAL -> EMBED
                it('should check button text when tickets are in the future ',async function () {
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    events = new EventsPage(driver);
                    info = new EventInfo(driver);
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
                it('should assert create account button is disabled on create account modal in embed until fields are empty', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedCreate = new CreateAccountPage(driver);
                    inbox = new Inbox(driver);
                    originalWindow = inbox.getOriginalWindow();
        
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await main.nextButtonIsVisible();
                    await main.clickNextPageButton();
                    await embedLogin.isAtLoginPage();
                    await embedLogin.clickRegisterLink();
                    await embedCreate.assertCreateAccountButtonIsDisabledUntilFieldsArePopulated();
        
                });
        
                //EMBED
                it('should create new account on embed login and get success login message', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedCreate = new CreateAccountPage(driver);
                    inbox = new Inbox(driver);
                    originalWindow = inbox.getOriginalWindow();
        
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await main.nextButtonIsVisible();
                    await main.clickNextPageButton();
                    await embedLogin.isAtLoginPage();
                    await embedLogin.clickRegisterLink();
                    await embedCreate.createAccountOnEmbed(customerFirstName,customerLastName,customerEmail,customerPassword);
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
                    await main.nextButtonIsVisible();
                    await main.clickNextPageButton();
                    await embedLogin.isAtLoginPage();
                    await embedLogin.loginWithVerifiedAccount(customerEmail, customerEmail);
                    await driver.sleep(4000);
        
                });
        
                //PORTAL
                it('should add excluded tax and check if bayer total is updated in ticket update modal', async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver)
                    ticketsNav = new TicketsNav(driver);
                    tickets = new TicketsTab(driver);
                    createTicket = new CreateTicketModal(driver);
                    settingsNav = new SettingsNav(driver);
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
                    await settingsNav.taxesAndFeesSubTabIsDisplayed();
                    await settingsNav.clickTaxesAndFeesSubNav();
                    await taxesAndFees.addOneTaxForTickets();
                    await taxesAndFees.clickSaveTaxesAndFeesButton();
                    let savedTaxValue = await taxesAndFees.getFloatNumberForTaxOrFee(1,1);
                    await eventTickets.clickTicketsTab();
                    await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
                    await createTicket.assertBuyerTotalEqualsTicketPriceMultipliedByTaxPercentage(savedTaxValue);
        
                });
                
        
                //PORTAL
                it('should remove tax and add $ value fee and assert price in update modal', async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    tickets = new TicketsTab(driver);
                    createTicket = new CreateTicketModal(driver);
                    settingsNav = new SettingsNav(driver);
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
                    await settingsNav.taxesAndFeesSubTabIsDisplayed();
                    await settingsNav.clickTaxesAndFeesSubNav();
                    await taxesAndFees.clickRemoveTaxOrFeeButtonByIndex(0);
                    await taxesAndFees.clickSaveTaxesAndFeesButton();
                    await eventTickets.clickTicketsTab();
                    await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
                    await createTicket.ticketNameInputIsDisplayed();
                    await createTicket.assertTicketPriceEqualsBuyerTotalPriceWhenNoTaxesOrFees();
                    await createTicket.closeCreateUpdateTicketModal();
                    await ticketsNav.addTicketButtonIsDisplayed();
                    await eventTickets.clickSettingsTab();
                    await settingsNav.taxesAndFeesSubTabIsDisplayed();
                    await settingsNav.clickTaxesAndFeesSubNav();
                    await taxesAndFees.set$FeeForTickets("Check $ Fee", ".17");
                    await taxesAndFees.clickSaveTaxesAndFeesButton();
                    let saved$FeeValue = await taxesAndFees.get$FeeFromInputByIndex(1);
                    await eventTickets.clickTicketsTab();
                    await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
                    await createTicket.assertBuyerTotalEqualsTicketPricePlus$Fee(saved$FeeValue);
        
                });
        
                //PORTAL
                it('should add excluded tax again and check if bayer total is updated in ticket update modal', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    tickets = new TicketsTab(driver);
                    createTicket = new CreateTicketModal(driver);
                    settingsNav = new SettingsNav(driver);
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
                    await settingsNav.taxesAndFeesSubTabIsDisplayed();
                    await settingsNav.clickTaxesAndFeesSubNav();
                    await taxesAndFees.addOneTaxForTickets();
                    await taxesAndFees.clickSaveTaxesAndFeesButton();
                    let savedTaxValue = await taxesAndFees.getFloatNumberForTaxOrFee(1,1);
                    let saved$FeeValue = await taxesAndFees.get$FeeFromInputByIndex(2);
                    await eventTickets.clickTicketsTab();
                    await ticketsNav.clickEditTicketButtonByTicketName(ticketOneName);
                    await createTicket.assertBuyerTotalEqualsTicketPriceMultipliedByTaxPercentageAndAdded$Fee(savedTaxValue, saved$FeeValue);
        
                });
        
                //EMBED
                it('should calculate subtotal and total on one ticket quantity 2 with tax and fee in embed', async function () {
        
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
                it('should check if subtotal equals before and after login on embed', async function () {
        
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
                it('should assert elements on Add Money component in embed', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
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
                    await addMoney.addMoneyComponentIsDisplayed();
                    await addMoney.assertAddMoneyComponentElements();
        
                });
        
                //EMBED
                it('should assert elements on Payment screen component in embed when user has no cards', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
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
                it('should assert elements on Order Details screen when payment with wallet', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
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
                it('should click payment info edit link on Order Details and assert landing on Payment screen', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
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
                it('should make payment with new card in embed and assert card is saved',async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    newCardComponent = new NewCardComponent(driver);
                    embedConfirm = new ConfirmPage(driver);
        
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.clickNewCardTab();
                    await payment.fillValidDataOnCardOnTheEmbed(customerFirstName,customerLastName);
                    await orderDetails.isOnOrderDetailsPage();
                    //await orderDetails.assertSelectedCardIsDisplayedAndAssertData("Visa XXXX 1111")
                    await orderDetails.clickPlaceOrderButton();
                    await embedConfirm.isAtConfirmPage();
        
                });
        
                //PORTAL -> EMBED
                it('should get Sold out message when there is no qty available for selected ticket in embed', async function () {
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
                    await ticketsNav.addTicketButtonIsDisplayed();
                    await ticketsNav.assertQuantityEqualsSoldColumnByTicket(ticketOneName);
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await main.assertSoldOutMessageIsDisplayed();
        
                });
        
                //EMBED
                it('should check that if available tickets are less then 100 the tickets dropdown in embed is the same that number', async function () {
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
                it('should update ticket quantity and check that if available tickets are more then 100 the tickets dropdown in embed is limited to 100', async function () {
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
        
                  //EMBED
                  it('should limit the tickets per account and check if all dropdowns are at that maximum in the embed', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    createEvent = new CreateEventModal(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver)
                    capacity = new EventCapacitySubNav(driver);
                    ticketsNav = new TicketsNav(driver);
                    eventTickets = new EventTickets(driver)
                    settingsNav = new SettingsNav(driver);
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
                    await sectionsNavs.clickNavByText("Settings")
                    await settingsNav.taxesAndFeesSubTabIsDisplayed();
                    await settingsNav.clickEventCapacity();
                    await capacity.setLimitPerAccount("26");
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await embedTickets.assertDropDownElementsEquals("26");
                });
        
                // PORTAL -> EMBED
                it('should get exceeding limitation message when user have already purchased tickets and asks for more then limit', async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver)
                    eventDetails = new GeneralDetailsTab(driver);
                    ticketsNav = new TicketsNav(driver);
                    attendees = new AttendeesTab(driver);
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
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
                it('should remove limitation on tickets per account ',async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    createEvent = new CreateEventModal(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver);
                    capacity = new EventCapacitySubNav(driver);
                    ticketsNav = new TicketsNav(driver);
                    eventTickets = new EventTickets(driver)
                    settingsNav = new SettingsNav(driver);
        
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
                    await settingsNav.taxesAndFeesSubTabIsDisplayed();
                    await settingsNav.clickEventCapacity();
                    await capacity.removeLimit();
        
                });
        
                //EMBED
                it('should assert when wallet was selected on start then edited to card , the card info is in Order Details', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
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
                it('should click ticket edit link on Order Details and assert landing on Ticketing screen', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
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
                it('should make payment with wallet and assert elements on Confirmation page', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
                    embedLogin = new LoginPage(driver);
                    addMoney = new AddMoneyComponent(driver)
                    payment = new PaymentPage(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
        
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
                    await embedConfirm.isAtConfirmPage();
                    await embedConfirm.assertElementsOnConfirmPage();
        
                });
        
                //PORTAL
                it('should create three more tickets and ticket groups, then assert data in tickets table ',async function () {
        
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
                it('should assert that ticket terms elements in embed are not displayed when not created in portal', async function () {
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedLogin = new LoginPage(driver);
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    eventDetails = new GeneralDetailsTab(driver);
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
                it('should set ticket terms in the portal and assert entered tags and text', async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    eventDetails = new GeneralDetailsTab(driver);
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
                it('should assert that ticket terms are displayed only when user is logged in', async function () {
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
                it('should assert correct ticket terms behaviour and image placeholder', async function () {
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedLogin = new LoginPage(driver);
                    termsModal = new EmbedTicketTermsModal(driver);
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
                it('should set event banner in the portal', async function () {
        
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
                it('should assert event banner image is present in the ticket terms modal', async function () {
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedLogin = new LoginPage(driver);
                    termsModal = new EmbedTicketTermsModal(driver);
                    addMoney = new AddMoneyComponent(driver)
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
                it('should remove event banner in the portal', async function () {
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
                it('should assert terms image placeholder is returned after banner is removed in the portal', async function () {
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    termsModal = new EmbedTicketTermsModal(driver);
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
                it('should assert elements on donation page in portal and enable donations',async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver);
                    eventSettingsNav = new EventSettingsNav(driver);
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
                    await eventSettingsNav.donationsSubNavIsDisplayed();
                    await donation.assertElementsOnDonationPageOnStart();
                    await donation.clickCheckboxAndAssertNewElements();
                    await donation.enterDonationMessageAndSaveDonation();
        
                });
        
                //PORTAL - > EMBED
                it('should assert elements on donation page in the embed',async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver);
                    eventSettingsNav = new EventSettingsNav(driver);
                    donation = new DonationPage(driver);
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedDonate = new EmbedDonateComponent(driver)
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
                    await eventSettingsNav.donationsSubNavIsDisplayed();
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
                    await embedDonate.assertElementsOnDonateTab(eventName, donationMessage);
        
                });
        
                //EMBED
                it('should assert when donation button is clicked the amount is visible in donation input in the embed',async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedDonate = new EmbedDonateComponent(driver)
        
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
                    await embedDonate.assertCorrectValuesInInputAfterDonationButtonIsClicked(0);
                    await embedDonate.assertCorrectValuesInInputAfterDonationButtonIsClicked(1);
                    await embedDonate.assertCorrectValuesInInputAfterDonationButtonIsClicked(2);
                    await embedDonate.assertCorrectValuesInInputAfterDonationButtonIsClicked(3);
        
                });
        
                //EMBED
                it('should assert when donation is added to order the amount is visible in Order Total in the embed',async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedDonate = new EmbedDonateComponent(driver)
        
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
                    await embedDonate.addDonationToOrderAndAssertDataInOrderTotal(0);
                    await embedDonate.clickResetDonationButtonAndAssertInputIsReset();
                    await embedDonate.addDonationToOrderAndAssertDataInOrderTotal(1);
                    await embedDonate.clickResetDonationButtonAndAssertInputIsReset();
                    await embedDonate.addDonationToOrderAndAssertDataInOrderTotal(2);
                    await embedDonate.clickResetDonationButtonAndAssertInputIsReset();
                    await embedDonate.addDonationToOrderAndAssertDataInOrderTotal(3);
                    await embedDonate.clickResetDonationButtonAndAssertInputIsReset();
        
                });
        
                //EMBED
                it('should assert when custom donation is added to order the amount is visible in Order Total in the embed',async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedDonate = new EmbedDonateComponent(driver)
        
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
                    await embedDonate.addCustomDonationAndAssertIsAddedInOrderTotal();
        
                });
        
                //EMBED
                it('should assert when donation is added to order calculates corectly in Order Total in the embed',async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedDonate = new EmbedDonateComponent(driver)
        
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
                    await embedDonate.calculateTheOrderTotalAfterDonationIsAdded();
        
                });
        
                //EMBED
                it('should assert add / reset buttons disabled scenarios',async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedDonate = new EmbedDonateComponent(driver)
        
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
                    await embedDonate.checkWhenInputValue0AddDonationButtonIsDisabledAndResetEnabled();
                    await embedDonate.clickOneDonationValueButton(2)
                    await embedDonate.checkWhenInputValueNot0AddDonationButtonIsEnabledAndResetDisabled();
        
                });
        
                //EMBED
                it('should click donation edit link on Order Details and assert landing on extras screen', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
                    embedLogin = new LoginPage(driver);
                    payment = new PaymentPage(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedDonate = new EmbedDonateComponent(driver)
        
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
                    await embedDonate.clickOneDonationValueButton(2);
                    await embedDonate.clickAddDonationButton();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickPayWithWalletButton();
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.clickEditDonationLinkAndAssertItIsOnExtrasPage(embedDonate);
        
                });
        
                //PORTAL
                it('should assert table headers on promotions page and elements on add new promotion modal ',async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    await promotions.assertElementsOnPromotionsPageWhenNoPromotions();
                    await promotions.assertElementsOnCreateNewPromotionModal(ticketOneName);
        
                });
        
                //PORTAL
                it('should check that all created tickets are listed in promotions ticket type dropdown in portal', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    let tickets = await ticketsNav.getAllTicketsNames();
                    await sideMenu.clickPromotionsTab();
                    await promotions.addPromotionButtonIsVisible();
                    await promotions.clickAddPromotionButton();
                    await newPromotion.addPromotionModalIsDisplayed();
                    await newPromotion.assertAllTicketsAreListedInTicketTypeDropdown(tickets);
                });
        
                //PORTAL
                it('should check that when single ticket is selected in dropdown the price is shown next to the promotion value inputs', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    await newPromotion.assertCorrectPriceIsDisplayedWhenTickedIsSelectedInDropdown(ticketOnePrice);
        
                });
        
                //PORTAL
                it('should check that when multiple tickets are selected in dropdown the price is not shown next to the promotion value inputs', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    await newPromotion.assertPriceIsNotDisplayedWhenMoreTicketsAreSelected(ticketOneName, ticketTwoName);
        
                });
        
                //PORTAL
                it('should assert that when multiple tickets selected for limitation the same tickets are displayed in limit dropdown', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    await newPromotion.assertTicketsOptionsInLimitDropdownEqualsPreviouslySelected(ticketOneName, ticketTwoName);
        
                });
        
                //PORTAL
                it('should assert that when all option selected for limitation the same all tickets displayed in limit dropdown', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    await newPromotion.assertAllTicketsDisplayedInLimitDropdownWhenAllOptionSelectedInTickets();
        
                });
        
                //PORTAL
                it('should assert that the $ value promotion input does not accept number bigger then the ticket price', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    await newPromotion.assert$ValuePromotionCanNotAcceptLargerValueThenTicketPrice(ticketOnePrice);
        
                });
        
                //PORTAL
                it('should assert that the new $ value promotion when entered is displayed as discounted price', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    await newPromotion.assertWhen$ValuePromotionIsEnteredIsDisplayedNextToOriginalPrice(ticketOnePrice, "0.33");
        
                });
        
                //PORTAL
                it('should assert that the new ticket discounted price is displayed when promotion is percentage value', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    await newPromotion.assertWhenPercentageValuePromotionIsEnteredIsDisplayedNextToOriginalPrice(ticketOnePrice, 70);
        
                });
        
                //PORTAL
                it('should check the available ticket quantity is displayed in tooltip and is max allowed portal', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    let ticketOneAvailableQty = await ticketsNav.calculateAvailableTicketsByTicket(ticketOneName)
                    await sideMenu.clickPromotionsTab();
                    await promotions.clickAddPromotionButton();
                    await newPromotion.addPromotionModalIsDisplayed();
                    await newPromotion.assertTooltipDisplaysCorrectAvailableTicketsAndEnteringLargerWillSetMaximumNumber(ticketOneName, ticketOneAvailableQty);
                });
        
                //PORTAL
                it('should assert maximum allowed promotion tickets when multiple tickets are selected in one promotion', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    let ticketOneAvailableQty = await ticketsNav.calculateAvailableTicketsByTicket(ticketOneName);
                    let ticketTwoAvailableQty = await ticketsNav.calculateAvailableTicketsByTicket(ticketTwoName);
                    let ticketThreeAvailableQty = await ticketsNav.calculateAvailableTicketsByTicket(ticketThreeName);
                    await sideMenu.clickPromotionsTab();
                    await promotions.clickAddPromotionButton();
                    await newPromotion.addPromotionModalIsDisplayed();
                    await newPromotion.assertTooltipDisplaysCorrectAvailableMultipleTicketsAndEnteringLargerWillSetMaximumNumber(ticketOneName, ticketOneAvailableQty, ticketTwoName, ticketTwoAvailableQty, ticketThreeName, ticketThreeAvailableQty);
                });
        
                //PORTAL
                it('should assert lower case letters are transfered to uppercase and symbols are allowed in promocode input field', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                    await newPromotion.assertAllowedCharactersInPromoCodeInputAndMaximumLength();
        
                });
                //PORTAL
                it('should create first promotion with $ value and assert data on promotions page and update promotion modal', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
        
                //PORTAL -> EMBED
                it('should disable promotion and check for error message on embed', async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.enterPromoCode(promoCodeOne);
                    await payment.clickApplyDiscountButton();
                    await payment.invalidCodeMessagesAreShown("The entered promotion code does not exist.")
        
                });
        
                //PORTAL -> EMBED
                it('should enable promotion and check promotion is applied and input is hidden', async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.successfullyAddedPromotionElementsAreShown(promoCodeOne);
                    await payment.assertDiscountFormIsNotDisplayed();
        
                });
        
                //EMBED
                it('should add promo code and assert donation value + new price equals original ticket price in summary', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotionAndCheckTicketPriceEqualsNewPricePlusDiscount(promoCodeOne,ticketTwoPrice);
        
                });
        
                //EMBED
                it('should add promo code and assert new price and original price are displayed on tickets page next to ticket name', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeOne);
                    let discountedPrice = await summary.getTicketsTotal();
                    await main.clickPreviousPageButton();
                    await embedExtras.isAtExtrasPage();
                    await main.clickPreviousPageButton();
                    await embedTickets.ticketListIsDisplayed();
                    await embedTickets.assertTheNewTicketPriceEqualsDiscountedPrice(ticketTwoName, discountedPrice);
                    await embedTickets.assertNewTicketNamePricesLayout(ticketTwoName, originalPrice, discountedPrice);
                    await embedTickets.assertFontColorAndStrikeOnOriginalPrice(ticketOneName);
        
                });
        
                //EMBED
                it('should assert when three different tickets selected three ticket edit links on Order details', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickPayWithWalletButton();
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.assertNumberOfEditTicketsLinks(3);
        
                });
        
                //EMBED
                it('should assert when three different tickets selected all three tickets displayed in Order details', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
        
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
                    await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '2');
                    await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '2');
                    //await embedTickets.sentKeysToTicketInput(3, 1);
                    await main.clickNextPageButton();
                    await embedLogin.isAtLoginPage();
                    await embedLogin.loginWithVerifiedAccount(customerEmail, customerPassword);
                    await embedTickets.ticketListIsDisplayed();
                    let tickets = await embedTickets.getListOfTicketsWhereQuantityIsBiggerThen0();
                    await main.clickTicketTermsCheckbox();
                    await main.clickNextPageButton();
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickPayWithWalletButton();
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.assertSelectedTicketsAreDisplayedInOrderDetails(tickets);
        
                });
        
                //EMBED
                it('should assert when three different tickets selected for each ticket total equals selected quantity times price', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
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
                it('should assert selected ticket quantity is displayed in the Order Total corectly', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
        
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await embedTickets.sentKeysToTicketInputByTicketName(ticketTwoName, '2');
                    await embedTickets.sentKeysToTicketInputByTicketName(ticketThreeName, '3');
                    await embedTickets.sentKeysToTicketInputByTicketName(ticketFourName, '4');
                    await embedTickets.assertTicketCountInOrderTotal(summary);
        
                });
        
                //EMBED
                it('should assert when order details tickets sum equals order total tickets value & summary tickets and subtotal', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    summary = new SummaryComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickPayWithWalletButton();
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.assertTicketsSumEqualsSubtotalAndOrderTotalTicketsAndSubtotalValues(summary);
        
                });
        
        
                //EMBED
                it('should make regular purchase with three different tickets and quantities and assert tickets on receipt', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickSavedCardByIndex(0);
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.clickPlaceOrderButton();
                    await embedConfirm.isAtConfirmPage();
                    await embedConfirm.clickViewReceiptButton();
                    await receipt.receiptPopupIsVisible();
                    await receipt.assertTicketsOnReceipt(ticketTwoName,ticketThreeName,ticketFourName);
        
                });
        
                //EMBED
                it('should make regular purchase and check event name and date of purchase', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickSavedCardByIndex(0);
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.clickPlaceOrderButton();
                    let timeDate = await orderDetails.getTransactionTimeDate();
                    await embedConfirm.isAtConfirmPage();
                    await embedConfirm.clickViewReceiptButton();
                    await receipt.receiptPopupIsVisible();
                    await receipt.timeDateAndEventName(timeDate, eventName);
        
                });
        
                //EMBED
                it('should assert text on navbar on all pages', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
                    receipt = new ReceiptPopup(driver)
        
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
                    await embedExtras.isAtExtrasPage();
                    await main.assertNavbarText("Extras");
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await main.assertNavbarText("Payment");
                    await payment.clickSavedCardByIndex(0);
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await main.assertNavbarText("Double check your order details");
                    await orderDetails.clickPlaceOrderButton();
                    await embedConfirm.isAtConfirmPage();
                    await main.assertNavbarText("Confirmation");
        
                });
        
                //EMBED
                it('should assert previous page button text', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
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
                it('when not logged in navigate to the login page with no tickets selected , when logged in alert select ticket should appear', async function () {
        
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
                it('should get alert danger when next button clicked and payment method not selected', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await main.clickNextPageButton();
                    await main.assertAlertVisibleAndText("Please select a payment method!");
        
                });
        
                //EMBED
                it('should assert steps names', async function () {
        
                    main = new EmbedMainPage(driver);
                    steps = new StepsComponent(driver);
        
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await steps.assertStepNames();
        
                });
        
                //EMBED
                it('should assert completed steps count and current step name', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await steps.numberOfCompletedStepsAndCurrentStepName("Add Extras",1);
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await steps.numberOfCompletedStepsAndCurrentStepName("Payment Details",2);
                    await payment.clickSavedCardByIndex(0);
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await steps.numberOfCompletedStepsAndCurrentStepName("Review and Pay",3);
                    await orderDetails.clickPlaceOrderButton();
                    await embedConfirm.isAtConfirmPage();
                    await steps.numberOfCompletedStepsAndCurrentStepName("All Done!",4);
        
                });
        
                //EMBED
                it('should assert completed steps checkmark image is displayed', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await steps.checkThatCheckmarkImageIsDisplayedWhenStepIsCompeted();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await steps.checkThatCheckmarkImageIsDisplayedWhenStepIsCompeted();
                    await payment.clickSavedCardByIndex(0);
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await steps.checkThatCheckmarkImageIsDisplayedWhenStepIsCompeted();
                    await orderDetails.clickPlaceOrderButton();
                    await embedConfirm.isAtConfirmPage();
                    await steps.checkThatCheckmarkImageIsDisplayedWhenStepIsCompeted();
        
                });
        
                //EMBED
                it('should assert proper steps behaviour with fillin class on navbar on all pages', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
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
                    await embedConfirm.isAtConfirmPage();
                    await steps.checkIfFillinClassIsAppliedToStep(0,false);
                    await steps.checkIfFillinClassIsAppliedToStep(1,false);
                    await steps.checkIfFillinClassIsAppliedToStep(2,false);
                    await steps.checkIfFillinClassIsAppliedToStep(3,false);
                    await steps.checkIfFillinClassIsAppliedToStep(4,true);
        
                });
        
                //EMBED
                it('should assert proper steps behaviour with active class on navbar on all pages', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
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
                    await embedConfirm.isAtConfirmPage();
                    await steps.checkIfActiveClassIsAppliedToStep(0,false);
                    await steps.checkIfActiveClassIsAppliedToStep(1,false);
                    await steps.checkIfActiveClassIsAppliedToStep(2,false);
                    await steps.checkIfActiveClassIsAppliedToStep(3,false);
                    await steps.checkIfActiveClassIsAppliedToStep(4,true);
        
                });
        
                //EMBED
                it('should make purchase for two tickets of same type with donation and promotion and assert data on the receipt', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    embedDonate = new EmbedDonateComponent(driver)
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await embedDonate.clickOneDonationValueButton(2);
                    await embedDonate.clickAddDonationButton();
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
                    await embedConfirm.isAtConfirmPage();
                    await embedConfirm.clickViewReceiptButton();
                    await receipt.receiptPopupIsVisible();
                    await receipt.assertDataFromSummaryEqualReceiptValues(tickets,donations,subtotal,taxes,fees,discount,total)
        
                });
        
                //EMBED
                it('should select four tickets exceeding the limit of promotion assert tickets total equals promoted plus regular prices in Order Details ', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
        
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeOne);
                    await summary.discountIsDisplayed();
                    await payment.exceedingPromotionQuantityAlertIsDisplayed();
                    await main.clickPreviousPageButton();
                    await embedExtras.isAtExtrasPage();
                    await main.clickPreviousPageButton();
                    await embedTickets.ticketListIsDisplayed();
                    let promotedPrice = await embedTickets.getCleanTicketPriceFromPriceWithBrackets(ticketTwoName);
                    await main.clickNextPageButton();
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickSavedCardByIndex(0);
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.assertPromotedPlusRegularPriceTotalIsDisplayed(originalPrice, promotedPrice);
        
                });
        
                it('should make purchase with four tickets exceeding the limit of promotion assert promotion applied to only 3 tickets', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
        
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeOne);
                    await summary.discountIsDisplayed();
                    await payment.exceedingPromotionQuantityAlertIsDisplayed();
                    await main.clickPreviousPageButton();
                    await embedExtras.isAtExtrasPage();
                    await main.clickPreviousPageButton();
                    await embedTickets.ticketListIsDisplayed();
                    let promotedPrice = await embedTickets.getCleanTicketPriceFromPriceWithBrackets(ticketTwoName);
                    await summary.assertTotalEqualsThreePromotedPlusOneRegularTicketPrice(originalPrice, promotedPrice);
                    await main.clickNextPageButton();
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickSavedCardByIndex(0);
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.clickPlaceOrderButton();
                    await embedConfirm.isAtConfirmPage();
        
                });
        
                //EMBED 
                it('should apply the promotion code when promotion qty is finished and get promo error message and assert input field still visible', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
        
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeOne);
                    await payment.promotionNoLongerValidDangerMessageIsVisible();
        
                });
        
                //PORTAL
                it('should create promotion for 3 tickets and limit qty on two', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    createTicket = new CreateTicketModal(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
        
                //PORTAL
                it('should get promocode error validation when promotion code exists for current event', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    sideMenu = new SideMenu(driver);
                    ticketsNav = new TicketsNav(driver);
                    promotions = new PromotionsPage(driver);
                    newPromotion = new AddNewPromotionModal(driver);
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
                it('should assert that percentage taxes are recalculated and dollar value fees are same when promotion is applied', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    embedConfirm = new ConfirmPage(driver);
                    receipt = new ReceiptPopup(driver);
        
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    let fees = await summary.getFeesValue();
                    let taxes = await summary.getTaxesValue();
                    await payment.applyPromotion(promoCodeThree);
                    await summary.assertTaxesAndFeesAreRefactoredToMatchNewPrice(fees,taxes);
        
                });
        
                //PORTAL
                it('Should create staff ticket in portal', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    settingsNav = new SettingsNav(driver);
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
                it('should select account limit quantity for all tickets that have promotion in promotion with limit then add promo code and assert only highest price ticket gets discount when subtotal calculated in order total', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await summary.calculateAndAssertTotalEquals10PromotedTicketsForOriginalHighestPriceAnd10RegularForLowerPriced(ticketTwoPrice, ticketFourPrice);
        
                });
        
                //EMBED
                it('should select total of account limit quantity for limited tickets that have promotion in promotion with limit then add promo code and assert subtotal equals tickets discounted prices times quantity', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await summary.calculateAndAssertTotalEquals10PromotedTicketsByEachTicketPromotedPrice(ticketTwoPrice, ticketFourPrice);
        
                });
        
                //EMBED
                it('should select more then total of account limit quantity for limited tickets that have promotion in promotion with limit then add promo code and ' +
                    'assert subtotal equals tickets discounted prices times quantity + regular price for cheaper ticket times exceeding limit qty + assert exceeding promo message', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await payment.exceedingPromotionQuantityAlertIsDisplayed();
                    await summary.calculateAndAssertTotalEquals10PromotedTicketsByEachTicketPromotedPricePlusExceedingTicketsByRegularPrice(ticketTwoPrice, ticketFourPrice);
        
                });
        
                //EMBED
                it('should select more then total of account limit quantity for not limited ticket that have promotion ' +
                    'in promotion with limit then add promo code and assert subtotal equals tickets discounted prices times quantity ', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await payment.exceedingPromotionQuantityAlertIsNotDisplayed();
                    await summary.calculateAndAssertTotalEquals15PromotedTicketsForNotLimitedTicket(ticketThreePrice);
        
                });
        
                //EMBED
                it('should select more then promotion available qty for not limited ticket that have promotion in promotion with limit then add promo code and' +
                    ' assert subtotal equals available promotion tickets qty discounted price + regular price for exceeding qty and get exceeding info message ', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await payment.exceedingPromotionQuantityAlertIsDisplayed();
                    await summary.calculateAndAssertTotalEquals20PromotedTicketsPlus5RegularPriceForNotLimitedTicket(ticketThreePrice);
        
                });
        
                //EMBED
                it('should select 25 tickets, 11 for limited 14 for not limited, top of limited priced and 13 of not limited should get discount, limited as cheapest will not ', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await payment.exceedingPromotionQuantityAlertIsDisplayed();
                    await summary.calculateAndAssertTotalEquals20PromotedTicketsByEachTicketPromotedPricePlusExceeding5TicketsByRegularPrice(ticketTwoPrice, ticketThreePrice, ticketFourPrice);
        
                });
        
                //EMBED
                it('should select 30 tickets, 10 for each, should get discount on total 20 - top priced from limited * 10 and not limited *10 , second limited regular price ', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await payment.exceedingPromotionQuantityAlertIsDisplayed();
                    await summary.calculateAndAssertTotalEquals20PromotedTicketsTopPrice10NotLimited10(ticketTwoPrice, ticketThreePrice, ticketFourPrice);
        
                });
        
                //EMBED
                it('should select 30 tickets, 12 for top priced in limited, 12 for not limited, 6 for lower priced limited should get discount' +
                    ' on total 20 - top priced from limited * 10 and not limited *10 , second limited regular price, 2 tickets from discounted on regular ', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await payment.exceedingPromotionQuantityAlertIsDisplayed();
                    await summary.calculateAndAssertTotalEquals20PromotedTicketsTopPrice10NotLimited10RestOnRegular(ticketTwoPrice, ticketThreePrice, ticketFourPrice);
        
                });
        
                //EMBED
                it('should make purchase for 9 tickets with promotion with limits and assert total discounted value per ticket is displayed', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    embedDonate = new EmbedDonateComponent(driver)
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await summary.discountIsDisplayed();
                    await payment.clickSavedCardByIndex(0);
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.clickPlaceOrderButton();
                    await embedConfirm.isAtConfirmPage();
                    await embedConfirm.clickViewReceiptButton();
                    await receipt.receiptPopupIsVisible();
                    await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketTwoName, 0);
                    await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketThreeName, 0);
                    await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketFourName, 0);
        
                });
        
                //EMBED
                it('should make purchase for 16 tickets exceeding account limit and promotion limit and assert exceeding message and discount is applied only for quantity inside limits', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    embedDonate = new EmbedDonateComponent(driver)
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await summary.discountIsDisplayed();
                    await payment.exceedingPromotionQuantityAlertIsDisplayed();
                    await payment.clickSavedCardByIndex(0);
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.clickPlaceOrderButton();
                    await embedConfirm.isAtConfirmPage();
                    await embedConfirm.clickViewReceiptButton();
                    await receipt.receiptPopupIsVisible();
                    await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketTwoName, 1);
                    await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketThreeName, 3);
                    await receipt.calculateAndAssertOriginalTicketPriceAndDiscountIsCalculatedAndDisplayedCorrectlyNextToEachTicketByTicketName(ticketFourName, 1);
        
                });
        
                //EMBED
                it('should try to make purchase for 12 tickets when promo quantity is completed and receive promo no longer valid', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedLogin = new LoginPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedExtras = new ExtrasPage(driver);
                    embedDonate = new EmbedDonateComponent(driver)
                    payment = new PaymentPage(driver);
                    summary = new SummaryComponent(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
                    receipt = new ReceiptPopup(driver)
        
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.applyPromotion(promoCodeThree);
                    await payment.promotionNoLongerValidDangerMessageIsVisible();
        
                });
        
                //EMBED
                it('should assert on staff ticket only one ticket can be selected', async function () {
        
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
                it('should check staff modal elements and submit fully filled form', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickSavedCardByIndex(0);
                    await main.nextButtonIsVisible();
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.clickPlaceOrderButton();
                    await questionsModal.assertElementsOnStaffModal(staffTicket);
                    await questionsModal.shouldAnswerStaffFormWithRandomButValidData(base);
                    await embedConfirm.isAtConfirmPage()
        
                });
        
                //PORTAL
                it('should assert elements on event tickets questions page and create ticket question modal', async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    settingsNav = new SettingsNav(driver);
                    questions = new TicketQuestionsPage(driver);
                    questionsModal = new TicketQuestionsModal(driver);
        
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
                    await questions.isOnTicketQuestionsPage();
                    await questions.assertElementsOnEventTicketsQuestionsPage();
                    await questions.assertTicketsQuestionsTableHeaders();
                    await questions.assertElementsOnCreateTicketQuestionModal();
        
                });
        
                //PORTAL
                it('Should set ticket Simple Yes No question and assert saved data on questions table in portal', async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver)
                    eventDetails = new GeneralDetailsTab(driver);
                    settingsNav = new SettingsNav(driver);
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
                it('should check ticket questions modal for Yes/No question and submit answers in embed', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
                    questionsModal = new TicketQuestionsModal(driver);
                    originalWindow =  driver.getWindowHandle();
        
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickSavedCardByIndex(0);
                    await main.nextButtonIsVisible();
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.clickPlaceOrderButton();
                    await questionsModal.answerSimpleYesNo(base,ticketOneName);;
                    await embedConfirm.isAtConfirmPage();
        
                });
        
                //PORTAL
                it('Should set ticket question with asked input text', async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    settingsNav = new SettingsNav(driver);
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
                it('should answer ticket questions for question with input', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
                    questionsModal = new TicketQuestionsModal(driver);
                    originalWindow =  driver.getWindowHandle();
        
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickSavedCardByIndex(0);
                    await main.nextButtonIsVisible();
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.clickPlaceOrderButton();
                    await questionsModal.answerTicketQuestionWithTextInput(base,ticketOneName);
                    await embedConfirm.isAtConfirmPage();
        
                });
        
                //PORTAL
                it('Should check for first two ticket questions responses made in embed', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    ticketsNav = new TicketsNav(driver);
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
                it('Should update first ticket question with asked input text', async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    settingsNav = new SettingsNav(driver);
                    events = new EventsPage(driver);
                    login = new LoginComponent(driver);
                    info = new EventInfo(driver);
                    ticketing = new TicketingPage(driver);
                    tickets = new TicketsTab(driver);
                    extras = new ExtrasTab(driver);
                    pay = new PayTab(driver);
                    confirm = new ConfirmTab(driver);
                    questions = new TicketQuestionsPage(driver);
                    questionsModal = new TicketQuestionsModal(driver);
        
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
                it('should login with facebook assert updated ticket questions for first question , answer and submit answers', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    embedLogin = new LoginPage(driver);
                    embedExtras = new ExtrasPage(driver);
                    payment = new PaymentPage(driver);
                    orderDetails = new EmbedOrderDetailsPage(driver);
                    embedConfirm = new ConfirmPage(driver);
                    questionsModal = new TicketQuestionsModal(driver);
                    originalWindow =  driver.getWindowHandle();
        
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await embedTickets.sentKeysToTicketInput(0, 2);
                    await embedTickets.sentKeysToTicketInput(2, 1)
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
                    await embedExtras.isAtExtrasPage();
                    await main.clickNextPageButton();
                    await payment.isAtPaymentPage();
                    await payment.clickSavedCardByIndex(0);
                    await main.nextButtonIsVisible();
                    await main.clickNextPageButton();
                    await orderDetails.isOnOrderDetailsPage();
                    await orderDetails.clickPlaceOrderButton();
                    await questionsModal.assertFormAndInputAndOption(base,ticketOneName, ticketThreeName)
                    await questionsModal.answerTicketQuestionWithPerTicketQuestions();
                    await embedConfirm.isAtConfirmPage();
        
                });
        
                //PORTAL
                it('Should check response provided for the updated question', async function () {
        
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    sideMenu = new SideMenu(driver);
                    sectionsNavs = new SectionsNavs(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    ticketsNav = new TicketsNav(driver);
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
        
        
                //PORTAL
                it('should assert tickets by groups in portal',async function () {
                    portalLogin = new PortalLoginPage(driver);
                    dashboard = new DashboardPage(driver);
                    myEvents = new MyEventsPage(driver);
                    eventDetails = new GeneralDetailsTab(driver);
                    eventOptionTabs = new EventOptionTabs(driver);
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
                    await sideMenu.clickTicketingTab();
                    await eventOptionTabs.clickTicketingTab();
                    await ticketsNav.addTicketButtonIsDisplayed();
                    await ticketsNav.assertTicketsByGroupsAndClassIsAppliedWhenClicked(base, "active")
        
                });
        
                //EMBED
                it('should assert tickets groups in embed', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await embedTickets.ticketListIsDisplayed();
                    await embedTickets.assertGroupNamesAndCount(ticketGroupOne, ticketGroupTwo, ticketGroupThree);
        
                });
        
                //EMBED
                it('should assert tickets by groups and active class is applied when clicked on group in embed', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await embedTickets.ticketListIsDisplayed();
                    await embedTickets.assertTicketsByGroupsAndClassIsAppliedWhenClickedOnFullEmbed(base, "active");
        
                });
        
                //PORTAL
                it('should change ticket order in portal', async function () {
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
                it('should change ticket location from one group 2 to group 1 in portal and assert change', async function () {
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
                it('should assert tickets by groups when order and ticket group is changed in embed', async function () {
        
                    main = new EmbedMainPage(driver);
                    embedTickets = new TicketsComponent(driver);
                    await main.openEmbedPage();
                    await main.switchToIframe();
                    await main.isInFrame(eventName);
                    await embedTickets.ticketListIsDisplayed();
                    await embedTickets.assertTicketsByGroupsWhenOrderIsChangedOnFullEmbed(base);
        
                });
                
         

    });