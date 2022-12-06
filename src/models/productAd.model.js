const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const productAdSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'user are required'],
    },
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    description: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    loc: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);

productAdSchema.plugin(toJSON);
productAdSchema.plugin(paginate);

productAdSchema.index({ loc: '2dsphere' });

const ProductAd = mongoose.model('ProductAd', productAdSchema);

module.exports = ProductAd;
