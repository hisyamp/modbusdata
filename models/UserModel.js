const pool = require("../config/db");

class UserModel {
  static async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }

  static async getUserById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async createUser(name, email) {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    return result.rows[0];
  }
}

module.exports = UserModel;
