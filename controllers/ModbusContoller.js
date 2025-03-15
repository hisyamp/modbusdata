const ModbusModel = require("../models/ModbusModel");

const ModbusController = {
  async create(req, res) {
    try {
      const { modbus_id, device_id, data_modbus } = req.body;

      // Debugging: Log received input
      console.log("Received Data:", { modbus_id, device_id, data_modbus });
      console.log(
        "Data Modbus Length:",
        data_modbus ? data_modbus.length : "undefined"
      );

      // Validate input
      if (
        !modbus_id ||
        !device_id ||
        !Array.isArray(data_modbus) ||
        data_modbus.length !== 50
      ) {
        console.error("Validation Failed: Invalid input");
        return res.status(400).json({ message: "Invalid input" });
      }

      // Insert into database
      const result = await ModbusModel.insertData(
        modbus_id,
        device_id,
        data_modbus
      );

      res.status(201).json({ message: "Data inserted", data: result.rows[0] });
    } catch (error) {
      console.error("❌ Error Occurred:", error);

      // More details about PostgreSQL errors
      if (error.code) {
        console.error("PostgreSQL Error Code:", error.code);
      }

      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
        details: error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const result = await ModbusModel.getAllData();
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
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
      res.status(500).json({ message: error });
    }
  },
};

module.exports = ModbusController;
