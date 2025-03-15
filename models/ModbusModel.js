const pool = require("../config/db");

class ModbusModel {
  static async insertData(modbus_id, device_id, data) {
    const MAX_FIELDS = 99; // Ensure we match the database schema
    const dataLength = data.length;
    console.log("MAX_FIELDS", MAX_FIELDS);
    console.log("dataLength", dataLength);
    if (dataLength > MAX_FIELDS) {
      throw new Error(`Data must not exceed ${MAX_FIELDS} values.`);
    }

    // Fill missing fields with NULL or 0
    const paddedData = [...data, ...Array(MAX_FIELDS - dataLength).fill(null)];

    // Generate field names and placeholders
    const fields = Array.from(
      { length: MAX_FIELDS },
      (_, i) => `field_${i + 1}`
    ).join(", ");
    const values = Array.from(
      { length: MAX_FIELDS },
      (_, i) => `$${i + 3}`
    ).join(", ");

    // Construct query
    const query = `
      INSERT INTO modbus_data (modbus_id, device_id, ${fields}) 
      VALUES ($1, $2, ${values})
      RETURNING *;
    `;

    return pool.query(query, [modbus_id, device_id, ...paddedData]);
  }

  static async getAllData() {
    return pool.query("SELECT * FROM modbus_data ORDER BY created_at DESC");
  }

  static async getById(id) {
    return pool.query("SELECT * FROM modbus_data WHERE id = $1", [id]);
  }
}

module.exports = ModbusModel;
