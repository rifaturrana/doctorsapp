const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
dotenv.config();
const auth = require("./api/routes/auth");

app.use("/api/v1/auth", auth);

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
