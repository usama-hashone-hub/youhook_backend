const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');
const { paymentService } = require('.');
const { User, Campaign, Product, Order } = require('../models');

function getTotalAmount(arr) {
  return arr.reduce((curr, acc) => {
    acc += curr.price;
    return acc;
  }, 0);
}

const createOrder = async (user) => {
  let { cart } = user;
  let totalAmount = getTotalAmount(cart);
  let tax = (totalAmount * config.tax) / 100;
  let orderNo = `OD-${uuidv4().split('-')[0]}`;

  let payment = await paymentService.doPayment(totalAmount);

  let order = await Order.create({
    orderNo,
    user: user.id,
    orderItems: cart,
    totalAmount,
    tax,
  });

  cart.map(async (c) => {
    for (let index = 0; index < c.quantity; index++) {
      // awai.createCoupon({
      //   couponNo: `CP-${uuidv4().split('-')[0]}-${orderNo.split('-').reverse().join('-')}-${index}`,
      //   user: user.id,
      //   order: order.id,
      //   campaign: c.campaign,
      // });
    }
    let camp = await Campaign.findByIdAndUpdate(c.campaign, { $inc: { soldStock: c.quantity } }, { new: true });
    await Product.findByIdAndUpdate(camp.product, { $inc: { soldStock: c.quantity } });
  });

  await paymentService.createPayment(order, payment);
  // await cartService.emptyCart(user);
};

const queryOrders = async (filter, options) => {
  return await Order.paginate(filter, options);
};

const getOrderById = async (id) => {
  return await Order.findById(id).populate('Order');
};

module.exports = { createOrder, queryOrders, getOrderById };
