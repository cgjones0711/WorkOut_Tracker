const router = require("express").Router();
const Workout = require("../models/workout.js");


//excercise
router.get("/excercise", (req, res) => {
  Workout.find({})
  res.sendFile(path.join(__dirname,"../public/exercise.html"))
});

// stats

router.get("/stats", (req, res) => {
  Workout.find({})
    res.sendFile(path.join(__dirname,"../public/stats.html"))
  });