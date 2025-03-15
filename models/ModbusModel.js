const pool = require("../config/db");

class ModbusModel {
  static async insertData(modbus_id, device_id, data) {
    if (!Array.isArray(data) || data.length !== 50) {
      throw new Error("data must be an array of exactly 50 values.");
    }

    // Generate field names dynamically (field_1, field_2, ..., field_50)
    const fields = data.map((_, i) => `field_${i + 1}`).join(", ");

    // Generate placeholders dynamically ($1, $2, $3, ..., $52)
    const placeholders = data.map((_, i) => `$${i + 3}`).join(", ");

    // SQL Query
    const query = `
      INSERT INTO modbus_data (modbus_id, device_id, ${fields})
      VALUES ($1, $2, ${placeholders})
      RETURNING *;
    `;

    const values = [modbus_id, device_id, ...data];

    console.log("Executing Query:", query);
    console.log("Values:", values);

    return pool.query(query, values);
  }

  static async getAllData() {
    return pool.query("SELECT * FROM modbus_data ORDER BY created_at DESC");
  }

  static async getById(id) {
    return pool.query("SELECT * FROM modbus_data WHERE id = $1", [id]);
  }
}

module.exports = ModbusModel;
