const express = require('express');
const router = express.Router();
const { getContactData, saveContactData } = require("../controllers/contact");

router.get("/get_contact_data", getContactData);
router.post("/save_contact_data", saveContactData);

module.exports = router;
