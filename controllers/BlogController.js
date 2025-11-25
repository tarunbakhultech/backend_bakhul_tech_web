// ================= BLOG CONTROLLER ===================

const db = require("../config/db");
const path = require("path");

// ================== GET BLOG(S) ==================
exports.getBlog = (req, res) => {
  const primary_id = req.body?.primary_id || null;

  // If blog ID → return single blog
  if (primary_id) {
    const sql = "SELECT * FROM blogs WHERE primary_id = ? LIMIT 1";

    db.query(sql, [primary_id], (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      if (result.length === 0) {
        return res.json({
          success: false,
          message: "Blog not found",
        });
      }

      return res.json({
        success: true,
        data: result[0],
      });
    });
  }

  // Get all blogs
  else {
    const sql = "SELECT * FROM blogs ORDER BY primary_id DESC";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      return res.json({
        success: true,
        data: result,
      });
    });
  }
};

// ================== SAVE BLOG (ADD/UPDATE) ==================
exports.saveBlog = (req, res) => {
  const { primary_id, title, subtitle, category, shortDesc, fullDesc } =
    req.body;

  // Image handling
  const coverImg = req.files?.coverImg ? req.files.coverImg[0].filename : null;
  const blogImg = req.files?.blogImg ? req.files.blogImg[0].filename : null;

  // 1️⃣ UPDATE BLOG
  if (primary_id) {
    // If images updated
    const updateSql = `
      UPDATE blogs SET
        title = ?, 
        subtitle = ?, 
        category = ?, 
        shortDesc = ?, 
        fullDesc = ?,
        coverImg = COALESCE(?, coverImg),
        blogImg = COALESCE(?, blogImg)
      WHERE primary_id = ?
    `;

    db.query(
      updateSql,
      [
        title,
        subtitle,
        category,
        shortDesc,
        fullDesc,
        coverImg,
        blogImg,
        primary_id,
      ],
      (err) => {
        if (err) {
          console.error("UPDATE BLOG ERROR:", err);
          return res.status(500).json({
            success: false,
            message: "Update Failed",
          });
        }

        return res.json({
          success: true,
          message: "Blog Updated Successfully",
        });
      }
    );
  }

  // 2️⃣ ADD NEW BLOG
  else {
    const insertSql = `
      INSERT INTO blogs 
      (title, subtitle, category, shortDesc, fullDesc, coverImg, blogImg)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [title, subtitle, category, shortDesc, fullDesc, coverImg, blogImg],
      (err) => {
        if (err) {
          console.error("INSERT BLOG ERROR:", err);
          return res.status(500).json({
            success: false,
            message: "Insert Failed",
          });
        }

        return res.json({
          success: true,
          message: "Blog Added Successfully",
        });
      }
    );
  }
};

// ================== DELETE BLOG ==================
exports.deleteBlog = (req, res) => {
  const { primary_id } = req.body;

  if (!primary_id) {
    return res.json({
      success: false,
      message: "ID Required",
    });
  }

  const sql = "DELETE FROM blogs WHERE primary_id = ?";

  db.query(sql, [primary_id], (err) => {
    if (err) {
      console.error("DELETE BLOG ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Delete Failed",
      });
    }

    return res.json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  });
};
