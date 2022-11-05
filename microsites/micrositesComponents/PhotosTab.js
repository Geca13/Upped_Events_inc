    const BasePage = require('../../BasePage');
    const assert = require("assert");
    const PICTURES_CONTAINER = { className: 'pictures-row' }
    const PHOTOS = { xpath: "//div[contains(@class, 'photoContainer')]//img[@class='photo']" }; //list
    const BACK_TO_GALLERY_BUTTON = { xpath: "//*[text()=' Back to Gallery ']"}
    const PHOTO_GALLERY = { tagName: 'app-event-gallery' }
    const NEXT_PHOTO_BUTTON = { className: 'fa-chevron-right' };
    const PREVIOUS_PHOTO_BUTTON = { className: 'fa-chevron-left' };
    const IMAGES_SLIDER = { className: 'images-sliding-container' };
    const MAIN_IMAGE = { className: 'main-img' };
    const FIRST_SLIDER_IMAGE = { xpath: "//div[@class='images-sliding-container']//img" }

    class PhotosTab extends BasePage {
        constructor(driver) {
            super(driver);
        }

        async photosTabIsSelected(){
            await this.isDisplayed(PHOTOS, 5000);
            await this.timeout(500);
        }
        async assertEventPhotosTabImageIsAMatch(src){
            await this.timeout(500);
            let photoSrc = await this.returnImgSrcAttribute(PHOTOS);
            assert.equal(photoSrc,src);
        }

        async assertGalleryImagesAreAMatch(src){
            await this.click(PHOTOS);
            await this.isDisplayed(BACK_TO_GALLERY_BUTTON,5000);
            await this.timeout(500);
            let gallerySrc = await this.returnImgSrcAttribute(MAIN_IMAGE);
            assert.equal(gallerySrc,src);
            let sliderSrc = await this.returnImgSrcAttribute(FIRST_SLIDER_IMAGE);
            assert.equal(sliderSrc,src);

        }



    }

    module.exports = PhotosTab;