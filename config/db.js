const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "1111",
//   port: 5432,
// });

const pool = new Pool({
  user: "postgres",
  host: "18.208.180.152",
  database: "postgres",
  password: "1111",
  port: 5432,
});

module.exports = pool;
