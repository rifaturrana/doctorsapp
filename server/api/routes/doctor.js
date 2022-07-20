const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/Doctor/ProfileController");
const AppointmentController = require("../controllers/Doctor/AppointmentController");

const AuthController = require("../middleware/Permission");
router.get("/me", ProfileController.Me);

router.post(
  "/profile/:id/update",
  AuthController.isDoctor,
  ProfileController.UpdateProfile
);

router.get(
  "/appointment/:id/requests",
  AuthController.isDoctor,
  AppointmentController.AppointmentRequests
);
router.get(
  "/appointment/:id/approved",
  AuthController.isDoctor,
  AppointmentController.ApprovedAppointments
);
router.put(
  "/appointment/approve",
  AuthController.isDoctor,
  AppointmentController.ApproveAppointment
);
module.exports = router;
