const cartService = require("../services/cartService");

const getCartByUser = async (req, res) => {
  try {
    const cart = await cartService.getCartByUser(req.user.id);

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener carrito", error: error.message });
  }
};

const createCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await cartService.createCart(userId);

    res.status(201).json({
      message: "Carrito creado exitosamente",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear carrito", error: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const items = await cartService.getCartItems(req.user.id);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener elementos del carrito", error: error.message });
  }
};


const addCartItem = async (req, res) => {
  try {
    const item = await cartService.addCartItem({
      userId: req.user.id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    });

    res.status(201).json({
      message: "Item agregado al carrito exitosamente",
      item,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar item al carrito", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const item = await cartService.updateCartItem(req.params.id, req.user.id, req.body);

    if (!item) {
      return res.status(404).json({ message: "Item del carrito no encontrado" });
    }

    res.json({
      message: "Item del carrito actualizado exitosamente",
      item,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar item del carrito", error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const item = await cartService.deleteCartItem(req.params.id, req.user.id);

    if (!item) {
      return res.status(404).json({ message: "Item del carrito no encontrado" });
    }

    res.json({
      message: "Item del carrito eliminado exitosamente",
      item,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar item del carrito", error: error.message });
  }
};

module.exports = {
  getCartByUser,
  createCart,
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};