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
    const DonationPage = require("../portal/eventOverview/eventSettings/DonationsPage");
    const CreateDonationModal = require("../portal/portalModals/CreateDonationModal");


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
        let donation;
        let createDonation;
        let eventId ;


        let base =  Math.floor(100000 + Math.random() * 900000);
        let eventName =  base.toString() + " FullEventName";
        let shortName = base.toString();
        let ticketOneName = base.toString() +"T1";
        let ticketOneQuantity = 999;
        let ticketOnePrice = "1.00";
        let ticketOnePriceStage = "0.10";
        let ticketTwoName = base.toString() +"T2";
        let ticketTwoQuantity = 888;
        let ticketTwoPrice = "1.20";
        let ticketTwoPriceStage = "0.12";
        let ticketThreeName = base.toString() +"T3";
        let ticketThreeQuantity = 777;
        let ticketThreePrice = "0.75";
        let ticketThreePriceStage = "0.04";
        let ticketFourName = base.toString() +"T4";
        let ticketFourQuantity = 666;
        let ticketFourPrice = "0.40";
        let ticketFourPriceStage = "0.02";
        let staffTicket = base.toString() +"staff";
        let ticketStaffQuantity = 2;
        let ticketStaffPrice = "0.23";
        let uppedFeePercent = 2;
        let uppedFee$ = 0.5;
        let addedTax = 13.17;
        let addedTaxName = "Tax"
        let addedFee = 0.02;
        let addedFeeName = "Fee";

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
        let environment = 'dev';

        beforeEach(async function(){
            driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--headless')).build();
            await driver.manage().window().setRect({width: 1300, height: 1080});
            //driver = await new Builder().forBrowser('chrome').build();
            //await driver.manage().window().setRect({width: 1300, height: 1080});
            
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

            if(environment === "stage"){
                await portalLogin.loadAndLoginToStagePortal()
            } else {
                await portalLogin.loadAndLoginToDevPortal();
            }
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
        it('BO_01_should create new event',async function () {
            let split ;
            createEvent = new CreateEventModal(driver);

            await dashboard.clickCreateEventButton();
            await createEvent.createEventModalIsDisplayed();
            await createEvent.fillFormWithValidDataAndSave(eventName,shortName);
            let urlToSplit = await driver.getCurrentUrl();
            split = await urlToSplit.split('/')
            eventId = split[split.length - 2]
        });

        it('BO_02_should create first ticket and assert data in box-office table',async function () {

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

            if(environment === "stage"){
                await createTicket.createNewTicket(ticketOneName,ticketOnePriceStage, ticketOneQuantity);
            } else {
                await createTicket.createNewTicket(ticketOneName,ticketOnePrice, ticketOneQuantity);
            }

            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickActivateTicketToggle(ticketOneName);
            await sectionsNavs.clickNavByText("Box Office");
            if(environment === "stage"){
                await bosTickets.assertTicketDataByTicketName(ticketOneName,ticketOnePriceStage, ticketOneQuantity);
            } else {
                await bosTickets.assertTicketDataByTicketName(ticketOneName,ticketOnePrice, ticketOneQuantity);
            }


        });

        it('BO_03_should assert box-office navigation steps names',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.assertNavigationButtonsCountAndText();

        });

        it('BO_04_should get red error message when tickets are not selected and user clicks on the save button',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.clickSaveButtonWhenTicketsNotSelectedAssertErrorMessage();

        });

        it('BO_05_should get red error message when tickets are not selected and user clicks on the Add Extras Step Nav',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.clickAddExtrasNavButtonWhenTicketsNotSelectedAssertErrorMessage();

        });

        it('BO_06_should land on Extras page when user selects tickets and click on Save button',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.isOnExtrasScreen();

        });

        it('BO_07_should land on Extras page when user selects tickets and click on Extras Step Nav',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(1);
            await bosExtras.isOnExtrasScreen();

        });

        it('BO_08_should land on Details page when user selects tickets and click on Details Step Nav',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(2);
            await bosDetails.isOnDetailsPage();

        });

        it('BO_09_should land on Payment page when user selects tickets and click on Review Step Nav',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(3);
            await bosReview.isOnReviewPage();

        });

        it('BO_10_should set and assert new price and its font color', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.overrideTheOriginalPriceForTicketByIndex(0);
            await bosTickets.assertNewPriceAndTextFontColor();

        });

        it('BO_11_should navigate to Extras page and assert elements',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.assertElementsOnExtrasPage();

        });

        it('BO_12_should get blue donation not enabled when clicked donation option and donation not enabled in portal',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickDonationOptionAndReceiveDonationNotEnabledMessage();

        });

        it('BO_13_should enable donation in portal and assert donation component is displayed and assert elements',async function () {


            sectionsNavs = new SectionsNavs(driver)
            donation = new DonationPage(driver);
            createDonation = new CreateDonationModal(driver);
            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await sideMenu.ticketingTabIsDisplayed();
            await sectionsNavs.clickNavByText("Settings");
            await sectionsNavs.clickSubNavByText("Donations");
            await donation.donationPageIsVisible();
            await donation.activateDonationsOnEvent();
            await donation.clickAddDonationButton();
            await createDonation.createDonation();
            await donation.donationPageIsVisible();
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickOnDonationOptionAndAssertElements(eventName)

        });

        it('BO_14_should assert when donation value button is clicked the value is displayed in input',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickDonationOptionAndAssertWhenDonationButtonClickedValueAddedToInput();

        });

        it('BO_15_should enter custom amount, click add to order button and assert green added donation message',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickDonationOptionAddCustomDonationAndAssertAddedDonationMessage();

        });

        it('BO_16_should add custom donation add to order, open the modal and check if value is still in input',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.checkDonationAmountIsSavedInDonationModal();

        });

        it('BO_17_should click Select Tickets nav from Extras page to go back to Tickets page and assert previously selected ticket value is still selected',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickNavButtonByIndexWhenOnExtrasPage(0);
            await bosTickets.assertSelectedQtyByIndex(0, 2);

        });

        it('BO_18_should click Add Details nav from Extras page to go to Details tab',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickNavButtonByIndexWhenOnExtrasPage(2);
            await bosDetails.isOnDetailsPage();

        });

        it('BO_19_should click Review and Pay nav from Extras page to go to Review page',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 2);
            await bosExtras.clickNavButtonByIndexWhenOnExtrasPage(3);
            await bosReview.isOnReviewPage();

        });

        it('BO_20_should assert elements on Order Details page when only 1 ticket selected and only uppedFees included',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 1);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(2);

            if(environment === "stage"){
                await bosDetails.assertElementsOnOrderDetailsWithOnlyBasicTicket(ticketOneName, ticketOnePriceStage, uppedFee$,uppedFeePercent);
            } else {
                await bosDetails.assertElementsOnOrderDetailsWithOnlyBasicTicket(ticketOneName, ticketOnePrice, uppedFee$,uppedFeePercent);
            }

        });

        it('BO_21_should assert elements on Review and Pay page when only 1 ticket selected and only uppedFees included',async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 1);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(3);
            if(environment === "stage"){
                await bosReview.assertElementsOnReviewAndPayPageWhenOneTicketSelected(ticketOneName, ticketOnePriceStage, uppedFee$,uppedFeePercent);
            } else {
                await bosReview.assertElementsOnReviewAndPayPageWhenOneTicketSelected(ticketOneName, ticketOnePrice, uppedFee$,uppedFeePercent);
            }

        });

        it('BO_22_should add excluded percentage tax and $ fee and assert if bayer total is updated in ticket summary', async function () {

            taxesAndFees = new TaxesAndFeesPage(driver);

            await taxesAndFees.openTaxesAndFeesDirectly(eventId, environment);
            await taxesAndFees.addPercentTaxAndDollarFee(addedTaxName, addedTax, addedFeeName, addedFee)
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTicketByIndexSendQuantityAndSave(0, 1);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(2);

            if(environment === "stage"){
                await bosDetails.assertAddedTaxAndFeesReflectsTheNewTotal(ticketOnePriceStage,uppedFeePercent, uppedFee$, addedTax,  addedFee);
            }else{
                await bosDetails.assertAddedTaxAndFeesReflectsTheNewTotal(ticketOnePrice,uppedFeePercent, uppedFee$, addedTax,  addedFee);
            }

        });

        it('BO_23_should create ticket groups and three more tickets',async function () {

            createTicket = new CreateTicketModal(driver);

            await sectionsNavs.clickNavByIndex(1);
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
            if(environment === "stage"){
                await createTicket.createNewTicket(ticketTwoName,ticketTwoPriceStage,ticketTwoQuantity);
            }else{
                await createTicket.createNewTicket(ticketTwoName,ticketTwoPrice,ticketTwoQuantity);
            }
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.createdTicketIsInTheTable(ticketTwoName);
            await ticketsNav.clickActivateTicketToggle(ticketTwoName);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickAddTicketButton();
            await createTicket.ticketNameInputIsDisplayed();
            if(environment === "stage"){
                await createTicket.createNewTicket(ticketThreeName,ticketThreePriceStage,ticketThreeQuantity);
            }else{
                await createTicket.createNewTicket(ticketThreeName,ticketThreePrice,ticketThreeQuantity);
            }
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.createdTicketIsInTheTable(ticketThreeName);
            await ticketsNav.clickActivateTicketToggle(ticketThreeName);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.createTicketsGroup(ticketGroupThree);
            await ticketsNav.clickGroupTabByIndex(3);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickAddTicketButton();
            await createTicket.ticketNameInputIsDisplayed();
            if(environment === "stage"){
                await createTicket.createNewTicket(ticketFourName,ticketFourPriceStage,ticketFourQuantity);
            }else{
                await createTicket.createNewTicket(ticketFourName,ticketFourPrice,ticketFourQuantity);
            }
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.createdTicketIsInTheTable(ticketFourName);
            await ticketsNav.clickActivateTicketToggle(ticketFourName);
            await ticketsNav.clickGroupTabByIndex(0);
            await ticketsNav.assertTicketGroupNames(ticketGroupOne, ticketGroupTwo, ticketGroupThree);
            if(environment === "stage"){
                await ticketsNav.assertTicketNamePriceAndQuantity(ticketOneName,ticketOnePriceStage,ticketOneQuantity);
                await ticketsNav.assertTicketNamePriceAndQuantity(ticketTwoName,ticketTwoPriceStage,ticketTwoQuantity);
                await ticketsNav.assertTicketNamePriceAndQuantity(ticketThreeName,ticketThreePriceStage,ticketThreeQuantity);
                await ticketsNav.assertTicketNamePriceAndQuantity(ticketFourName,ticketFourPriceStage,ticketFourQuantity);
            }else{
                await ticketsNav.assertTicketNamePriceAndQuantity(ticketOneName,ticketOnePrice,ticketOneQuantity);
                await ticketsNav.assertTicketNamePriceAndQuantity(ticketTwoName,ticketTwoPrice,ticketTwoQuantity);
                await ticketsNav.assertTicketNamePriceAndQuantity(ticketThreeName,ticketThreePrice,ticketThreeQuantity);
                await ticketsNav.assertTicketNamePriceAndQuantity(ticketFourName,ticketFourPrice,ticketFourQuantity);
            }

        });
        
        it('BO_24_should create promotion for 3 tickets with limit qty on two and create 100% promotion', async function () {

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
        
        it('BO_25_should return invalid promo code applied message when promo code start time is in the future', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.select3Tickets();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.isOnDetailsPage();
            await bosDetails.addPromotionToTickets(promoCodeFive);
            await bosDetails.assertReturnedValidationMessage("Invalid Discount Code");

        });
        
        it('BO_26_should create staff ticket in portal', async function () {

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

        it('BO_27_should assert tickets groups in box-office', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.assertTicketGroupsTabsCountAndNames(ticketGroupOne, ticketGroupTwo, ticketGroupThree);

        });

        it('BO_28_should assert tickets order in box-office', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.assertTicketsOrder(ticketOneName, ticketTwoName, ticketThreeName, ticketFourName, staffTicket);

        });

        it('BO_29_should assert ticket quantity by group equals tickets in table', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.assertTicketQuantityByGroup();

        });

        it('BO_30_should assert ticket quantity in Group All equals sum of individual groups count', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.assertTicketCountInAllTabEqualsSumOfIndividualGroups();

        });

        it('BO_31_should assert tickets by groups in box-office', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.assertTicketsByGroups(ticketOneName, ticketTwoName, ticketThreeName, ticketFourName);

        });

        it('BO_32_should change ticket order in portal and assert change in box-office', async function () {

            await dashboard.clickMyEventsTab();
            await myEvents.eventsTableIsDisplayed();
            await myEvents.createdEventIsInTheTable(eventName);
            await myEvents.clickTheNewCreatedEventInTheTable(eventName);
            await eventDetails.publishButtonIsDisplayed();
            await sideMenu.clickTicketingTab();
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.dragThirdTicketInTopPosition();
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.assertTicketsOrderAfterChangedOrder(ticketOneName, ticketTwoName, ticketThreeName, ticketFourName);

        });

        it('BO_33_should change ticket location from one group 2 to group 1 in portal and assert change', async function () {

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

        it('BO_34_should check attendees page elements when no purchases made', async function () {

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

        it('BO_35_should make purchase with card when user has account and additional email is provided and check purchase emails in inbox', async function () {
            inbox = new Inbox(driver);

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
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

        it('BO_36_should assert attendee is displayed in table after purchase', async function () {

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
        
        it('BO_37_should make purchase with cash when user has account and additional email is provided', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.selectTwoTickets();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.continueToPayment();
            await bosReview.makePaymentWithCash(base);

        });

        it('BO_38_should return invalid promo code when wrong promo code', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.select3Tickets();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.addWrongPromoCodeAssertErrorValidation();

        });

        it('BO_39_should return green promo code applied message when promo code is valid', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.select3Tickets();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.isOnDetailsPage();
            await bosDetails.addPromotionToTickets(promoCodeThree);
            await bosDetails.assertReturnedValidationMessage("Promo Code Applied!");

        });

        it('BO_40_should check calculation on subtotal and total and check if tickets are displayed', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.getSelectedTicketsNames(ticketOneName,ticketTwoName,ticketThreeName,ticketFourName, staffTicket);
            await bosTickets.selectFourIndividualTickets();
            await bosExtras.clickNextButton();
            await bosDetails.checkTicketsNamesInOrderDetails(ticketOneName,ticketTwoName,ticketThreeName,ticketFourName);
            await bosDetails.checkTicketPricesInOrderDetails();
            await bosDetails.calculateTicketsSubTotal();
            await bosDetails.calculateTicketsTotal()

        });

        it('BO_41_should make purchase with 100 percent promotion in box-office', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.select18Tickets();
            await bosExtras.clickNextButton();
            await bosDetails.confirmTotalTaxesAndFeesAreZeroedAndTheSubtotalRemainsTheSameAndDiscountEqualsSubtotal(promoCodeFive);
            await bosDetails.continueToPayment();
            await bosReview.paymentWith100DiscountAndPaymentCard(base);

        });

        it('BO_42_should make calculation for promotion with limits , exceed limit , assert totals', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.select23TicketsForPromotionWithLimits();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            if(environment === "stage"){
                await bosDetails.assertTotalValueBeforeAndAfterPromotionWhenLimitsWereExceeded(ticketTwoPriceStage, ticketThreePriceStage, ticketFourPriceStage, promoCodeThree);
            }else{
                await bosDetails.assertTotalValueBeforeAndAfterPromotionWhenLimitsWereExceeded(ticketTwoPrice, ticketThreePrice, ticketFourPrice, promoCodeThree);
            }

        });

        it('BO_43_should assert that order details on add details equals on review page when promotion and donation is added', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.select18Tickets();
            await bosExtras.add10$ToOrderOnExtrasPage();
            await bosDetails.assertValuesInOrderDetailsComponentEqualsOnAddDetailsAndReviewPage(promoCodeThree);

        });

        it('BO_44_should make payment for promotion with limits , and buy all promoted tickets', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.select23TicketsForPromotionWithLimits();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.addPromotionToTickets(promoCodeThree);
            await bosDetails.continueToPayment();
            await bosReview.makePaymentWithCard(base);

        });

        it('BO_45_should get invalid promotion message when promotion with limited qty is over', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.select23TicketsForPromotionWithLimits();
            await bosExtras.isOnExtrasScreen();
            await bosExtras.clickNextButton();
            await bosDetails.applyExpiredPromoCode(promoCodeThree);
            await bosDetails.redErrorAlertIsReturned("This promotion code is no longer valid");

        });

        it('BO_46_should assert that the sold tickets for each ticket in box office table equals the values in tickets main table', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.isOnBoxOfficePage();
            let soldBoxOffice = await bosTickets.getSoldTicketsNumberForEachTicket();
            await ticketsNav.openTicketsPageDirectly(eventId, environment)
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.assertTicketsSoldInBoxOfficeEqualsSoldTicketsInTicketsNav(soldBoxOffice);

        });

        it('BO_47_should create new ticket and assert data in box-office table',async function () {

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

        it('BO_48_should try and fail to delete ticket that has sold some quantity',async function () {

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

        it('BO_49_should assert tickets count in box office, delete in portal, assert deletion in box-office', async function () {
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.isOnBoxOfficePage();
            let tickets = await bosTickets.returnTotalTicketsInBox();
            await ticketsNav.openTicketsPageDirectly(eventId, environment);
            await ticketsNav.addTicketButtonIsDisplayed();
            await ticketsNav.clickDeleteTicketButtonByTicketName(ticketToBeDeleted);
            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.assertTicketsCount(tickets);

        });

        it('BO_50_should set new price and make payment assert taxes and fees are updated and make payment', async function () {

            await bosTickets.openBoxOfficeDirectly(eventId, environment);
            await bosTickets.isOnBoxOfficePage();
            await bosTickets.overrideTheOriginalPriceForTicketByIndex(1);
            await bosTickets.selectTicketByIndex(1, 1);
            let newPrice = await bosTickets.getOverridenPriceBiIndex(0);
            await bosTickets.clickNavButtonByIndexWhenTicketsSelected(2);
            await bosDetails.assertWhenPriceChangedTaxesAndFeesAreRecalculatedCorrectly(newPrice, uppedFee$, uppedFeePercent, addedFee, addedTax)
            await bosDetails.continueToPayment();
            await bosReview.makePaymentWithCard(base);
        });
    });