const pool = require("../config/db");

const getAllOrders = async () => {
  const result = await pool.query(`
    SELECT 
      o.id,
      o.user_id,
      u.name AS user_name,
      o.total,
      o.status,
      o.created_at,
      o.updated_at
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.id ASC
  `);

  return result.rows;
};

const getOrderById = async (id) => {
  const result = await pool.query(
    `
    SELECT 
      o.id,
      o.user_id,
      u.name AS user_name,
      o.total,
      o.status,
      o.created_at,
      o.updated_at
    FROM orders o
    JOIN users u ON o.user_id = u.id
    WHERE o.id = $1
    `,
    [id]
  );

  return result.rows[0];
};

const getOrderItems = async (orderId) => {
  const result = await pool.query(
    `
    SELECT 
      oi.id,
      oi.product_id,
      p.name AS product_name,
      oi.quantity,
      oi.unit_price,
      oi.subtotal
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = $1
    ORDER BY oi.id ASC
    `,
    [orderId]
  );

  return result.rows;
};

const createOrder = async ({ user_id, total, status }) => {
  const result = await pool.query(
    `
    INSERT INTO orders (user_id, total, status)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [user_id, total, status]
  );

  return result.rows[0];
};

const createOrderItem = async ({
  order_id,
  product_id,
  quantity,
  unit_price,
  subtotal,
}) => {
  const result = await pool.query(
    `
    INSERT INTO order_items
    (order_id, product_id, quantity, unit_price, subtotal)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [order_id, product_id, quantity, unit_price, subtotal]
  );

  return result.rows[0];
};

const updateOrderTotal = async (orderId, total) => {
  const result = await pool.query(
    `
    UPDATE orders
    SET total = $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
    `,
    [total, orderId]
  );

  return result.rows[0];
};

const getProductPrice = async (productId) => {
  const result = await pool.query(
    "SELECT price FROM products WHERE id = $1",
    [productId]
  );

  return result.rows[0];
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderItems,
  createOrder,
  createOrderItem,
  updateOrderTotal,
  getProductPrice,
};