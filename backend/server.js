require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ReviewCardRoutes = require("./routes/ReviewCards.js");
const userRoutes = require("./routes/user.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use("", ReviewCardRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on Port: " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
