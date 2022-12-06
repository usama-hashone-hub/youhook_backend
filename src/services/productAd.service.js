const httpStatus = require('http-status');
const { ProductAd } = require('../models');
const ApiError = require('../utils/ApiError');

const createproductAd = async (body) => {
  return ProductAd.create(body);
};

const queryproductAds = async (filter, options) => {
  const productAds = await ProductAd.paginate(filter, options);
  return productAds;
};

const getproductAdById = async (id) => {
  return ProductAd.findById(id);
};

const updateproductAdById = async (adId, updateBody) => {
  const Prod = await getproductAdById(adId);
  if (!Prod) {
    throw new ApiError(httpStatus.NOT_FOUND, 'productAd not found');
  }
  return ProductAd.findByIdAndUpdate(adId, updateBody, { new: true });
};

const deleteproductAdById = async (adId) => {
  const productAd = await getproductAdById(adId);
  if (!productAd) {
    throw new ApiError(httpStatus.NOT_FOUND, 'productAd not found');
  }
  await ProductAd.remove();
  return productAd;
};

module.exports = {
  createproductAd,
  queryproductAds,
  getproductAdById,
  updateproductAdById,
  deleteproductAdById,
};
