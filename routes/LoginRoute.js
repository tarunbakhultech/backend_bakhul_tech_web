const express = require("express");
const multer = require("multer");
const { LoginController } = require("../controllers/LoginController");

const router = express.Router();
const upload = multer(); // <- important

router.post("/login", upload.none(), LoginController);

module.exports = router;
