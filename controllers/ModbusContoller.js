const Modbus = require("../models/ModbusModel");

const ModbusController = {
  // 🟢 Create new Modbus data in bulk
  async create(req, res) {
    try {
      const { modbus_id, device_id, data_modbus } = req.body;

      if (!modbus_id || !device_id || !Array.isArray(data_modbus)) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      // Step 1: Fetch existing records with the same modbus_id and device_id
      const existingRecords = await Modbus.findAll({
        where: { modbus_id, device_id },
        attributes: ["modbus_register"],
      });

      // Step 2: Get existing modbus_register values
      const existingRegisters = new Set(
        existingRecords.map((record) => record.modbus_register)
      );

      // Step 3: Filter data_modbus, only insert if register does not exist
      const newData = data_modbus
        .map((value, index) => ({
          modbus_id,
          device_id,
          modbus_register: index,
          data_modbus: value,
        }))
        .filter((record) => !existingRegisters.has(record.modbus_register));

      // Step 4: Perform bulk insert if new data exists
      if (newData.length > 0) {
        await Modbus.bulkCreate(newData);
      }

      res
        .status(201)
        .json({
          message: "Modbus data processed successfully",
          inserted: newData.length,
        });
    } catch (error) {
      console.error("Insert Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  // 🟢 Get all Modbus records
  async getAll(req, res) {
    try {
      const result = await Modbus.findAll(); // Sequelize findAll()
      res.json(result);
    } catch (error) {
      console.error("Fetch Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // 🟢 Get a single Modbus record by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await Modbus.findOne({ where: { modbus_id: id } }); // Sequelize findOne()

      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Fetch Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = ModbusController;
