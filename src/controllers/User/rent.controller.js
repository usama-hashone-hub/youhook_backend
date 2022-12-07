const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { rentService, productService, paymentService } = require('../../services');
const { getPath } = require('../../utils/cloudinary');
const config = require('../../config/config');
const moment = require('moment');
const { Rent } = require('../../models');

var enumerateDaysBetweenDates = function (startDate, endDate) {
  var dates = [];

  var currDate = moment(startDate).subtract(1, 'days').startOf('day');
  var lastDate = moment(endDate).startOf('day');

  while (currDate.add(1, 'days').diff(lastDate) <= 0) {
    dates.push(currDate.clone().format('Y-M-D'));
  }

  return dates;
};

const getRentalDetails = catchAsync(async (req, res) => {
  const productRentalHistory = await Rent.find({ product: req.query.product });

  let notAvalibleDates = [];

  productRentalHistory.map((i) => {
    notAvalibleDates.push(...enumerateDaysBetweenDates(i.startDate, i.endDate));
  });

  res.send({ bookedDates: [...new Set(notAvalibleDates)] });
});

const getRentRates = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.body.product);

  const days = moment(req.body.endDate).diff(req.body.startDate, 'days');
  const weeks = moment(req.body.endDate).diff(req.body.startDate, 'weeks');

  //updated according to the client reqs
  let totalAmount = product.ratesPerDay * days;
  let tax = (config.tax / 100) * totalAmount;
  let deposit = (product.deposit / 100) * totalAmount;
  let delivery = 0;

  if (req.body.delivery_method == 'delivery') {
    delivery = (config.delivery / 100) * totalAmount;
  }

  totalAmount = totalAmount + tax + deposit + delivery;

  res.status(httpStatus.OK).send({ totalAmount, tax, deposit, delivery });
});

const createRent = catchAsync(async (req, res) => {
  let obj = req.body;

  const rent = await rentService.createRent(obj);

  obj = { ...obj, ...rent._doc };

  await paymentService.createPayment(obj);

  await productService.updateProductById(rent.product, { status: 'rentOut', lastRentOut: rent._id });

  res.status(httpStatus.CREATED).send(rent);
});

const getRents = catchAsync(async (req, res) => {
  let pickObj = pick(req.query, ['name', 'price']);

  if (req.user.role != 'admin') {
    pickObj = { ...pick, user: req.user._id };
  }

  const filter = pickObj;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await rentService.queryRents(filter, options);
  res.send(result);
});

const getRentInItems = catchAsync(async (req, res) => {
  const filter = { rentInBy: req.user._id };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await rentService.queryRents(filter, options);
  res.send(result);
});

const getRentOutItems = catchAsync(async (req, res) => {
  const filter = { rentOutBy: req.user._id };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await rentService.queryRents(filter, options);
  res.send(result);
});

const getRent = catchAsync(async (req, res) => {
  const product = await rentService.getRentById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rent not found');
  }
  res.send(product);
});

const updateRent = catchAsync(async (req, res) => {
  if (req?.body?.status == 'active') {
  }
  if (req?.body?.status == 'completed') {
    //deposite will be retured here
  }
  let rent = await rentService.updateRentById(req.params.rentId, req.body);

  res.send(rent);
});

const deleteRent = catchAsync(async (req, res) => {
  await rentService.deleteRentById(req.params.productId);
  res.status(httpStatus.OK).send({
    status: 200,
  });
});

module.exports = {
  createRent,
  getRents,
  getRent,
  updateRent,
  deleteRent,
  getRentInItems,
  getRentOutItems,
  getRentalDetails,
  getRentRates,
};
