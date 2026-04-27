const pool = require("../config/db");

const getAllProducts = async (page = 1, limit = 10) => {

  const offset = (page - 1) * limit;

  const productsResult = await pool.query(
    `
    SELECT 
      p.*,
      c.name AS category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    ORDER BY p.id ASC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  const countResult = await pool.query(
    `SELECT COUNT(*) FROM products`
  );

  const total = Number(countResult.rows[0].count);

  return {
    data: productsResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getProductById = async (id) => {
  const result = await pool.query(
    `
    SELECT 
      p.*,
      c.name AS category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = $1
    `,
    [id]
  );
  return result.rows[0];
};


const createProduct = async ({
  name,
  description,
  brand,
  price,
  stock,
  image_url,
  category_id
}) => {
  const result = await pool.query(
    `INSERT INTO products 
    (name, description, brand, price, stock, image_url, category_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [name, description, brand, price, stock, image_url, category_id]
  );

  return result.rows[0];
};

const updateProduct = async (
  id,
  { name, description, brand, price, stock, image_url, category_id, is_active }
) => {
  const result = await pool.query(
    `UPDATE products
     SET name = $1,
         description = $2,
         brand = $3,
         price = $4,
         stock = $5,
         image_url = $6,
         category_id = $7,
         is_active = $8,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $9
     RETURNING *`,
    [name, description, brand, price, stock, image_url, category_id, is_active, id]
  );

  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};