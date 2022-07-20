const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  Logout,
} = require("../controllers/Auth/AuthController");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);

module.exports = router;
//localhost:3000/api/v1/auth/register
