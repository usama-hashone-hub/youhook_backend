const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { User } = require('../models');
const { userService } = require('.');
const Report = require('../models/report.model');

const addFav = async (user, product) => {
  let isFav = user.favProducts.includes(product);
  if (isFav) {
    return await userService.updateUserById(user._id, { $pull: { favProducts: product } });
  }
  return await userService.updateUserById(user._id, { $push: { favProducts: product } });
};

const delFav = async (user, product) => {
  return userService.updateUserById(user._id, { $pull: { favProducts: product } });
};

const queryFavs = async (user) => {
  return User.findById(user.id).populate('favProducts');
};

const createReport = async (report) => {
  return Report.create(report);
};

const blockUser = async (user, userId) => {
  return userService.updateUserById(user.id, { $addToSet: { BlockedUsers: userId } }, { new: true });
};

const unblockUser = async (user, userId) => {
  return userService.updateUserById(user.id, { $pull: { BlockedUsers: userId } }, { new: true });
};

module.exports = { addFav, delFav, queryFavs, createReport, blockUser, unblockUser };
