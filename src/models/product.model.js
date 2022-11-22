const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
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
    condition: {
      type: Boolean,
      default: false,
      required: true,
    },
    ratesPerDay: {
      type: Number,
      required: true,
    },
    ratesPerWeek: {
      type: Number,
      required: true,
    },
    ratesPerMonth: {
      type: Number,
    },
    ratesPerYear: {
      type: Number,
    },
    hasDelivery: {
      type: Boolean,
      default: false,
      required: true,
    },
    deliveryKM: {
      type: Number,
    },
    isInsured: {
      type: Boolean,
      default: false,
      required: true,
    },
    requiredAssembly: {
      type: Boolean,
      default: false,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Categroy',
      required: [true, 'categories are required'],
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

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.index({ loc: '2dsphere' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
