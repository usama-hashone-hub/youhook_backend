const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCampaign = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object(),
    product: Joi.string().custom(objectId).required(),
    maxStock: Joi.number().required(),
  }),
};

const getCampaigns = {
  query: Joi.object().keys({
    title: Joi.string(),
    product: Joi.string().custom(objectId),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCampaign = {
  params: Joi.object().keys({
    campaignId: Joi.string().custom(objectId),
  }),
};

const updateCampaign = {
  params: Joi.object().keys({
    campaignId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      image: Joi.object(),
      maxStock: Joi.number(),
      status: Joi.string().valid('draft', 'finished', 'closed'),
    })
    .min(1),
};

const deleteCampaign = {
  params: Joi.object().keys({
    campaignId: Joi.string().custom(objectId),
  }),
};

const publishCampaign = {
  params: Joi.object().keys({
    campaignId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('publish').required(),
  }),
};

//campaign prize model validations

const addPrize = {
  query: Joi.object().keys({
    campaignId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object().optional(),
  }),
};

const updatePrize = {
  query: Joi.object().keys({
    campaignId: Joi.required().custom(objectId),
    prizeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      image: Joi.object(),
    })
    .min(1),
};

const deletePrize = {
  query: Joi.object().keys({
    campaignId: Joi.required().custom(objectId),
    prizeId: Joi.required().custom(objectId),
  }),
};

//campaign notes model validation

const addNote = {
  query: Joi.object().keys({
    campaignId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    key: Joi.string().required(),
    value: Joi.string().required(),
    type: Joi.string().valid('earlyBid', 'widthdrawDate', 'other').required(),
    icon: Joi.string(),
  }),
};

const updateNote = {
  query: Joi.object().keys({
    campaignId: Joi.required().custom(objectId),
    noteId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      key: Joi.string(),
      value: Joi.string(),
      type: Joi.string().valid('earlyBid', 'widthdrawDate', 'other'),
      icon: Joi.string(),
    })
    .min(1),
};

const deleteNote = {
  query: Joi.object().keys({
    campaignId: Joi.required().custom(objectId),
    noteId: Joi.required().custom(objectId),
  }),
};

//campaign winner model
const addWinner = {
  query: Joi.object().keys({
    campaignId: Joi.required().custom(objectId),
    prizeId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    user: Joi.required().custom(objectId),
    announced: Joi.date().required(),
  }),
};

const updateWinner = {
  query: Joi.object().keys({
    campaignId: Joi.required().custom(objectId),
    prizeId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    user: Joi.custom(objectId),
    announced: Joi.date(),
  }),
};

const deleteWinner = {
  query: Joi.object().keys({
    campaignId: Joi.required().custom(objectId),
    prizeId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
  publishCampaign,
  addPrize,
  updatePrize,
  deletePrize,
  addNote,
  updateNote,
  deleteNote,
  addWinner,
  updateWinner,
  deleteWinner,
};
