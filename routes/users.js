const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user')


router.get('/', async(req, res) => {
  const user = await User.find()
  res.send(user)
})


router.post('/', async (req, res) => {
  // let user = await User.findOne({ name: req.body.name })
  let user = await User({
    username: req.body.username,
    password: req.body.password
  })
  
  const result = await user.save();
  res.send(result);
})

module.exports = router;