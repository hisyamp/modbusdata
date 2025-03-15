const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "1111", {
  host: "18.208.180.152",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize; // Export Sequelize instance
