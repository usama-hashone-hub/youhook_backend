module.exports.authController = require('./auth.controller');

// User Controllers
module.exports.homeController = require('./User/home.controller');
// module.exports.cartController = require('./User/cart.controller');
module.exports.orderController = require('./User/order.controller');

// Admin Controllers
module.exports.userController = require('./Admin/user.controller');
module.exports.dashboardController = require('./Admin/dashboard.controller');
module.exports.productController = require('./Admin/product.controller');
// module.exports.campaignController = require('./Admin/campaign.controller');
module.exports.paymentController = require('./Admin/payment.controller');
module.exports.feedbackController = require('./Admin/feedback.controller');
module.exports.categoryController = require('./Admin/category.controller');
