const express = require('express');
const can = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/cart.validation');
const {
  homeController,
  orderController,
  productController,
  adController,
  generalController,
  rentController,
  ratingController,
} = require('../../controllers');
const {
  productValidation,
  adValidation,
  generalValidation,
  rentValidation,
  ratingValidation,
} = require('../../validations');
const { uploadImage } = require('../../utils/cloudinary');

const router = express.Router();

router.route('/').get(homeController.getData);

router
  .route('/products')
  .get(can('manageProducts'), productController.getProducts)
  .post(can('manageProducts'), validate(productValidation.createProduct), productController.createProduct);

router
  .route('/product/:productId')
  .get(can('manageProducts'), productController.getProduct)
  .patch(can('manageProducts'), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(can('manageProducts'), validate(productValidation.deleteProduct), productController.deleteProduct);

router
  .route('/favs')
  .get(can('managefavs'), generalController.queryFavs)
  .post(can('managefavs'), validate(generalValidation.addFav), generalController.addFav);

router.route('/rent').post(can('getInRent'), validate(rentValidation.createRent), rentController.createRent);

router
  .route('/ads')
  .get(can('manageAds'), adController.getAds)
  .post(can('manageAds'), uploadImage, validate(adValidation.createAd), adController.createAd);

router
  .route('/ad/:adId')
  .get(can('manageAds'), adController.getAd)
  .patch(can('manageAds'), uploadImage, validate(adValidation.updateAd), adController.updateAd)
  .delete(can('manageAds'), validate(adValidation.deleteAd), adController.deleteAd);

router.route('/getRentInItems').get(can('getProducts'), rentController.getRentInItems);
router.route('/getRentOutItems').get(can('getProducts'), rentController.getRentOutItems);

router.route('/report').get(can('reportIssue'), validate(generalValidation.report), generalController.report);

router.route('/blockUser').get(can('blockUser'), validate(generalValidation.blockUser), generalController.blockUser);
router.route('/postSearch').get(can('search'), validate(generalValidation.postSearch), generalController.postSearch);

router
  .route('/ratings')
  .get(can('manageRatings'), ratingController.getRatings)
  .post(can('manageRatings'), validate(ratingValidation.doRatings), ratingController.doRatings);

router.route('order').post(can('createOrder'), validate(userValidation.createOrder), orderController.createOrder);

module.exports = router;
