const db = require("../config/db");
const bcrypt = require("bcryptjs");

const initializeDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      `CREATE TABLE IF NOT EXISTS AdminLogin (
        primary_id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

const LoginModel = {
  getUserByEmail: (email, callback) => {
    db.query("SELECT * FROM AdminLogin WHERE email = ?", [email], callback);
  },

  insertDefaultAdmin: async () => {
    const email = "TarunMandal@bakhultech.com";
    const password = "Admin@1234";

    db.query(
      "SELECT * FROM AdminLogin WHERE email = ?",
      [email],
      async (err, result) => {
        if (result.length === 0) {
          const hashed = await bcrypt.hash(password, 10);
          db.query(
            "INSERT INTO AdminLogin (email, password, role) VALUES (?, ?, ?)",
            [email, hashed, "admin"]
          );
        }
      }
    );
  },
};

(async () => {
  await initializeDatabase();
  await LoginModel.insertDefaultAdmin();
})();

module.exports = LoginModel;
