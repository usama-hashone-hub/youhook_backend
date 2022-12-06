const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { userService, ratingService } = require('../../services');

const doRatings = catchAsync(async (req, res) => {
  const rating = await ratingService.createRating(req.body);
  res.status(httpStatus.CREATED).send(rating);
});

const getRatings = catchAsync(async (req, res) => {
  let pickObj = pick(req.query, ['by', 'user', 'rent', 'question', 'rating', 'isActive']);

  if (req.user.role != 'admin') {
    pickObj = { ...pick, user: req.user._id };
  }

  const filter = pickObj;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const ratings = await ratingService.queryRatings(filter, options);
  res.status(httpStatus.OK).send(ratings);
});

module.exports = { getRatings, doRatings };
