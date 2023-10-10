const express = require("express");

const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const jwtSecret=process.env.JWTSECRET
router.post(
  "/createUser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const salt= await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
router.post(
  "/loginUser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(422)
          .json({ errors: "Try logging with correct credentials" });
      }
      const pswCompare= await bcrypt.compare(req.body.password,userData.password)
      if (!pswCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      const data={
       user:{
        id:userData._id
       }
      };
      const authToken=jwt.sign(data,jwtSecret);
      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
