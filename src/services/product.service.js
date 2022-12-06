const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

const createProduct = async (body) => {
  return Product.create(body);
};

const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

const getProductById = async (id) => {
  return Product.findById(id);
};

const updateProductById = async (productId, updateBody) => {
  const Prod = await getProductById(productId);
  if (!Prod) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return Product.findByIdAndUpdate(productId, updateBody, { new: true });
};

const deleteProductById = async (productId) => {
  const Product = await getProductById(productId);
  if (!Product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await Product.remove();
  return Product;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
