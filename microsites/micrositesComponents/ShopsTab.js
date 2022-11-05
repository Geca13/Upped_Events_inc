    const BasePage = require('../../BasePage');
    const SHOPS_CONTAINER = { className: 'shops-container' };
    const OVERVIEW_TAB = { xpath: "//*[text()='Overview']"};

    class ShopsTab extends BasePage{
        constructor(driver) {
            super(driver);

        }
    }

    module.exports = ShopsTab;