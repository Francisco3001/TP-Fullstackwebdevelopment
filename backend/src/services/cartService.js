const cartModel = require("../models/cartModel");
const productService = require("./productsService");

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

const addCartItem = async ({
  userId,
  product_id,
  quantity,
}) => {
  let cart = await cartModel.getCartByUserId(
    userId
  );

  if (!cart) {
    cart = await cartModel.createCart(userId);
  }

  const product =
    await productService.getProductById(
      product_id
    );

  if (!product) {
    throw new Error(
      "Producto no encontrado"
    );
  }

  const existingItem =
    await cartModel.getCartItemByProduct(
      cart.id,
      product_id
    );

  const currentQuantity =
    existingItem?.quantity || 0;

  if (
    currentQuantity + quantity >
    product.stock
  ) {
    throw new Error(
      `Solo hay ${product.stock} unidades disponibles`
    );
  }

  if (existingItem) {
    return await cartModel.updateCartItemByUserId(
      existingItem.id,
      userId,
      currentQuantity + quantity
    );
  }

  return await cartModel.addCartItem({
    cart_id: cart.id,
    product_id,
    quantity,
    unit_price: product.price,
  });
};

const updateCartItem = async (
  userId,
  productId,
  quantity
) => {
  const cart =
    await cartModel.getCartByUserId(userId);

  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  const item =
    await cartModel.getCartItemByProduct(
      cart.id,
      productId
    );

  if (!item) {
    throw new Error(
      "Producto no encontrado en el carrito"
    );
  }

  const product =
    await productService.getProductById(
      productId
    );

  if (quantity > product.stock) {
    throw new Error(
      `Solo hay ${product.stock} unidades disponibles`
    );
  }

  return await cartModel.updateCartItemByUserId(
    item.id,
    userId,
    quantity
  );
};

const deleteCartItem = async (
  userId,
  productId
) => {
  return await cartModel.deleteCartItemByProductId(
    productId,
    userId
  );
};

module.exports = {
  getCartByUser,
  createCart,
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};