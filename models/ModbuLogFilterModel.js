const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ModbusLogFilter = sequelize.define(
  "ModbusLogFilter",
  {
    filter_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modbus_register: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "modbus_log_filters",
  }
);

module.exports = ModbusLogFilter;
