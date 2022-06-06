const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register user

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
  
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error)
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username});
    !user && res.status(400).json("Username incorrect...");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Password incorrect...");
    // console.log(user._doc);
    const {password, email, ...allowedCredentials } = user._doc;
    res.status(200).json(allowedCredentials);
  } catch (error) {
    res.status(500).json(error);
  }
})


module.exports = router;