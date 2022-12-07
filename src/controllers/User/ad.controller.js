const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { productAdService } = require('../../services');
const { getPath } = require('../../utils/cloudinary');
const { ProductAd } = require('../../models');

const createAd = catchAsync(async (req, res) => {
  if (req.files?.images) req.body.images = await getPath(req.files?.images);
  const product = await productAdService.createproductAd(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const getAds = catchAsync(async (req, res) => {
  let pickObj = pick(req.query, ['name', 'price']);

  if (req.user.role != 'admin') {
    pickObj = { ...pick, user: req.user._id };
  }

  const filter = pickObj;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await productAdService.queryproductAds(filter, options);
  res.send(result);
});

const getAd = catchAsync(async (req, res) => {
  const product = await productAdService.getproductAdById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ad not found');
  }
  res.send(product);
});

const updateAd = catchAsync(async (req, res) => {
  let product = await productAdService.getproductAdById(req.params.adId);
  let images = product.images;

  if (req.body?.deleteImages) {
    images = images.filter((image) => !req.body.deleteImages.includes(image));
  }

  if (req.files?.images) {
    let i = await getPath(req.files?.images);
    i.map((image) => images.push(image));
  }

  req.body.images = images;
  product = await productAdService.updateproductAdById(req.params.adId, req.body);
  res.send(product);
});

const deleteAd = catchAsync(async (req, res) => {
  await productAdService.deleteproductAdById(req.params.adId);
  res.status(httpStatus.OK).send({
    status: 200,
  });
});

const nearMeAds = catchAsync(async (req, res) => {
  let { latlng, maxDistance } = req.query;
  let [lat, lng] = latlng.split(',');

  const ads = await ProductAd.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [lat * 1, lng * 1] },
        distanceField: 'distance',
        key: 'loc',
        query: { isActive: true },
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

  res.send({ ads });
});

module.exports = { createAd, getAds, getAd, updateAd, deleteAd, nearMeAds };
