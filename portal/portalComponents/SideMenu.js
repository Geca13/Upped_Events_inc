    const BasePage = require('../../BasePage');
    const EVENT_ORGANIZATION = { xpath: "//a[@href='/dashboard/account']" }
    const MODULES_LINK= { xpath: "//li[contains(@class , 'collapse-modules')]//a" }
    const CUSTOMERS_TAB = { xpath: "//*[text()='Customers']"}
    const STAKEHOLDERS_TAB = { xpath: "//*[text()='Stakeholders']"}
    const MENUS_TAB = { xpath: "//*[text()='Menus']"}
    const TICKETING_TAB = { xpath: "//*[text()='Ticketing']"}
    const TRANSACTION_CENTER_TAB = { xpath: "//*[text()='Transaction Center']"}
    const EVENT_FULL_NAME_TAB = { xpath: "//li[contains(@class , 'nav-subMenu-event-overflow')]//a"}
    const MAP_AND_AGENDA_TAB = { xpath: "//*[text()='Map and Agenda']"}
    const SHOP_MANAGEMENT_TAB = { xpath: "//*[text()='Shop Management']"}
    const PARTNER_MANAGEMENT_TAB = { xpath: "//*[text()='Partner Management']"}
    const STAFF_MANAGEMENT_TAB = { xpath: "//*[text()='Staff Management']"}
    const EVENT_MARKETING_TAB = { xpath: "//*[text()='Event Marketing']"}
    const CUSTOMER_ENGAGEMENTS_TAB = { xpath: "//*[text()='Customer Engagements']"}
    const RESOLUTION_CENTER_TAB = { xpath: "//*[text()='Resolution Center']"}
    const UPPED_SUPPORT_TAB = { xpath: "//*[text()='Upped Support']"}
    const PROMOTIONS_TAB = { xpath: "//*[text()='Promotions']"}
    const ACTIVE_SIDE_MENU_ITEM_MENU_ICON = { xpath: "(//a[@class='active']//following-sibling::span)[2]" }
    const SIDE_MENU_FIRST_DROPDOWN_OPTION = { xpath: "(//ul[contains(@class , 'show')]//li[contains(@class , 'dropdown-item')])[1]"}
    const SIDE_MENU_SECOND_DROPDOWN_OPTION = { xpath: "(//ul[contains(@class , 'show')]//li[contains(@class , 'dropdown-item')])[2]"}
    const SIDE_MENU_THIRD_DROPDOWN_OPTION = { xpath: "(//ul[contains(@class , 'show')]//li[contains(@class , 'dropdown-item')])[3]"}
    const SIDE_MENU_FOURTH_DROPDOWN_OPTION = { xpath: "(//ul[contains(@class , 'show')]//li[contains(@class , 'dropdown-item')])[4]"}

    class SideMenu extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async ticketingTabIsDisplayed(){
            await this.isDisplayed(TICKETING_TAB,5000);
            await this.timeout(500)
        }

        async clickEventOrganization(){
            await this.isDisplayed(EVENT_ORGANIZATION,5000);
            await this.click(EVENT_ORGANIZATION);
        }

        async clickModulesLink(){
            await this.isDisplayed(MODULES_LINK,5000);
            await this.click(MODULES_LINK);
        }

        async menusTabIsDisplayed(){
            await this.isDisplayed(MENUS_TAB,5000);
        }

        async clickMenusTab(){
            await this.menusTabIsDisplayed();
            await this.click(MENUS_TAB);
        }

        async clickCustomersTab(){
            await this.isDisplayed(CUSTOMERS_TAB,5000);
            await this.click(CUSTOMERS_TAB);
        }

        async clickStakeholdersTab(){
            await this.isDisplayed(STAKEHOLDERS_TAB,5000);
            await this.click(STAKEHOLDERS_TAB);
        }

        async clickEventFullNameTab(){
            await this.isDisplayed(EVENT_FULL_NAME_TAB,5000);
            await this.click(EVENT_FULL_NAME_TAB);
        }

        async clickMapAndAgendaTab(){
            await this.isDisplayed(MAP_AND_AGENDA_TAB,5000);
            await this.click(MAP_AND_AGENDA_TAB);
        }

        async clickTicketingTab(){
            await this.timeout(500)
            await this.ticketingTabIsDisplayed();
            await this.click(TICKETING_TAB);
        }

        async clickTransactionCenterTab(){
            await this.isDisplayed(TRANSACTION_CENTER_TAB,5000);
            await this.click(TRANSACTION_CENTER_TAB);
        }

        async clickShopManagementTab(){
            await this.isDisplayed(SHOP_MANAGEMENT_TAB,5000);
            await this.click(SHOP_MANAGEMENT_TAB);
        }
        async clickPartnerManagementTab(){
            await this.isDisplayed(PARTNER_MANAGEMENT_TAB,5000);
            await this.click(PARTNER_MANAGEMENT_TAB);
        }
        async clickStaffManagementTab(){
            await this.isDisplayed(STAFF_MANAGEMENT_TAB,5000);
            await this.click(STAFF_MANAGEMENT_TAB);
        }
        async clickEventMarketingTab(){
            await this.isDisplayed(EVENT_MARKETING_TAB,5000);
            await this.click(EVENT_MARKETING_TAB);
        }
        async clickCustomerEngagementTab(){
            await this.isDisplayed(CUSTOMER_ENGAGEMENTS_TAB,5000);
            await this.click(CUSTOMER_ENGAGEMENTS_TAB);
        }
        async clickResolutionCenterTab(){
            await this.isDisplayed(RESOLUTION_CENTER_TAB,5000);
            await this.click(RESOLUTION_CENTER_TAB);
        }
        async clickUppedSupportTab(){
            await this.isDisplayed(UPPED_SUPPORT_TAB,5000);
            await this.click(UPPED_SUPPORT_TAB);
        }
        async clickPromotionsTab(){
            await this.isDisplayed(PROMOTIONS_TAB,5000);
            await this.click(PROMOTIONS_TAB);
        }
        async clickTheSecondOptionFromActiveSideMenuDropdown(){
            await this.isDisplayed(ACTIVE_SIDE_MENU_ITEM_MENU_ICON, 5000);
            await this.click(ACTIVE_SIDE_MENU_ITEM_MENU_ICON);
            await this.isDisplayed(SIDE_MENU_SECOND_DROPDOWN_OPTION,5000);
            await this.click(SIDE_MENU_SECOND_DROPDOWN_OPTION);
        }
        


    }
    module.exports = SideMenu;
