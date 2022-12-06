const httpStatus = require('http-status');
const { Rent } = require('../models');
const ApiError = require('../utils/ApiError');

const createRent = async (body) => {
  return Rent.create(body);
};

const queryRents = async (filter, options) => {
  const rent = await Rent.paginate(filter, options);
  return rent;
};

const getRentById = async (id) => {
  return await Rent.findById(id);
};

const updateRentById = async (rentId, updateBody) => {
  const Prod = await getRentById(rentId);
  if (!Prod) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rent not found');
  }
  return Rent.findByIdAndUpdate(rentId, updateBody, { new: true });
};

const deleteRentById = async (rentId) => {
  const Rent = await getRentById(rentId);
  if (!Rent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rent not found');
  }
  await Rent.remove();
  return Rent;
};

module.exports = {
  createRent,
  queryRents,
  getRentById,
  updateRentById,
  deleteRentById,
};
