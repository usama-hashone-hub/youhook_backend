const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    rent: {
      type: mongoose.Schema.ObjectId,
      ref: 'Rent',
      required: [true, 'Rent is required'],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    delivery: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
