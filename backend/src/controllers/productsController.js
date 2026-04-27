const productsService = require("../services/productsService");

const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;   
    const products = await productsService.getProducts(page, limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar productos", error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productsService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productsService.createProduct(req.body);

    res.status(201).json({
      message: "Producto creado exitosamente",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productsService.updateProduct(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado exitosamente",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productsService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto eliminado exitosamente",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};