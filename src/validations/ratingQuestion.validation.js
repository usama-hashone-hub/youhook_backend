const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRatingQuestion = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    type: Joi.string().required(),
    for: Joi.string().required(),
  }),
};

const getRatingQuestions = {
  query: Joi.object().keys({
    title: Joi.string(),
    price: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRatingQuestion = {
  params: Joi.object().keys({
    questionId: Joi.string().custom(objectId),
  }),
};

const updateRatingQuestion = {
  params: Joi.object().keys({
    questionId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    question: Joi.string(),
    type: Joi.string(),
    for: Joi.string(),
    isActive: Joi.boolean(),
  }),
};

const deleteRatingQuestion = {
  params: Joi.object().keys({
    questionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRatingQuestion,
  getRatingQuestions,
  getRatingQuestion,
  updateRatingQuestion,
  deleteRatingQuestion,
};
