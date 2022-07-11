const Patient = require("../../../models/Patient");
const jwt = require("jsonwebtoken");
const Upload = require("../.././services/FileUpload");
const Unlink = require("../.././services/FileDelete");
const CheckId = require("../../middleware/CheckId");
const hostURL = require("../../utils/url");

const Me = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.slice(7);
    console.log(token);
    const decode = jwt.verify(token, "SECRET");
    console.log(decode);

    let account = await Patient.findOne(
      {
        $and: [{ _id: decode.id }, { role: decode.role }],
      },
      { access_token: 0, password: 0 }
    ).exec();
    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Invalid token",
      });
    }
    for (const property in account) {
      if (property === "image")
        account[property] =
          hostURL(req) + "uploads/patient/profiles/" + account[property];
    }

    return res.status(200).json({
      status: true,
      patient: account,
    });
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = { Me };
