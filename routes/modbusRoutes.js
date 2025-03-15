const express = require("express");
const ModbusController = require("../controllers/ModbusContoller");

const router = express.Router();

router.post("/modbus", ModbusController.create);
router.get("/modbus", ModbusController.getAll);
router.get("/modbus/:id", ModbusController.getById);

module.exports = router;
