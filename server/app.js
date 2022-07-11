const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(fileUpload());
app.use("/uploads/doctor/profiles", express.static("uploads/doctor/profiles/"));

dotenv.config();
const auth = require("./api/routes/auth");
const doctorRoute = require("./api/routes/doctor");
const patientRoute = require("./api/routes/patient");

app.use("/api/v1/auth", auth);
app.use("/doctor", doctorRoute);
app.use("/patient", patientRoute);

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("listening on port " + port);
});
