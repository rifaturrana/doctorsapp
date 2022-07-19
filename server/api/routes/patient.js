const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/Patient/ProfileController");
const AuthController = require("../middleware/Permission");
const AppointmentController = require("../controllers/Patient/AppointmentController");

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

router.get(
  "/appointment/request/:id/index",
  AuthController.isPatient,
  AppointmentController.GetAppointmentRequests
);
router.post(
  "/appointment/request",
  AuthController.isPatient,
  AppointmentController.SetAppointmentRequest
);

module.exports = router;
