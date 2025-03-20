require("dotenv").config();

const mysql = require('mysql2/promise');

// Access environment variables
const config = {
  db: {
    host: process.env.MYSQL_HOST,
    port: process.env.DB_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  },
};

const pool = mysql.createPool(config.db);

// Utility function to query the database
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

module.exports = {
  query,
};

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database!');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();

