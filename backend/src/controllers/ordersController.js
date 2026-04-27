const ordersService = require("../services/ordersService");

const getOrders = async (req, res) => {
  try {
    const orders = await ordersService.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await ordersService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener orden", error: error.message });
  }
};

const createOrderFromCart = async (req, res) => {
  try {
    const order = await ordersService.createOrderFromCart(req.user.id);

    res.status(201).json({
      message: "Orden creada desde carrito exitosamente",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear orden desde carrito",
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrderFromCart,
};