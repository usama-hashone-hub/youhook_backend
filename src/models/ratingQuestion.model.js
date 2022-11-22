const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const ratingQuestionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['communication', 'reliability', 'condition'],
      required: true,
    },
    for: {
      type: String,
      enum: ['provider', 'rental'],
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

ratingQuestionSchema.plugin(toJSON);
ratingQuestionSchema.plugin(paginate);

const RatingQuestion = mongoose.model('RatingQuestion', ratingQuestionSchema);

module.exports = RatingQuestion;
