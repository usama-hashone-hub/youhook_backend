const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const ratingSchema = mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.ObjectId,
      ref: 'ratingQuestion',
      required: [true, 'question is required'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'user is required'],
    },
    rent: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'Rent is required'],
    },
    by: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'authId is required'],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ratingSchema.plugin(toJSON);
ratingSchema.plugin(paginate);

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
