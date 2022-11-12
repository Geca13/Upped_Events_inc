    const { Builder } = require('selenium-webdriver');
    const Inbox = require("../helpers/Inbox")
    const PortalLoginPage = require('../portal/portalPages/PortalLoginPage');
    const DashboardPage = require('../portal/dashboard/Dashboard');
    const AttendeesTab = require('../portal/eventOverview/AttendeesTab')
    const CreateEventModal = require('../portal/portalModals/CreateEventModal');
    const MyEventsPage = require('../portal/dashboard/MyEventsTab');
    const CreateTicketModal = require('../portal/portalModals/CreateTicketModal');
    const TicketsNav = require('../portal/ticketing/TicketsNav');
    const GeneralDetailsTab = require('../portal/eventOverview/GeneralDetailsTab');
    const PromotionsPage = require('../portal/promotions/PromotionsPage');
    const AddNewPromotionModal = require('../portal/portalModals/CreatePromotionModal');
    const TaxesAndFeesPage = require('../portal/ticketing/SettingsNav/TaxesAndFeesPage');
    const BOSelectTickets = require('../portal/ticketing/BoxOffice/BOSelectTickets');
    const BOAddExtras = require('../portal/ticketing/BoxOffice/BOAddExtras');
    const BOAddDetails = require('../portal/ticketing/BoxOffice/BOAddDetails');
    const BOReviewAndPay = require('../portal/ticketing/BoxOffice/BOReviewAndPay');
    const SideMenu = require('../portal/portalComponents/SideMenu');
    const SectionsNavs = require('../portal/portalComponents/SectionsNavs');
    const chrome = require("selenium-webdriver/chrome");


    describe('Should do box office related tests', function () {
        this.timeout(500000);
        let driver;
        let portalLogin;
        let dashboard;
        let createEvent;
        let myEvents;
        let createTicket;
        let ticketsNav;
        let promotions;
        let newPromotion;
        let attendees;
        let eventDetails;
        let taxesAndFees;
        let inbox;
        let bosTickets;
        let bosExtras;
        let bosDetails;
        let bosReview;
        let sideMenu;
        let sectionsNavs;
        let eventId ;


        let base = Math.floor(100000 + Math.random() * 900000);
        let eventName =  base.toString() + " FullEventName";
        let shortName = base.toString();
        let ticketOneName = base.toString() +"T1";
        let ticketOneQuantity = 999;
        let ticketOnePrice = 1.00;
        let ticketTwoName = base.toString() +"T2";
        let ticketTwoQuantity = 888;
        let ticketTwoPrice = 1.20;
        let ticketThreeName = base.toString() +"T3";
        let ticketThreeQuantity = 777;
        let ticketThreePrice = 0.75;
        let ticketFourName = base.toString() +"T4";
        let ticketFourQuantity = 666;
        let ticketFourPrice = 0.25;
        let staffTicket = base.toString() +"staff";
        let ticketStaffQuantity = 5;
        let ticketStaffPrice = 0.25;
        let ticketToBeDeleted = base.toString() +"delete";
        let ticketToBeDeletedQuantity = 666;
        let ticketToBeDeletedPrice = 0.25;
        let promoThreeName = base.toString() +"PN3";
        let promoFiveName = base.toString() +"PN100";
        let promoCodeThree = base.toString() +"PC3";
        let promoCodeFive = base.toString() +"PC100";
        let ticketGroupOne = base.toString() +"TG1";
        let ticketGroupTwo = base.toString() +"TG2";
        let ticketGroupThree = base.toString() +"TG3";

        beforeEach(async function(){
            driver = await new Builder().forBrowser('chrome').build();
            await driver.manage().window().maximize();
            
            portalLogin = new PortalLoginPage(driver);
            dashboard = new DashboardPage(driver);
            myEvents = new MyEventsPage(driver);
            eventDetails = new GeneralDetailsTab(driver);
            ticketsNav = new TicketsNav(driver);
            bosTickets = new BOSelectTickets(driver);
            bosExtras = new BOAddExtras(driver);
            bosDetails = new BOAddDetails(driver);
            bosReview = new BOReviewAndPay(driver);
            sideMenu = new SideMenu(driver);
            sectionsNavs = new SectionsNavs(driver);

            await portalLogin.loadPortalUrl();
            await portalLogin.isAtPortalLoginPage();
            await portalLogin.enterValidCredentialsAndLogin();
            await dashboard.isAtDashboardPage();

        });

        afterEach(async function(){
            if (driver){
                try {
                    await driver.quit();
                } catch(e) {
                    console.log('Failed to close webdriver due: ' + e.message);
                }
            }else{
                console.log("No active driver")
            }

        })
/*
        it('should create new event',async function () {
            let split ;
            createEvent = new CreateEventModal(driver);

            await dashboard.clickCreateEventButton();
            await createEvent.createEventModalIsDisplayed();
            await createEvent.fillFormWithValidDataAndSave(eventName,shortName);
            let urlToSplit = await driver.getCurrentUrl();
            split = await urlToSplit.split('/')
            eventId = split[split.length - 2]
        });

        it('should verify box-office table headers and no tickets message', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.assertBoxOfficeTicketsTableHeaders();
            await bosTickets.assertNoTicketMessage();

        });

        it('should create first ticket and assert data in box-office table',async function () {

            createTicket = new CreateTicketModal(driver);

            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickAddTicketButton();
            await createTicket.createNewTicket(ticketOneName,ticketOnePrice, ticketOneQuantity);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickActivateTicketToggle(ticketOneName);
            await sectionsNavs.clickNavByText("Box Office");
            await bosTickets.assertTicketDataByTicketName(ticketOneName,ticketOnePrice.toFixed(2), ticketOneQuantity);

        });
        

        it('should assert box-office navigation steps names',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.assertNavigationButtonsCountAndText();

        });

        it('should get red error message when tickets are not selected and user clicks on the save button',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.clickSaveButtonWhenTicketsNotSelectedAssertErrorMessage();

        });

        it('should get red error message when tickets are not selected and user clicks on the Add Extras Step Nav',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.clickAddExtrasNavButtonWhenTicketsNotSelectedAssertErrorMessage();

        });

        it('should land on Extras page when user selects tickets and click on Save button',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.isOnExtrasScreen();

        });

        it('should land on Extras page when user selects tickets and click on Extras Step Nav',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(1);
            await bosExtras.isOnExtrasScreen();

        });

        it('should land on Details page when user selects tickets and click on Details Step Nav',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(2);
            await bosDetails.isOnDetailsPage();

        });

        it('should land on Payment page when user selects tickets and click on Review Step Nav',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(3);
            await bosReview.isOnReviewPage();

        });

        it('should set and assert new price and its font color', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.addNewQuantityAndSetNewPrice();

        });

        it('should navigate to Extras page and assert elements',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.assertElementsOnExtrasPage();

        });

        it('should get blue donation not enabled when clicked donation option and donation not enabled in portal',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickDonationOptionAndReceiveDonationNotEnabledMessage();

        });

        it('should enable donation in portal and assert donation component is displayed and assert elements',async function () {

            
            sectionsNavs = new SectionsNavs(driver)
            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await sectionsNavs.moveToEventNavs();
            await sectionsNavs.clickNavByIndex(3);
            await sectionsNavs.subNavsAreDisplayed();
            await sectionsNavs.makeDonationActive();
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickOnDonationOptionAndAssertElements(eventName)

        });

        it('should assert when donation value button is clicked the value is displayed in input',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickDonationOptionAndAssertWhenDonationButtonClickedValueAddedToInput();

        });

        it('should enter custom decimal amount, assert the input shows the digits only  ',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickDonationOptionAddCustomDecimalDonationAndAssertOnlyFullNumberIsDisplayed();

        });

        it('should enter custom amount, click add to order button and assert green added donation message',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickDonationOptionAddCustomDonationAndAssertAddedDonationMessage();

        });

        it('should add custom donation add to order, open the modal and check if value is still in input',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.checkDonationAmountIsSavedInDonationModal();

        });

        it('should click Select Tickets nav from Extras page to go back to Tickets page and assert previously selected ticket value is still selected',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickNavButtonByIndexWhenOnExtrasPage(0);
            await bosTickets.assertSelectedQtyByIndex(0, 2);

        });

        it('should click Add Details nav from Extras page to go to Details tab',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickNavButtonByIndexWhenOnExtrasPage(2);
            await bosDetails.isOnDetailsPage();

        });

        it('should click Review and Pay nav from Extras page to go to Review page',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickNavButtonByIndexWhenOnExtrasPage(3);
            await bosReview.isOnReviewPage();

        });

        it('should assert elements on Order Details page when only 1 ticket selected and no taxes , fees, donation, promotion and ticket questions',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 1);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(2);
            await bosDetails.assertElementsOnOrderDetailsWithOnlyBasicTicket(ticketOneName);

        });

        it('should assert elements on Review and Pay page when only 1 ticket selected and no taxes , fees, donation or promotion',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 1);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(3);
            await bosReview.assertElementsOnReviewAndPayPageWhenOneTicketSelected(ticketOneName);

        });

        it('should add excluded tax and check if bayer total is updated in ticket summary', async function () {

            taxesAndFees = new TaxesAndFeesPage(driver);

            await taxesAndFees.openTaxesAndFeesDirectly(eventId);
            await taxesAndFees.addOneTaxForTickets();
            await taxesAndFees.clickSaveTaxesAndFeesButton();
            let savedTaxValue = await taxesAndFees.getFloatNumberForTaxOrFee(1,1);
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(2);
            await bosDetails.assertTaxValueAndTicketTotalMultipliedByTaxEqualsTotal(savedTaxValue);

        });

        it('should remove tax and add $ value fee and assert price in order total', async function () {

            taxesAndFees = new TaxesAndFeesPage(driver);

            await taxesAndFees.openTaxesAndFeesDirectly(eventId);
            await taxesAndFees.clickRemoveTaxOrFeeButtonByIndex(0);
            await taxesAndFees.clickSaveTaxesAndFeesButton();
            await taxesAndFees.set$FeeForTickets("Check $ Fee", ".17");
            await taxesAndFees.clickSaveTaxesAndFeesButton();
            let saved$FeeValue = await taxesAndFees.get$FeeFromInputByIndex(1);
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(2);
            await bosDetails.assertFeeValueThenTicketTotalPlusFeeTimesTicketQtyEqualsTotal(saved$FeeValue);

        });

        it('should add excluded tax again and check correct calculation for total', async function () {

            taxesAndFees = new TaxesAndFeesPage(driver);

            await taxesAndFees.openTaxesAndFeesDirectly(eventId);
            await taxesAndFees.addOneTaxForTickets();
            await taxesAndFees.clickSaveTaxesAndFeesButton();
            let savedTaxValue = await taxesAndFees.getFloatNumberForTaxOrFee(1,1);
            let saved$FeeValue = await taxesAndFees.get$FeeFromInputByIndex(2);
            let cleanedFee = saved$FeeValue.substring(1)
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(2);
            await bosDetails.assertFeeAndTaxValuesThenAssertTicketTotalPlusFeesAndTaxesEqualsTotal(savedTaxValue, cleanedFee);

        });

        it('should create ticket groups and three more tickets',async function () {

            createTicket = new CreateTicketModal(driver);

            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
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

        });
        
        

        it('should create promotion for 3 tickets with limit qty on two and create 100% promotion', async function () {

            createTicket = new CreateTicketModal(driver);
            promotions = new PromotionsPage(driver);
            newPromotion = new AddNewPromotionModal(driver);

            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await sideMenu.clickPromotionsTab();
            await promotions.addPromotionButtonIsVisible();
            await promotions.clickAddPromotionButton();
            await newPromotion.addPromotionModalIsDisplayed();
            await newPromotion.newPromotionForThreeWithLimitOnTwo(ticketTwoName, ticketThreeName, ticketFourName, promoThreeName, promoCodeThree);
            await promotions.addPromotionButtonIsVisible();
            await promotions.clickAddPromotionButton();
            await newPromotion.addPromotionModalIsDisplayed();
            await newPromotion.createPromotionWith100discountForAllTickets(ticketOneName, promoFiveName, promoCodeFive);
            await promotions.promotionsHeaderIsVisible();
            await sideMenu.ticketingTabIsDisplayed();
            
        });
        
 

        it('should return invalid promo code applied message when promo code start time is in the future', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.select3Tickets();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.isOnDetailsPage();
            await bosDetails.addPromotionToTickets(promoCodeFive);
            await bosDetails.assertReturnedValidationMessage("Invalid Discount Code");

        });
        
        

        it('Should create staff ticket in portal', async function () {

            createTicket = new CreateTicketModal(driver);

            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickAddTicketButton();
            await createTicket.createStaffTicket(staffTicket, ticketStaffPrice ,ticketStaffQuantity);
            await ticketsNav.assertTicketNamePriceAndQuantity(staffTicket, ticketStaffPrice, ticketStaffQuantity);
            await ticketsNav.clickActivateTicketToggle(staffTicket);

        });

        it('should assert tickets groups in box-office', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.assertTicketGroupsTabsCountAndNames(ticketGroupOne, ticketGroupTwo, ticketGroupThree);

        });

        it('should assert tickets order in box-office', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.assertTicketsOrder(ticketOneName, ticketTwoName, ticketThreeName, ticketFourName, staffTicket);

        });

        it('should assert ticket quantity by group equals tickets in table', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.assertTicketQuantityByGroup();

        });

        it('should assert ticket quantity in Group All equals sum of individual groups count', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.assertTicketCountInAllTabEqualsSumOfIndividualGroups();

        });

        it('should assert tickets by groups in box-office', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.assertTicketsByGroups(ticketOneName, ticketTwoName, ticketThreeName, ticketFourName);

        });

        it('should change ticket order in portal and assert change in box-office', async function () {

            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.dragThirdTicketInTopPosition();
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.assertTicketsOrderAfterChangedOrder(ticketOneName, ticketTwoName, ticketThreeName, ticketFourName);

        });

        it('should change ticket location from one group 2 to group 1 in portal and assert change', async function () {

            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickGroupTabsByIndexAssertNumberOfTickets(ticketOneName, ticketTwoName, ticketThreeName, staffTicket);
            await ticketsNav.dragTicketFromGroupTwoToGroupOne();
            await ticketsNav.assertTicketIsRemovedFromGroupTwoAndAddedToGroupOne(ticketOneName, ticketTwoName, ticketThreeName, staffTicket);

        });

        it('Should check attendees page elements when no purchases made', async function () {

            attendees = new AttendeesTab(driver);
            sectionsNavs = new SectionsNavs(driver)
            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(2000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await driver.sleep(500);
            await sectionsNavs.clickNavByIndex(4);
            await attendees.isOnAttendeesTab();
            await attendees.noAttendeesInTableMessage();

        });

        it('Should make purchase with card when user has account and additional email is provided and check purchase emails in inbox', async function () {
            inbox = new Inbox(driver);

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTwoTickets();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.continueToPayment();
            await bosReview.makePaymentWithCard(base);
            await inbox.loadInbox();
            await inbox.inboxIsOpened();
            await inbox.checkAccountEmailIsSend(base);
            await inbox.checkAdditionalEmailIsSend(base);

        });

        it('Should assert attendee is displayed in table after purchase', async function () {

            attendees = new AttendeesTab(driver);
            sectionsNavs = new SectionsNavs(driver);
            
            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(2000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await driver.sleep(500);
            await sectionsNavs.clickNavByIndex(4);
            await attendees.isOnAttendeesTab();
            await attendees.checkForCustomerFullNameByIndex(0 , base, base);

        });
        
        

        it('Should make purchase with cash when user has account and additional email is provided', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.selectTwoTickets();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.continueToPayment();
            await bosReview.makePaymentWithCash(base);

        });
*/
        it('should return invalid promo code when wrong promo code', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.select3Tickets();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.addWrongPromoCodeAssertErrorValidation();

        });

        it('should return green promo code applied message when promo code is valid', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.select3Tickets();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.isOnDetailsPage();
            await bosDetails.addPromotionToTickets(promoCodeThree);
            await bosDetails.assertReturnedValidationMessage("Promo Code Applied!");

        });

        it('Should check calculation on subtotal and total and check if tickets are displayed', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.getSelectedTicketsNames(ticketOneName,ticketTwoName,ticketThreeName,ticketFourName, staffTicket);
            await bosTickets.selectFourIndividualTickets();
            await bosExtras.clickNextButton();
            await bosDetails.checkTicketsNamesInOrderDetails(ticketOneName,ticketTwoName,ticketThreeName,ticketFourName);
            await bosDetails.checkTicketPricesInOrderDetails();
            await bosDetails.calculateTicketsSubTotal();
            await bosDetails.calculateTicketsTotal()

        });

        it('Should make purchase with 100 percent promotion in box-office', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.select18Tickets();
            await bosExtras.clickNextButton();
            await bosDetails.confirmAllValuesAreZeroesAfter100PercentPromotionAndConfirmCompletion(promoCodeFive);
            await bosDetails.continueToPayment();
            await bosReview.paymentWith100DiscountAndPaymentCard(base);

        });

        it('Should make calculation for promotion with limits , exceed limit , assert totals', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.select23TicketsForPromotionWithLimits();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.assertTotalValueBeforeAndAfterPromotionWhenLimitsWereExceeded(ticketTwoPrice, ticketThreePrice, ticketFourPrice, promoCodeThree);

        });

        it('Should assert that order details on add details equals on review page when promotion and donation is added', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.select18Tickets();
            await bosExtras.add20$ToOrderOnExtrasPage();
            await bosDetails.assertValuesInOrderDetailsComponentEqualsOnAddDetailsAndReviewPage(promoCodeThree);

        });

        it('Should make payment for promotion with limits , and buy all promoted tickets', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.select23TicketsForPromotionWithLimits();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.addPromotionToTickets(promoCodeThree);
            await bosDetails.continueToPayment();
            await bosReview.makePaymentWithCard(base);

        });

        it('should get invalid promotion message when promotion with limited qty is over', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.select23TicketsForPromotionWithLimits();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.applyExpiredPromoCode(promoCodeThree);
            await bosDetails.redErrorAlertIsReturned("This promotion code is no longer valid");

        });

        it('should assert that the sold tickets for each ticket in box office table equals the values in tickets main table', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.isOnBoxOfficePage();
            let soldBoxOffice = await bosTickets.getSoldTicketsNumberForEachTicket();
            await ticketsNav.openTicketsPageDirectly(eventId)
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.assertTicketsSoldInBoxOfficeEqualsSoldTicketsInTicketsNav(soldBoxOffice);

        });

        it('should create new ticket and assert data in box-office table',async function () {

            createTicket = new CreateTicketModal(driver);

            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickAddTicketButton();
            await createTicket.createNewTicket(ticketToBeDeleted,ticketToBeDeletedPrice, ticketToBeDeletedQuantity);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickActivateTicketToggle(ticketToBeDeleted);
            await sectionsNavs.clickNavByIndex(4)
            await bosTickets.assertTicketDataByTicketName(ticketToBeDeleted,ticketToBeDeletedPrice.toFixed(2), ticketToBeDeletedQuantity);

        });

        it('should try and fail to delete ticket that has sold some quantity',async function () {

            createTicket = new CreateTicketModal(driver);

            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await driver.sleep(1000);
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickDeleteTicketButtonByTicketName(ticketOneName);
            await ticketsNav.errorDeletingTicketMessage();

        });

        it('should assert tickets count in box office, delete in portal, assert deletion in box-office', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.isOnBoxOfficePage();
            let tickets = await bosTickets.returnTotalTicketsInBox();
            await ticketsNav.openTicketsPageDirectly(eventId);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickDeleteTicketButtonByTicketName(ticketToBeDeleted);
            await bosTickets.openBoxOfficeDirectly(eventId);
            await bosTickets.assertTicketsCount(tickets);

        });



    });