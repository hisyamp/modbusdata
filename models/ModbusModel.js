const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Modbus = sequelize.define(
  "Modbus",
  {
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "modbus",
    indexes: [{ unique: false, fields: ["modbus_id", "modbus_register"] }],
  }
);

module.exports = Modbus;
