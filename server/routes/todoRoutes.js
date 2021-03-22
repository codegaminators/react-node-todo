const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// Create Todo
router.post("/", async (req, res) => {
  if (!req.body.item)
    return res.status(400).send("You are making an empty request");
  try {
    const todo = await Todo.create({
      item: req.body.item,
    });
    res.send(todo);
  } catch (error) {
    res.send(error);
  }
});

// Get all Todos

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.send(todos);
  } catch (error) {
    res.send(error);
  }
});

// Get all completed todos
router.get("/completed", async (req, res) => {
  try {
    const todos = await Todo.find({ completed: true });
    res.send(todos);
  } catch (error) {
    res.send(error);
  }
});
// Get single todo

router.get("/single/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // const todo = await Todo.findOne({_id:req.params.id})
    res.send(todo);
  } catch (error) {
    res.send(error);
  }
});
// Delete Todo
router.delete("/single/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    // const todo = await Todo.findOne({ _id: req.params.id })
    // if (!todo) {
    //     res.status(404).send("Todo not found")
    //     return
    // }
    // todo.remove()
    res.send(todo);
  } catch (error) {
    res.send(error);
  }
});
// Update Todo

router.put("/single", async (req, res) => {
  if (!req.body._id)
    return res.status(400).send("You are making an empty request");
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.body._id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(todo);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
