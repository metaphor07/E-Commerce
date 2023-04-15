const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);

    const newUser = new User(req.body);
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  (!req.body.email || !req.body.password) &&
    res.status(401).json("Fill all the fields");
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Invalid user credentials");
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !checkPassword && res.status(401).json("Invalid user credentials");

    // generate token using jwt
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "7d" }
    );

    const { password, ...info } = user._doc;
    res
      .cookie("access_token", accessToken)
      .status(200)
      .json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
