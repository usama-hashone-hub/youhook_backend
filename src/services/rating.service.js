const httpStatus = require('http-status');
const { Rating } = require('../models');
const ApiError = require('../utils/ApiError');

const createRating = async (body) => {
  return Rating.create(body);
};

const queryRatings = async (filter, options) => {
  const ratings = await Rating.paginate(filter, options);
  return ratings;
};

const getRatingById = async (id) => {
  return await Rating.findById(id);
};

const updateRatingById = async (ratingId, updateBody) => {
  const Prod = await getRatingById(ratingId);
  if (!Prod) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rating not found');
  }
  return Rating.findByIdAndUpdate(ratingId, updateBody, { new: true });
};

const deleteRatingById = async (ratingId) => {
  const Rating = await getRatingById(ratingId);
  if (!Rating) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rating not found');
  }
  await Rating.remove();
  return Rating;
};

module.exports = {
  createRating,
  queryRatings,
  getRatingById,
  updateRatingById,
  deleteRatingById,
};
