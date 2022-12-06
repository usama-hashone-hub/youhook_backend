const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRent = {
  body: Joi.object().keys({
    rentInBy: Joi.required().custom(objectId),
    rentOutBy: Joi.required().custom(objectId),
    product: Joi.required().custom(objectId),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
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
      rentOutBy: Joi.required().custom(objectId),
      product: Joi.custom(objectId),
      startDate: Joi.date(),
      endDate: Joi.date(),
    })
    .min(1),
};

const deleteRent = {
  params: Joi.object().keys({
    rentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRent,
  getRents,
  getRent,
  updateRent,
  deleteRent,
};
