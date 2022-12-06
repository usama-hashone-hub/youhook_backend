const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
      trim: true,
    },
    firstName: {
      type: String,
      // required: true,
      trim: true,
    },
    lastName: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      // required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    details: {
      type: String,
    },
    verificationCode: {
      type: Number,
    },
    phone: {
      type: String,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    verificationSid: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetCode: String,
    passwordResetExpireAt: Date,
    favProducts: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Product',
      default: [],
    },

    orders: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
    },
    photo: {
      type: String,
    },
    socketId: {
      type: String,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    deviceTokens: {
      type: [String],
    },
    ratings: {
      type: Number,
      default: 0,
      // get: getRatings,
    },
    BlockedUsers: {
      type: [mongoose.Schema.ObjectId],
      ref: 'User',
      // get: getRatings,
    },
  },
  {
    timestamps: true,
    // toObject: { getters: true, setters: true },
    // toJSON: { getters: true, setters: true },
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

// Mongoose passes the raw value in MongoDB `email` to the getter
// async function getRatings() {
//   return 3;
// }
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
