const Joi = require('joi');
const { objectId } = require('./custom.validation');

const doRatings = {
  body: Joi.object().keys({
    question: Joi.string().custom(objectId).required(),
    user: Joi.string().custom(objectId).required(),
    rent: Joi.string().custom(objectId).required(),
    by: Joi.string().custom(objectId).required(),
    rating: Joi.number().integer().required(),
    isActive: Joi.boolean().required(),
  }),
};

module.exports = {
  doRatings,
};
