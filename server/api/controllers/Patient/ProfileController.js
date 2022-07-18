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
// Update Profile Photo
const updatePhoto = async (req, res, next) => {
  try {
    const { id } = req.params;
    await CheckId(id);

    // Find Profile
    const patient = await Patient.findById({ _id: id }).exec();
    if (!patient) {
      return res.status(404).json({
        status: false,
        message: "Patient not found",
      });
    }

    // Remove Old file
    if (patient.image) {
      await Unlink.fileDelete("./uploads/patient/profiles/", patient.image);
    }

    if (req.files) {
      filename = Upload.fileUpload(
        req.files.image,
        "./uploads/patient/profiles/"
      );

      const updateData = { image: filename };

      const updatePatient = await patient
        .updateOne({ $set: updateData }, { new: true })
        .exec();

      if (!updatePatient) {
        return res.status(501).json({
          message: "Update error",
        });
      }

      return res.status(201).json({
        status: true,
        message: "Successfully profile picture updated.",
      });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Update Bio
const updateBio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, height, weight, bloodPressure } = req.body;

    await CheckId(id);

    // Find Profile
    const patient = await Patient.findById({ _id: id }).exec();
    if (!patient) {
      return res.status(404).json({
        status: false,
        message: "Patient not found",
      });
    }

    const data = { name, age, height, weight, bloodPressure };

    const updatePatient = await patient
      .updateOne({ $set: data }, { new: true })
      .exec();

    if (!updatePatient) {
      return res.status(501).json({
        message: "Update error",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Successfully profile updated.",
    });
  } catch (error) {
    if (error) next(error);
  }
};
module.exports = {
  Me,
  updatePhoto,
  updateBio,
};
