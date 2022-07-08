const jwt = require("jsonwebtoken");
const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");

const isDoctor = async (req, res, next) => {
  try {
    const token = await req.header.authorization;
    if (!token) return res.status(404).json({ message: "Token not found" });
    // decode token
    const splitToken = token.split(" ")[1];
    const decode = await jwt.verify(splitToken, "SECRET");

    // find doctor using token
    const doctor = await Doctor.findOne(
      { $and: [{ _id: decode.id }, { access_token: splitToken }] },
      { role: "doctor" }
    ).exec();
    if (!doctor) return res.status(401).json({ message: "Invalid token" });

    // check role
    if (doctor.role === "doctor") next();
    else
      return res
        .status(401)
        .json({ message: "You have no permissions to access" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(410).json({ message: "Token expired" });
    }
    return res.status(501).json({ message: "unauthorized request" });
  }
};

module.exports = { isDoctor };
