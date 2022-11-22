const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getFeedbacks = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    name: Joi.string(),
    email: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFeedback = {
  params: Joi.object().keys({
    feedbackId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  getFeedback,
  getFeedbacks,
};
