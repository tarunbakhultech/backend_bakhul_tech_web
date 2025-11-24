const db = require("../config/db");

// ------------------------------------------------------
// GET FAQ → Single + All
// ------------------------------------------------------
exports.getFAQ = (req, res) => {
  const primary_id = req.body?.primary_id || null; // Safe destructuring

  // 1️⃣ If primary_id exists → return only that FAQ
  if (primary_id) {
    const sql = "SELECT * FROM faq WHERE primary_id = ? LIMIT 1";

    db.query(sql, [primary_id], (err, result) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      if (result.length === 0) {
        return res.json({
          success: false,
          message: "FAQ not found",
        });
      }

      return res.json({
        success: true,
        data: result[0],
      });
    });
  }

  // 2️⃣ If NO primary_id → return full list
  else {
    const sql = "SELECT * FROM faq ORDER BY primary_id ASC";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      return res.json({
        success: true,
        data: result,
      });
    });
  }
};

// ------------------------------------------------------
// ADD / UPDATE FAQ
// ------------------------------------------------------
exports.saveFAQ = (req, res) => {
  const { primary_id, question, answer } = req.body;

  if (!question || !answer) {
    return res.json({
      success: false,
      message: "Question & Answer required",
    });
  }

  // 1️⃣ UPDATE existing FAQ
  if (primary_id) {
    const sql = `
      UPDATE faq 
      SET question = ?, answer = ?
      WHERE primary_id = ?
    `;

    db.query(sql, [question, answer, primary_id], (err) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      return res.json({
        success: true,
        message: "FAQ updated successfully",
      });
    });
  }

  // 2️⃣ ADD new FAQ
  else {
    const sql = `
      INSERT INTO faq (question, answer)
      VALUES (?, ?)
    `;

    db.query(sql, [question, answer], (err) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      return res.json({
        success: true,
        message: "FAQ added successfully",
      });
    });
  }
};

// ------------------------------------------------------
// DELETE FAQ
// ------------------------------------------------------
exports.deleteFAQ = (req, res) => {
  const primary_id = req.body?.primary_id || null;

  if (!primary_id) {
    return res.json({
      success: false,
      message: "FAQ ID required",
    });
  }

  const sql = `DELETE FROM faq WHERE primary_id = ?`;

  db.query(sql, [primary_id], (err) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    return res.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  });
};
