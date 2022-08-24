const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.use(fileUpload());
app.use("/uploads/doctor/profiles", express.static("uploads/doctor/profiles/"));
app.use(
  "/uploads/patient/profiles",
  express.static("uploads/patient/profiles/")
);

dotenv.config();
const auth = require("./api/routes/auth");
const doctorRoute = require("./api/routes/doctor");
const patientRoute = require("./api/routes/patient");
const clientRoute = require("./api/routes/client");
const adminRoute = require("./api/routes/admin");

app.use("/api/v1/auth", auth);
app.use("/doctor", doctorRoute);
app.use("/patient", patientRoute);
app.use("/client", clientRoute);
app.use("/admin", adminRoute);

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
// ----------deployment--------

// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }

// ---------deployment----------
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("listening on port " + port);
});
