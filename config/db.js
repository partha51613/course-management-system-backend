const mariadb = require("mariadb");
require("dotenv").config();


const pool = mariadb.createPool({
  host: process.env.MDB_HOST,
  user: process.env.MDB_USER,
  password: process.env.MDB_PASSWORD,
  database: process.env.MDB_DATABASE_NAME,
  connectionLimit: 5,
  supportBigNumbers: true,
  bigNumberStrings: true
});


pool.getConnection((err, connection) => {
  if (err) {
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection lost")
    }
    if (err.code == "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections")
    }
    if (err.code == "ECONNREFUSED") {
      console.log("Database connection refused")
    }
  }
  if (connection) {
    connection.release();

  }
  return;
})

module.exports = pool;

