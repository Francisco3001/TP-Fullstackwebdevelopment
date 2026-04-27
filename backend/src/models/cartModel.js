const pool = require("../config/db");

const getCartByUserId = async (userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM carts
    WHERE user_id = $1
    ORDER BY id DESC
    LIMIT 1
    `,
    [userId]
  );

  return result.rows[0];
};

const createCart = async (userId) => {
  const result = await pool.query(
    `
    INSERT INTO carts (user_id)
    VALUES ($1)
    RETURNING *
    `,
    [userId]
  );

  return result.rows[0];
};


const addCartItem = async ({ cart_id, product_id, quantity, unit_price }) => {
  const result = await pool.query(
    `
    INSERT INTO cart_items (cart_id, product_id, quantity, unit_price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [cart_id, product_id, quantity, unit_price]
  );

  return result.rows[0];
};

const getCartItemsByUserId = async (userId) => {
  const result = await pool.query(
    `
    SELECT 
      ci.id,
      ci.cart_id,
      ci.product_id,
      p.name AS product_name,
      p.price,
      ci.quantity,
      p.price * ci.quantity AS subtotal
    FROM cart_items ci
    JOIN carts c ON ci.cart_id = c.id
    JOIN products p ON ci.product_id = p.id
    WHERE c.user_id = $1
    ORDER BY ci.id ASC
    `,
    [userId]
  );

  return result.rows;
};

const updateCartItemByUserId = async (itemId, userId, quantity) => {
  const result = await pool.query(
    `
    UPDATE cart_items ci
    SET quantity = $1
    FROM carts c
    WHERE ci.cart_id = c.id
      AND ci.id = $2
      AND c.user_id = $3
    RETURNING ci.*
    `,
    [quantity, itemId, userId]
  );

  return result.rows[0];
};

const deleteCartItemByUserId = async (itemId, userId) => {
  const result = await pool.query(
    `
    DELETE FROM cart_items ci
    USING carts c
    WHERE ci.cart_id = c.id
      AND ci.id = $1
      AND c.user_id = $2
    RETURNING ci.*
    `,
    [itemId, userId]
  );

  return result.rows[0];
};

const getProductPrice = async (productId) => {
  const result = await pool.query(
    `
    SELECT price
    FROM products
    WHERE id = $1
    `,
    [productId]
  );

  return result.rows[0] ? result.rows[0].price : null;
};

const clearCartItems = async (cartId) => {
  const result = await pool.query(
    `
    DELETE FROM cart_items
    WHERE cart_id = $1
    RETURNING *
    `,
    [cartId]
  );

  return result.rows;
};


module.exports = {
  getCartByUserId,
  createCart,
  getCartItemsByUserId,
  addCartItem,
  updateCartItemByUserId,
  deleteCartItemByUserId,
  getProductPrice,
  clearCartItems
};