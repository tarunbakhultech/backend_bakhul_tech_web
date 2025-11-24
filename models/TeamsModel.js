const db = require("../config/db");

const TeamsModel = {
  initializeTable: () => {
    const sql = `
CREATE TABLE IF NOT EXISTS teams (
primary_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
position VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
phone VARCHAR(20) NOT NULL,
profile_img VARCHAR(255),
status TINYINT DEFAULT 1,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

    db.query(sql, (err) => {
      if (err) console.error("Teams table creation error:", err);
      else console.log("Teams table checked/created ✔");
    });
  },
};

TeamsModel.initializeTable();
module.exports = TeamsModel;
