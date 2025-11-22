const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.LoginController = (req, res) => {
  const email = req.body.admin_email;
  const password = req.body.admin_password;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      type: "VALIDATION_ERROR",
      message: "Email & Password are required",
    });
  }

  const query = "SELECT * FROM AdminLogin WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        type: "DB_ERROR",
        message: "Internal server error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        type: "EMAIL_NOT_FOUND",
        message: "Email not found",
      });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          type: "WRONG_PASSWORD",
          message: "Incorrect password",
        });
      }

      const token = jwt.sign(
        {
          userId: user.primary_id,
          email: user.email,
          role: user.role || "admin",
        },
        process.env.JWT_SECRET || "SECRET_KEY_123",
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        type: "LOGIN_SUCCESS",
        message: "Login Successful",
        token,
        userId: user.primary_id,
        role: user.role || "admin",
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        type: "LOGIN_FAIL",
        message: "Login failed",
      });
    }
  });
};
