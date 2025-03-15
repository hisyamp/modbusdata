const cron = require("node-cron");
const { Op } = require("sequelize");
const Modbus = require("../models/ModbusModel");
const ModbusLog = require("../models/ModbusLogModel");
const ModbusLogFilter = require("../models/ModbuLogFilterModel");

const modbusLogger = cron.schedule("*/5 * * * *", async () => {
  console.log("Running Modbus Logger...");

  try {
    const filters = await ModbusLogFilter.findAll();
    if (filters.length === 0) {
      console.log("No log filters found.");
      return;
    }

    const filterConditions = filters.map((filter) => ({
      device_id: filter.device_id,
      modbus_register: filter.modbus_register,
    }));

    const logData = await Modbus.findAll({
      where: { [Op.or]: filterConditions },
    });

    const bulkLogs = logData.map((entry) => ({
      modbus_id: entry.modbus_id,
      device_id: entry.device_id,
      modbus_register: entry.modbus_register,
      data_modbus: entry.data_modbus,
    }));

    if (bulkLogs.length > 0) {
      await ModbusLog.bulkCreate(bulkLogs);
      console.log(`Logged ${bulkLogs.length} Modbus records.`);
    } else {
      console.log("No new logs to record.");
    }
  } catch (error) {
    console.error("Logging Error:", error);
  }
});

// ✅ Export the cron job directly
module.exports = modbusLogger;
