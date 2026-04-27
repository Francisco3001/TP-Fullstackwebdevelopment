const { Pool } = require("pg");
const CONFIG = require("./config");

const pool = new Pool({
  host: CONFIG.DB.HOST,
  user: CONFIG.DB.USER,
  password: CONFIG.DB.PASSWORD,
  database: CONFIG.DB.DATABASE,
  port: CONFIG.DB.PORT
});

module.exports = pool;