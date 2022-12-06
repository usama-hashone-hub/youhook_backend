const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { ratingQuestionService } = require('../../services');

const createRatingQuestion = catchAsync(async (req, res) => {
  const question = await ratingQuestionService.createRatingQuestion(req.body);
  res.status(httpStatus.CREATED).send(question);
});

const getRatingQuestions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await ratingQuestionService.queryRatingQuestions(filter, options);
  res.send(result);
});

const getRatingQuestion = catchAsync(async (req, res) => {
  const question = await ratingQuestionService.getRatingQuestionById(req.params.questionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RatingQuestion not found');
  }
  res.send(question);
});

const updateRatingQuestion = catchAsync(async (req, res) => {
  question = await ratingQuestionService.updateRatingQuestionById(req.params.questionId, req.body);
  res.send(question);
});

const deleteRatingQuestion = catchAsync(async (req, res) => {
  await ratingQuestionService.deleteRatingQuestionById(req.params.questionId);
  res.status(httpStatus.OK).send({
    status: 200,
  });
});

module.exports = { createRatingQuestion, getRatingQuestions, getRatingQuestion, updateRatingQuestion, deleteRatingQuestion };
