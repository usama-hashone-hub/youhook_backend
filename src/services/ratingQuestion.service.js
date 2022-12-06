const httpStatus = require('http-status');
const { RatingQuestion } = require('../models');
const ApiError = require('../utils/ApiError');

const createRatingQuestion = async (body) => {
  return RatingQuestion.create(body);
};

const queryRatingQuestions = async (filter, options) => {
  const ratings = await RatingQuestion.paginate(filter, options);
  return ratings;
};

const getRatingQuestionById = async (id) => {
  return await RatingQuestion.findById(id);
};

const updateRatingQuestionById = async (ratingId, updateBody) => {
  const Prod = await getRatingQuestionById(ratingId);
  if (!Prod) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RatingQuestion not found');
  }
  return RatingQuestion.findByIdAndUpdate(ratingId, updateBody, { new: true });
};

const deleteRatingQuestionById = async (ratingId) => {
  const RatingQuestion = await getRatingQuestionById(ratingId);
  if (!RatingQuestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RatingQuestion not found');
  }
  await RatingQuestion.remove();
  return RatingQuestion;
};

module.exports = {
  createRatingQuestion,
  queryRatingQuestions,
  getRatingQuestionById,
  updateRatingQuestionById,
  deleteRatingQuestionById,
};
