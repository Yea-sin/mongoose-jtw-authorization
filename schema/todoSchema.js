const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: String,
  roll: Number,
});

module.exports = todoSchema;
