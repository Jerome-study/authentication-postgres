require("dotenv").config();

const { Pool } = require("pg");

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const pool = new Pool({
    connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
});

pool.connect((err) => {
    if (err) throw err;
    console.log("Database connected");
});

pool.query(`
  CREATE TABLE IF NOT EXISTS "user" (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) return console.error('Error creating the users table', err);
});

module.exports = pool