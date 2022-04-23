const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://todos:w3axhsp3rHBbqKLe@cluster0.quagy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("server connected");
  })
  .catch((err) => console.log(err));

app.use("/todo", todoHandler);
app.use("/user", userHandler);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(5000, () => {
  console.log("listening to the port 5000");
});
