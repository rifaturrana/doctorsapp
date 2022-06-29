const Patient = require("../../../models/Patient");
const Doctor = require("../../../models/Doctor");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Register account

const Register = async (req, res, next) => {
  try {
    const { email, role, password } = req.body;
    // console.log(email);
    if (role == "doctor") {
      const check = await Doctor.findOne({ email: email }).exec();
      if (check) {
        return res.status(208).json({
          status: false,
          message: "This email is already registered",
        });
      }
      let hashPassword = await bcrypt.hash(password, 10);

      let newAccount = new Doctor({
        email: email,
        role: role,
        password: hashPassword,
      });

      const saveAccount = await newAccount.save();
      if (saveAccount) {
        return res.status(201).json({
          status: true,
          message: "Successfully account saved",
        });
      }
    }
    if (role == "patient") {
      const check = await Patient.findOne({ email: email }).exec();
      if (check) {
        return res.status(208).json({
          status: false,
          message: "This email is already registered",
        });
      }
      let hashPassword = await bcrypt.hash(password, 10);

      let newAccount = new Patient({
        email: email,
        role: role,
        password: hashPassword,
      });

      const saveAccount = await newAccount.save();
      if (saveAccount) {
        return res.status(201).json({
          status: true,
          message: "Successfully account saved",
        });
      }
    }
  } catch (error) {
    if (error) next(error);
  }
};
const Login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (role == "doctor") {
      let account = await Doctor.findOne({ email }).exec();
      if (account) {
        const result = await bcrypt.compare(password, account.password);
        if (result) {
          const token = await jwt.sign(
            { id: account._id, name: account.name, role: account.role },
            "SECRET",
            { expiresIn: "1d" }
          );
          if (token) {
            return res.status(200).json({
              status: true,
              token,
            });
          }
          return res.status(404).json({
            status: false,
            message: "Invalid e-mail or password",
          });
        }
      }
      return res.status(404).json({
        status: false,
        message: "Invalid e-mail or password",
      });
    }
    if (role == "patient") {
      let account = await Patient.findOne({ email }).exec();
      if (account) {
        const result = await bcrypt.compare(password, account.password);
        if (result) {
          const token = await jwt.sign(
            { id: account._id, name: account.name, role: account.role },
            "SECRET",
            { expiresIn: "1d" }
          );
          if (token) {
            return res.status(200).json({
              status: true,
              token,
            });
          }
          return res.status(404).json({
            status: false,
            message: "Invalid e-mail or password",
          });
        }
      }
      return res.status(404).json({
        status: false,
        message: "Invalid e-mail or password",
      });
    }
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = { Register, Login };
