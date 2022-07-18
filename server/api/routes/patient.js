const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/Patient/ProfileController");
const AuthController = require("../middleware/Permission");
router.get("/me", AuthController.isPatient, ProfileController.Me);
router.post(
  "/profile/:id/update/photo",
  AuthController.isPatient,
  ProfileController.updatePhoto
);
router.post(
  "/profile/:id/update/bio",
  AuthController.isPatient,
  ProfileController.updateBio
);

module.exports = router;
