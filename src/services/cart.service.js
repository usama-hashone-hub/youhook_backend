const httpStatus = require('http-status');
const { campaignService } = require('.');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');
const Order = require('../models/order.model');

const getCart = async (user) => {
  return User.findById(user.id);
};

const addToCart = async (user, cartItem) => {
  let { campaign, quantity } = cartItem;

  campaign = await campaignService.getCampaignById(campaign);

  if (campaign.status != 'publish') {
    throw new ApiError(`Cannot add item into cart. Campaign status:${campaign.status}`);
  }

  return User.findByIdAndUpdate(
    user.id,
    {
      $push: { cart: cartItem },
    },
    { new: true }
  );
};

const updateItemQuantity = async (user, cartItem) => {
  let { cartId, campaign, quantity } = cartItem;

  campaign = await campaignService.getCampaignById(campaign);

  let avaStock = campaign.maxStock - campaign.soldStock;

  if (quantity > avaStock) {
    throw new ApiError(`Item quantity cannot be greater than available stock:${avaStock}`);
  }

  return User.findOneAndUpdate(
    { _id: user.id, 'cart._id': cartId },
    {
      $set: { 'cart.$.quantity': quantity },
    },
    { new: true }
  );
};

const deleteFromCart = async (user, cartId) => {
  return User.findByIdAndUpdate(
    user.id,
    {
      $pull: { cart: { _id: cartId } },
    },
    { new: true }
  );
};

const emptyCart = async (user) => {
  return User.findByIdAndUpdate(
    user.id,
    {
      $set: { cart: [] },
    },
    { new: true }
  );
};

module.exports = { getCart, addToCart, deleteFromCart, emptyCart, updateItemQuantity };
