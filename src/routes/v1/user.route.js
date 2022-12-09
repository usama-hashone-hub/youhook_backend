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
  categoryController,
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
router.route('/categories').get(categoryController.getCategories);
router.route('/nearMeProducts').get(validate(productValidation.getNearMeProducts), productController.getNearMeProducts);
router.route('/nearMeAds').get(validate(productValidation.getNearMeProducts), adController.nearMeAds);

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
router.route('/rent/:rentId').patch(can('updateRentStatus'), validate(rentValidation.updateRent), rentController.updateRent);
router
  .route('/rentDetail')
  .get(can('getRentalDetails'), validate(rentValidation.getRentalDetails), rentController.getRentalDetails);
router.route('/rentRates').get(can('getRentalRates'), validate(rentValidation.getRentalRates), rentController.getRentRates);

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

router.route('/report').post(can('reportIssue'), validate(generalValidation.report), generalController.report);

router.route('/blockUser').post(can('blockUser'), validate(generalValidation.blockUser), generalController.blockUser);
router.route('/unblockUser').post(can('unblockUser'), validate(generalValidation.blockUser), generalController.unblockUser);
router.route('/blockUsers').get(can('getblockUsers'), generalController.blockUsers);

router.route('/postSearch').get(can('searchPost'), validate(generalValidation.postSearch), generalController.postSearch);

router
  .route('/ratings')
  .get(can('manageRatings'), ratingController.getRatings)
  .post(can('manageRatings'), validate(ratingValidation.doRatings), ratingController.doRatings);

router.route('/upload').post(uploadImage, generalController.uploadImages);

module.exports = router;
