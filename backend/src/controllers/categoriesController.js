const categoriesService = require("../services/categoriesService");

const getCategories = async (req, res) => {
  try {
    const categories = await categoriesService.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar categorías", error: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await categoriesService.getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categoría", error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await categoriesService.createCategory(req.body);

    res.status(201).json({
      message: "Categoría creada exitosamente",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear categoría", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoriesService.updateCategory(req.params.id, req.body);

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json({
      message: "Categoría actualizada exitosamente",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar categoría", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoriesService.deleteCategory(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json({
      message: "Categoría eliminada exitosamente",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar categoría", error: error.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};