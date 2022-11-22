const httpStatus = require('http-status');
const { productService } = require('.');
const { Campaign } = require('../models');
const ApiError = require('../utils/ApiError');

const createCampaign = async (body) => {
  let camp = await Campaign.create(body);
  await productService.updateProductById(body.product, { $push: { campaigns: camp._id } });
  return camp;
};

const queryCampaigns = async (filter, options) => {
  const campaigns = await Campaign.paginate(filter, options);
  return campaigns;
};

const getCampaignById = async (id) => {
  return Campaign.findById(id).populate({
    path: 'product',
    model: 'Product',
    select: { soldStock: 0, totalStock: 0, campaigns: 0 },
  });
};

const updateCampaignById = async (campaignId, updateBody) => {
  const Campaign = await getCampaignById(campaignId);
  if (!Campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  Object.assign(Campaign, updateBody);
  await Campaign.save();
  return Campaign;
};

const deleteCampaignById = async (campaignId) => {
  const Camp = await getCampaignById(campaignId);
  if (!Camp) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  await productService.updateProductById(Camp.product._id, { $pull: { campaigns: Camp._id } });
  await Camp.remove();
  return Campaign;
};

const findPrize = async (campaignId, prizeId) => {
  let prize = await Campaign.findOne({ _id: campaignId, 'prizes._id': prizeId });
  if (!prize) {
    throw new ApiError(httpStatus.NOT_FOUND, 'prize not found');
  }
};

const addPrize = async (campaignId, body) => {
  return Campaign.findByIdAndUpdate(
    campaignId,
    {
      $push: { prizes: body },
    },
    { new: true }
  );
};

const updatePrize = async (campaignId, prizeId, updateBody) => {
  await findPrize(campaignId, prizeId);

  let updatedObj = {};

  Object.keys(updateBody).forEach((key, index) => {
    updatedObj['prizes.$.' + key] = Object.values(updateBody)[index];
  });

  return Campaign.findOneAndUpdate(
    { _id: campaignId, 'prizes._id': prizeId },
    {
      $set: updatedObj,
    },
    { new: true }
  );
};

const deletePrize = async (campaignId, prizeId) => {
  await findPrize(campaignId, prizeId);
  return Campaign.findOneAndUpdate(
    { _id: campaignId },
    {
      $pull: { prizes: { _id: prizeId } },
    },
    { new: true }
  );
};

const findNote = async (campaignId, noteId) => {
  let note = await Campaign.findOne({ _id: campaignId, 'notes._id': noteId });
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'note not found');
  }
};

const addNote = async (campaignId, body) => {
  return Campaign.findByIdAndUpdate(
    campaignId,
    {
      $push: { notes: body },
    },
    { new: true }
  );
};

const updateNote = async (campaignId, noteId, updateBody) => {
  await findNote(campaignId, noteId);

  let updatedObj = {};

  Object.keys(updateBody).forEach((key, index) => {
    updatedObj['notes.$.' + key] = Object.values(updateBody)[index];
  });

  return Campaign.findOneAndUpdate(
    { _id: campaignId, 'notes._id': noteId },
    {
      $set: updatedObj,
    },
    { new: true }
  );
};

const deleteNote = async (campaignId, noteId) => {
  await findNote(campaignId, noteId);
  return Campaign.findOneAndUpdate(
    { _id: campaignId },
    {
      $pull: { notes: { _id: noteId } },
    },
    { new: true }
  );
};

const addWinner = async (campaignId, prizeId, body) => {
  return Campaign.findOneAndUpdate(
    { _id: campaignId, 'prizes._id': prizeId },
    {
      $set: { 'prizes.$.winner': body },
    },
    { new: true }
  );
};

const updateWinner = async (campaignId, prizeId, updateBody) => {
  let updatedObj = {};

  Object.keys(updateBody).forEach((key, index) => {
    updatedObj['prizes.$.winner.' + key] = Object.values(updateBody)[index];
  });

  return Campaign.findOneAndUpdate(
    { _id: campaignId, 'prizes._id': prizeId },
    {
      $set: updatedObj,
    },
    { new: true }
  );
};

const deleteWinner = async (campaignId, prizeId) => {
  return Campaign.findOneAndUpdate(
    { _id: campaignId, 'prizes._id': prizeId },
    {
      $unset: { 'prizes.$.winner': 1 },
    },
    { new: true }
  );
};

module.exports = {
  createCampaign,
  queryCampaigns,
  getCampaignById,
  updateCampaignById,
  deleteCampaignById,
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
