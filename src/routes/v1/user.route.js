const express = require('express');
const can = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/cart.validation');
const { homeController, cartController, orderController } = require('../../controllers');

const router = express.Router();

router.route('/').get(homeController.getData);

// router
//   .route('cart')
//   .get(can('manageCart'), cartController.getCart)
//   .post(can('manageCart'), validate(userValidation.addToCart), cartController.addToCart)
//   .patch(can('manageCart'), validate(userValidation.updateItemQuantity), cartController.updateItemQuantity)
//   .delete(can('manageCart'), validate(userValidation.deleteFromCart), cartController.deleteFromCart);

router.route('order').post(can('createOrder'), validate(userValidation.createOrder), orderController.createOrder);

module.exports = router;
