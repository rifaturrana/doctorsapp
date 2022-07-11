const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/Patient/ProfileController");
const AuthController = require("../middleware/Permission");
router.get("/me", AuthController.isPatient, ProfileController.Me);
module.exports = router;
