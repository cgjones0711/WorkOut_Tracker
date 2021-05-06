const router = require("express").Router();
const Workout = require("../models/workout.js");


//excercise
router.get("/excercise", (req, res) => {
  res.sendFile(path.join(__dirname,"../public/excercise.html"))
});

// stats

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/stats.html"))
  });