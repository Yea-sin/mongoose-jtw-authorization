const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const env = require("dotenv");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../schema/userSchema");
const User = new mongoose.model("User", userSchema);

env.config();

router.post("/singup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "singup successful",
    });
  } catch (err) {
    res.status(500).json({
      message: "singup failed",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });

    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            email: req.body.email,
            userId: req.body._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          "access token": token,
          message: "login successful",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed",
      });
    }
  } catch (err) {
    res.status(401).json({
      error: "Authentication failed",
    });
  }
});

module.exports = router;
