const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAd = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    postalCode: Joi.string().required(),
    rent: Joi.number().required(),
    loc: Joi.object().required(),
  }),
  files: Joi.object().keys({
    images: Joi.array().required(),
  }),
};

const getAds = {
  query: Joi.object().keys({
    title: Joi.string(),
    price: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAd = {
  params: Joi.object().keys({
    adId: Joi.string().custom(objectId),
  }),
};

const updateAd = {
  params: Joi.object().keys({
    adId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    postalCode: Joi.string(),
    rent: Joi.number(),
    loc: Joi.object(),
    user: Joi.custom(objectId),
  }),
  files: Joi.object().keys({
    images: Joi.array(),
  }),
};

const deleteAd = {
  params: Joi.object().keys({
    adId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAd,
  getAds,
  getAd,
  updateAd,
  deleteAd,
};
