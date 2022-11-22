const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const Payment = require('../models/payment.model');

const doPayment = async (totalAmount) => {
  return {};
};
const createPayment = async (order, payment) => {
  return Payment.create({
    user: order.user,
    order: order._id,
    totalAmount: order.totalAmount,
  });
};

const queryPayments = async (filter, options) => {
  return await Payment.paginate(filter, options);
};

const getPaymentById = async (id) => {
  return await Payment.findById(id).populate('Order');
};

module.exports = { doPayment, createPayment, queryPayments, getPaymentById };
