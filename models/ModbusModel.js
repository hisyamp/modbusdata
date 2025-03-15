const pool = require("../config/db");

class ModbusModel {
  static async insertData(modbus_id, device_id, data) {
    const fields = data.map((_, i) => `field_${i + 1}`).join(", ");
    const values = data.map((_, i) => `$${i + 2}`).join(", ");
    const query = `INSERT INTO modbus_data (modbus_id, device_id, ${fields}) VALUES ($1, $2, ${values}) RETURNING *`;

    return pool.query(query, [modbus_id, device_id, ...data]);
  }

  static async getAllData() {
    return pool.query("SELECT * FROM modbus_data ORDER BY created_at DESC");
  }

  static async getById(id) {
    return pool.query("SELECT * FROM modbus_data WHERE id = $1", [id]);
  }
}

module.exports = ModbusModel;
