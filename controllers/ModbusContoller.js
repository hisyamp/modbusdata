const ModbusModel = require("../models/ModbusModel");

const ModbusController = {
  async create(req, res) {
    try {
      const { modbus_id, data_modbus } = req.body;
      console.log({ modbus_id, data_modbus });
      console.log(data_modbus.length);
      if (
        !modbus_id ||
        !Array.isArray(data_modbus) ||
        data_modbus.length !== 50
      ) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const result = await ModbusModel.insertData(modbus_id, data_modbus);
      res.status(201).json({ message: "Data inserted", data: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async getAll(req, res) {
    try {
      const result = await ModbusModel.getAllData();
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await ModbusModel.getById(id);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = ModbusController;
