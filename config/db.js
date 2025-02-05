const mariadb = require("mariadb");
require("dotenv").config();

const pool = mariadb.createPool({
  host: process.env.MDB_HOST,
  user: process.env.MDB_USER,
  password: process.env.MDB_PASSWORD,
  database: process.env.MDB_DATABASE_NAME,
  connectionLimit: 5,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MariaDB!");
    connection.release();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

testConnection();

module.exports = pool;
