const categoriesModel = require("../models/categoriesModel");

const getCategories = async () => {
  return await categoriesModel.getAllCategories();
};

const getCategoryById = async (id) => {
  return await categoriesModel.getCategoryById(id);
};

const createCategory = async (data) => {
  return await categoriesModel.createCategory(data);
};

const updateCategory = async (id, data) => {
  return await categoriesModel.updateCategory(id, data);
};

const deleteCategory = async (id) => {
  return await categoriesModel.deleteCategory(id);
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};