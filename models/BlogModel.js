const db = require("../config/db");

const BlogModel = {
  initializeTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS blogs (
        primary_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        shortDesc TEXT NOT NULL,
        fullDesc LONGTEXT NOT NULL,
        coverImg VARCHAR(255),
        blogImg VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    db.query(sql, (err) => {
      if (err) console.error("Blog Table creation error:", err);
      else console.log("Blogs table ready ✔");
    });
  },
};

BlogModel.initializeTable();

module.exports = BlogModel;
