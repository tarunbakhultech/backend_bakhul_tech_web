const db = require("../config/db");

const ContactModel = {
  initializeTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS contact_info (
        primary_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255),
        email VARCHAR(255),
        number VARCHAR(50),
        query TEXT,
        country VARCHAR(100),
        city VARCHAR(100),
        company VARCHAR(255),
        subject VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    db.query(sql, (err) => {
      if (err) console.error("Table creation error:", err);
    });
  },

  insertDefault: () => {
    // Optional: No default row needed for contact form submissions
  },
};

ContactModel.initializeTable();

module.exports = ContactModel;
