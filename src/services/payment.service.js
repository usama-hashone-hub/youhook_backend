const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const Payment = require('../models/payment.model');

const doPayment = async (totalAmount) => {
  return {};
};
const createPayment = async (rent) => {
  return Payment.create({
    user: rent.rentInBy,
    rent: rent._id,
    totalAmount: rent.totalAmount * 1,
    tax: rent.tax * 1,
    deposit: rent.deposit * 1,
    delivery: rent.delivery * 1,
  });
};

const queryPayments = async (filter, options) => {
  return await Payment.paginate(filter, options);
};

const getPaymentById = async (id) => {
  return await Payment.findById(id).populate('rent');
};

module.exports = { doPayment, createPayment, queryPayments, getPaymentById };
