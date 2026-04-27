const ordersModel = require("../models/ordersModel");
const cartModel = require("../models/cartModel");

const getOrders = async () => {
  return await ordersModel.getAllOrders();
};

const getOrderById = async (id) => {
  const userId = req.user.id;
  const order = await ordersModel.getOrderById(id);

  if (!order) return null;

  const items = await ordersModel.getOrderItems(id);

  return {
    ...order, 
    items //podemos agregar los items al objeto order para devolver toda la información en una sola consulta
  };
};

const createOrderFromCart = async (userId) => {
  if (!userId) {
    throw new Error("Id de usuario es requerido para crear una orden");
  }

  const cart = await cartModel.getCartByUserId(userId);

  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  const cartItems = await cartModel.getCartItemsByUserId(userId);

  if (!cartItems || cartItems.length === 0) {
    throw new Error("El carrito está vacío");
  }

  const order = await ordersModel.createOrder({
    user_id: userId,
    total: 0,
    status: "pending",
  });

  let total = 0;

  for (const item of cartItems) {
    const unit_price = Number(item.price);
    const quantity = Number(item.quantity);
    const subtotal = unit_price * quantity;

    total += subtotal;

    await ordersModel.createOrderItem({
      order_id: order.id,
      product_id: item.product_id,
      quantity,
      unit_price,
      subtotal,
    });
  }
  const updatedOrder = await ordersModel.updateOrderTotal(order.id, total);

  await cartModel.clearCartItems(cart.id);

  const orderItems = await ordersModel.getOrderItems(order.id);

  return {
    ...updatedOrder,
    items: orderItems,
  };
};

module.exports = {
  getOrders,
  getOrderById,
  createOrderFromCart
};