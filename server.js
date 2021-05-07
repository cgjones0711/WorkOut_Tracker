const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes")
const dotenv = require("dotenv")

const PORT = process.env.PORT || 3000;

const Workout = require("./models/workout.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workoutDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Workout.create({ name: "Running" })
//   .then(dbWorkout => {
//     console.log(dbWorkout);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

app.use(routes)
  
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  