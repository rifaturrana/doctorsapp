const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const auth = require("./api/routes/auth");

app.use("/api/v1/auth", auth);

mongoose.connect(
  "mongodb+srv://rana:rana%408010@cluster01.cbxzxj8.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

const port = 3000;

app.listen(port, () => {
  console.log("listening on port " + port);
});
