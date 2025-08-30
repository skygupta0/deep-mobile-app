const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",      // e.g. postgres
  host: "localhost",
  database: "deep-app",          // your db name
  password: "postgres",
  port: 5432,                    // default PostgreSQL port
});

module.exports = pool;
