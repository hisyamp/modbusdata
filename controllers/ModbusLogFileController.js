const ModbusLogFilter = require("../models/ModbuLogFilterModel");

const ModbusLogFilterController = {
  // 🟢 Get all filters
  async getAll(req, res) {
    try {
      const filters = await ModbusLogFilter.findAll();
      res.json(filters);
    } catch (error) {
      console.error("Fetch Filters Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // 🟢 Add new filter
  async add(req, res) {
    try {
      const { device_id, modbus_register } = req.body;
      if (!device_id || modbus_register === undefined) {
        return res.status(400).json({ message: "Invalid data" });
      }

      const newFilter = await ModbusLogFilter.create({
        device_id,
        modbus_register,
      });
      res.status(201).json(newFilter);
    } catch (error) {
      console.error("Add Filter Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // 🟢 Delete a filter
  async remove(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ModbusLogFilter.destroy({
        where: { filter_id: id },
      });

      if (deleted) {
        res.json({ message: "Filter deleted successfully" });
      } else {
        res.status(404).json({ message: "Filter not found" });
      }
    } catch (error) {
      console.error("Delete Filter Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = ModbusLogFilterController;
