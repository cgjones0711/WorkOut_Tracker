const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");


//excercise
router.get("/exercise", (req, res) => {
 
  res.sendFile(path.join(__dirname,"../public/exercise.html"))
});

// stats

router.get("/stats", (req, res) => {
  
    res.sendFile(path.join(__dirname,"../public/stats.html"))
  });

  module.exports = router