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
        let ticketGroupOne = base.toString() +"TG1";
        let ticketGroupTwo = base.toString() +"TG2";
        let ticketGroupThree = base.toString() +"TG3";
        let customerFirstName = 'cfn'+base.toString();
        let customerLastName = 'cln'+base.toString();
        let customerEmail = customerFirstName + '@' + customerLastName+'.com';
        let customerPassword = base.toString() + 'Password';

        beforeEach(async function(){
            driver = new Builder().forBrowser('chrome')
            .setChromeOptions(new chrome.Options().addArguments('--headless')).build();
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


    });