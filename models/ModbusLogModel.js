const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ModbusLog = sequelize.define(
  "ModbusLog",
  {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    modbus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modbus_register: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_modbus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    logged_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "modbus_log",
  }
);

module.exports = ModbusLog;
