const cartModel = require("../models/cartModel");

const getCartByUser = async (userId) => {
  let cart = await cartModel.getCartByUserId(userId);

  if (!cart) {
    cart = await cartModel.createCart(userId);
  }

  const items = await cartModel.getCartItemsByUserId(userId);

  return {
    ...cart,
    items,
  };
};

const createCart = async (userId) => {
  return await cartModel.createCart(userId);
};

const getCartItems = async (userId) => {
  return await cartModel.getCartItemsByUserId(userId);
};

const addCartItem = async ({ userId, product_id, quantity }) => {
  let cart = await cartModel.getCartByUserId(userId);

  if (!cart) {
    cart = await cartModel.createCart(userId);
  }

  return await cartModel.addCartItem({
    cart_id: cart.id,
    product_id,
    
    quantity,
    unit_price: await cartModel.getProductPrice(product_id),
  });
};

const updateCartItem = async (itemId, userId, { quantity }) => {
  return await cartModel.updateCartItemByUserId(itemId, userId, quantity);
};

const deleteCartItem = async (itemId, userId) => {
  return await cartModel.deleteCartItemByUserId(itemId, userId);
};

module.exports = {
  getCartByUser,
  createCart,
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};