const Doctor = require("../../../models/Doctor");
const Council = require("../../../models/Council");
const jswt = require("jsonwebtoken");
const Upload = require("../../../services/FileUpload");
const Unlink = require("../../../services/FlieDelete");
const CheckId = require("../../middleware/CheckId");
const hostURL = require("../../utils/url");

//me

const Me = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jswt.verify(token, "SECRET");
    let account = await Doctor.findOne(
      {
        $and: [{ _id: decode.id }, { role: decode.role }],
      },
      { access_token: 0, password: 0 }
    )
      .populate("councilHour")
      .exec();

    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Invalid token",
      });
    }
    for (const property in account) {
      if (property === "image")
        account[property] =
          hostURL(req) + "uploads/doctor/profiles/" + account[property];
    }

    return res.status(200).json({
      status: true,
      doctor: account,
    });
  } catch (error) {
    if (error) next(error);
  }
};
