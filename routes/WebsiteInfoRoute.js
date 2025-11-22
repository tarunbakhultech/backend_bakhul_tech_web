const express = require("express");
const router = express.Router();
const WebsiteInfo = require("../controllers/WebsiteInfoController");
const multer = require("multer");
const upload = multer();

router.post("/get_websinfo_data", WebsiteInfo.getWebsiteInfo);
router.post("/update_webinfo", upload.none(), WebsiteInfo.updateWebsiteInfo);

module.exports = router;
