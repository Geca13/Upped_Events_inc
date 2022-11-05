    const { Builder } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const Inbox = require("../Inbox/Inbox");
    const CreateAccountPage = require("../embed/embedPages/CreateAccountPage");
    const PortalLoginPage = require('../portal/portalPages/PortalLoginPage');
    const SettingsNav = require('../portal/ticketing/SettingsNav/SetingsNav');
    const TaxesAndFeesPage = require('../portal/ticketing/SettingsNav/TaxesAndFeesPage');
    const EventTickets = require('../portal/ticketing/EventTickets');
    const LoginPage = require('../embed/embedPages/LoginPage')
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
    const EmbedMainPage = require("../embed/embedPages/EmbedMainPage");
    const TicketsComponent = require("../embed/embedComponents/TicketsComponent");
    const EmbeddingPage = require("../portal/eventOverview/DesignNav/EmbeddingPage");
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
        
        let base = 855130 // Math.floor(100000 + Math.random() * 900000);
        let eventName =  base.toString() + " FullEventName";
        let shortName = base.toString();
        let ticketOneName = base.toString() +"T1";
        let embedTicketQuantity = 2;
        let ticketOnePrice = "1.00";
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

       /*
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
        */
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
        /*
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
        */
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


    });