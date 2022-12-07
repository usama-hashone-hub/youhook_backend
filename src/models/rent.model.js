const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const rentSchema = mongoose.Schema(
  {
    rentInBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    rentOutBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required'],
    },

    // payment: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Payment',
    //   required: [true, 'Payment is required'],
    // },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed'],
      default: 'pending',
    },
    delivery_method: {
      type: String,
      enum: ['pickup', 'delivery'],
      default: 'pickup',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

rentSchema.plugin(toJSON);
rentSchema.plugin(paginate);

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;
