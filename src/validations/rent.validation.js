const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRent = {
  body: Joi.object().keys({
    rentInBy: Joi.required().custom(objectId),
    rentOutBy: Joi.required().custom(objectId),
    product: Joi.required().custom(objectId),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    totalAmount: Joi.number().required(),
    tax: Joi.number().required(),
    deposit: Joi.number().required(),
    delivery: Joi.number().required(),
    delivery_method: Joi.string().required(),
  }),
};

const getRents = {
  query: Joi.object().keys({
    user: Joi.required().custom(objectId),
    product: Joi.required().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRent = {
  params: Joi.object().keys({
    rentId: Joi.string().custom(objectId),
  }),
};

const updateRent = {
  params: Joi.object().keys({
    rentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      rentInBy: Joi.custom(objectId),
      rentOutBy: Joi.custom(objectId),
      product: Joi.custom(objectId),
      startDate: Joi.date(),
      status: Joi.string(),
      endDate: Joi.date(),
    })
    .min(1),
};

const deleteRent = {
  params: Joi.object().keys({
    rentId: Joi.string().custom(objectId),
  }),
};

const getRentalDetails = {
  query: Joi.object().keys({
    product: Joi.required().custom(objectId),
  }),
};

const getRentalRates = {
  body: Joi.object().keys({
    product: Joi.required().custom(objectId),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    delivery_method: Joi.string().required(),
  }),
};

module.exports = {
  createRent,
  getRents,
  getRent,
  updateRent,
  deleteRent,
  getRentalRates,
  getRentalDetails,
};
