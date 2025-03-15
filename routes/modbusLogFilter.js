const express = require("express");
const router = express.Router();
const ModbusLogFilterController = require("../controllers/ModbusLogFileController");

router.get("/modbus-log-filters", ModbusLogFilterController.getAll);
router.post("/modbus-log-filters", ModbusLogFilterController.add);
router.delete("/modbus-log-filters/:id", ModbusLogFilterController.remove);

module.exports = router;
