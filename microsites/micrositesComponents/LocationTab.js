    const BasePage = require('../../BasePage');
    const GOOGLE_MAP = { tagName: 'google-map' }
    const MAPS_BUTTON = { className: 'maps-btn' };
    const LOCATION = { className: 'location' };
    const LOCATION_HEADER = { className: 'location-header' };


    class LocationTab extends BasePage {
        constructor(driver) {
            super(driver);
        }
    }

    module.exports = LocationTab;