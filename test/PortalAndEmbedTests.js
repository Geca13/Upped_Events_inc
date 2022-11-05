    const { Builder } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const PortalLoginPage = require('../portal/portalPages/PortalLoginPage');
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

        let base = Math.floor(100000 + Math.random() * 900000);
        let eventName =  base.toString() + " FullEventName";
        let shortName = base.toString();
        let ticketOneName = base.toString() +"T1";
        let embedTicketQuantity = 2;
        let ticketOnePrice = "1.00";

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
                
    });