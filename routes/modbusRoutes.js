const express = require("express");
const router = express.Router();
const ModbusController = require("../controllers/ModbusContoller");

router.post("/modbus", ModbusController.create);
router.get("/modbus", ModbusController.getAll);
router.get("/modbus/:id", ModbusController.getById);

module.exports = router;
