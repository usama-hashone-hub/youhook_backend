const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const orderItemSchema = mongoose.Schema({
  campaign: {
    type: mongoose.Schema.ObjectId,
    ref: 'Campaign',
    required: [true, 'Campaign is required'],
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = mongoose.Schema(
  {
    orderNo: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    orderItems: [orderItemSchema],
    status: {
      type: String,
      enum: ['placed', 'canceled', 'delivered'],
      default: 'placed',
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
