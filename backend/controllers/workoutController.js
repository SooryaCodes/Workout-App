const Workout = require("../models/workoutModel");
const { isValidObjectId } = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  try {
    const { _id: user_id } = req.user;
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get a single workout
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(404).json("No such workout");

    const workout = await Workout.findById(id);

    if (!workout) return res.status(404).json({ error: "No such workout" });

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const { _id: user_id } = req.user;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  try {
    const workout = await Workout.create({ user_id, title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "Please fill in all the fields ", emptyFields });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id))
      return res.status(404).json({ error: "No such workout" });

    const workout = await Workout.findOneAndDelete({ _id: id });
    console.log(workout);

    if (!workout) return res.status(404).json({ error: "No such workout" });

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id))
      return res.status(404).json({ error: "No such workout" });

    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!workout) return res.status(400).json({ error: "No such workout" });

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exporting controller functions
module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
