const productsModel = require("../models/productsModel");

const getProducts = async (page, limit) => {
  return await productsModel.getAllProducts(page, limit);
};

const getProductById = async (id) => {
  return await productsModel.getProductById(id);
};

const createProduct = async (data) => {
  return await productsModel.createProduct(data);
};

const updateProduct = async (id, data) => {
  return await productsModel.updateProduct(id, data);
};

const deleteProduct = async (id) => {
  return await productsModel.deleteProduct(id);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};