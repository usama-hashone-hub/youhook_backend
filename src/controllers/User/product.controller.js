const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { productService } = require('../../services');
const { getPath } = require('../../utils/cloudinary');
const { Product } = require('../../models');

const createProduct = catchAsync(async (req, res) => {
  if (req.files?.images) req.body.images = await getPath(req.files?.images);
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  let pickObj = pick(req.query, ['name', 'price']);

  if (req.user.role != 'admin') {
    pickObj = { ...pick, user: req.user._id };
  }

  const filter = pickObj;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const getNearMeProducts = catchAsync(async (req, res) => {
  let { latlng, maxDistance } = req.query;
  let [lat, lng] = latlng.split(',');
  console.log({ lat, lng });

  const products = await Product.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [lat * 1, lng * 1] },
        distanceField: 'distance',
        key: 'loc',
        query: { status: 'live', isActive: true },
        maxDistance: maxDistance * 1,
        minDistance: 0,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
        pipeline: [{ $project: { ratings: 1 } }],
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
  ]);

  res.send({ products });
});

const updateProduct = catchAsync(async (req, res) => {
  let product = await productService.getProductById(req.params.productId);
  let images = product.images;

  if (req.body?.deleteImages) {
    images = images.filter((image) => !req.body.deleteImages.includes(image));
  }

  if (req.files?.images) {
    let i = await getPath(req.files?.images);
    i.map((image) => images.push(image));
  }

  req.body.images = images;
  product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.OK).send({
    status: 200,
  });
});

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getNearMeProducts };
