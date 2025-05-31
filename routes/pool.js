const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "inventory",
  password: "Ojino@2606#&#",
  port: 5432
});

module.exports = pool;
