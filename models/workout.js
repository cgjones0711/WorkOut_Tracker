const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

  exercises: 
  
  type: {
    type: String,
    trim: true,
    required: "Enter a type of workout"
  },
  name: {
    type: String,
    trim: true,
    required: "Enter a name for workout"
  },
  duration: {
    type: Number,
    required: "Enter an amount"
  },
  weight: {
    type: Number,
    required: "Enter an amount"
  },
  reps: {
    type: Number,
    required: "Enter an amount"
  },
  sets: {
    type: Number,
    required: "Enter an amount"
  },
  date: {
    type: Date,
    default: Date.now
  }
});


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
