const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const db = require("./models");
const path = require("path")

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"))
})

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

app.get("/api/workouts", (req, res)=>{
  db.Workout.find({})
    .then(dbData => res.json(dbData))
})

app.get("/api/workouts/range", (req, res)=>{
  db.Workout.find({})
    .then(dbData => res.json(dbData))
})

app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then(newWorkout => res.json(newWorkout))
})

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate({_id: req.params.id}, {
    $push: {exercises: req.body}
  }).then(update => {
    res.send(update)
  })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  
