const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schema/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);
const checkLogin = require("../middleware/checkLogin");

router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "there is an error",
      });
    } else {
      res.status(200).json({
        message: "all is well",
      });
    }
  });
});
router.get("/all", checkLogin, async (req, res) => {
  try {
    const data = await Todo.find({});
    res.status(200).json({
      result: data,
      message: "data successful",
    });
  } catch (err) {
    res.status(500).json({
      error: "there is an error",
    });
  }
});

module.exports = router;
