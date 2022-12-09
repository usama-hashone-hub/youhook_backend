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

const blockUser = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

const addFav = {
  query: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};
const delFav = {
  query: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};

const postSearch = {
  query: Joi.object().keys({
    text: Joi.string().required(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const report = {
  body: Joi.object().keys({
    reportedTo: Joi.string().custom(objectId).required(),
    reportedBy: Joi.string().custom(objectId).required(),
    product: Joi.string().custom(objectId).required(),
    rent: Joi.string().custom(objectId).required(),
    description: Joi.string().required(),
    issues: Joi.array().required(),
  }),
};
module.exports = {
  getFeedback,
  getFeedbacks,
  addFav,
  delFav,
  report,
  postSearch,
  blockUser,
};
