require("dotenv").config();

const express = require("express");

const workoutRoutes = require("./routes/workouts");
const userRouter = require("./routes/user");

const mongoose = require("mongoose");

const cors = require("cors");
// express app

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to database and listening on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });
