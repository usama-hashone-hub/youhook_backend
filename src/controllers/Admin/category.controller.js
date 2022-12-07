const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { categoryService } = require('../../services');
const { getPath } = require('../../utils/cloudinary');

const createCategory = catchAsync(async (req, res) => {
  if (req.files?.images) req.body.images = await getPath(req.files?.images);
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  let options = pick(req.query, ['sortBy', 'limit', 'page']);
  options['populate'] = [
    {
      path: 'parentCategory',
      model: 'Category',
    },
    {
      path: 'subCategories',
      model: 'Category',
    },
  ];
  const result = await categoryService.queryCategories(filter, options);
  res.send(result);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  console.log(req.files, req.body);
  if (req.files?.images) req.body.images = await getPath(req.files?.images);

  category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryById(req.params.categoryId);
  res.status(httpStatus.OK).send({
    status: 200,
  });
});

module.exports = { createCategory, getCategories, getCategory, updateCategory, deleteCategory };
