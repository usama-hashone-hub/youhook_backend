const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { userService, generalService, productService } = require('../../services');
const { User, Category } = require('../../models');
const { getPath } = require('../../utils/cloudinary');

const addFav = catchAsync(async (req, res) => {
  const fav = await generalService.addFav(req.user, req.query.productId);
  res.status(httpStatus.OK).send({ fav: fav.favProducts });
});

const delFav = catchAsync(async (req, res) => {
  const fav = await generalService.delFav(req.user, req.query.productId);
  res.status(httpStatus.OK).send({ fav: fav.favProducts });
});

const queryFavs = catchAsync(async (req, res) => {
  const filter = { _id: { $in: req.user.favProducts } };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const products = await productService.queryProducts(filter, options);
  res.send({ favProducts: products });
});

const report = catchAsync(async (req, res) => {
  const a = await generalService.createReport(req.body);
  //email will be send to user and admin
  res.send({ report: a });
});

const blockUser = catchAsync(async (req, res) => {
  const user = await generalService.blockUser(req.user, req.body.userId);
  res.status(httpStatus.OK).send({ status: true });
});

const unblockUser = catchAsync(async (req, res) => {
  const user = await generalService.unblockUser(req.user, req.body.userId);
  res.status(httpStatus.OK).send({ status: true });
});

const blockUsers = catchAsync(async (req, res) => {
  const users = await User.findById(req.user._id).populate('BlockedUsers', '_id username firstName lastName email');
  res.status(httpStatus.OK).send({ BlockedUsers: users?.BlockedUsers });
});

const postSearch = catchAsync(async (req, res) => {
  const filter = { title: { $regex: '.*' + req.query.text + '.*' } };
  let options = pick(req.query, ['sortBy', 'limit', 'page']);
  options['populate'] = [{ model: 'Category', path: 'categories', select: { _id: 1, name: 1 } }];
  const select = { _id: 1, title: 1, categories: 1, description: 1 };
  const products = await productService.queryProducts(filter, options, select);
  res.send(products);
});

const uploadImages = catchAsync(async (req, res) => {
  let images = [];
  if (req.files?.images) images = await getPath(req.files?.images);
  res.status(httpStatus.OK).send({ images });
});

module.exports = { queryFavs, delFav, addFav, report, blockUser, postSearch, unblockUser, blockUsers, uploadImages };
