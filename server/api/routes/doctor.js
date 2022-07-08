const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/Doctor/ProfileController");
const AuthController = require("../middleware/Permission");
router.get("/me", ProfileController.Me);

router.post(
  "/profile/:id/update",
  AuthController.isDoctor,
  ProfileController.UpdateProfile
);
module.exports = router;
