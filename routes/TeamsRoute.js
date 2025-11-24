const express = require("express");
const router = express.Router();
const TeamsController = require("../controllers/TeamsController");
const { upload } = TeamsController;
router.post("/get_teams", TeamsController.getTeam);

// Image + other fields
router.post(
  "/save_teams",
  upload.single("profile_img"),
  TeamsController.saveTeam
);

router.post("/delete_teams", upload.none(), TeamsController.deleteTeam);

module.exports = router;
