const express = require('express');
const router = express.Router();
const dal = require('../dal.js');
const User = require('../model/model');

// Post Method - Create user account
router.post('/account/create/:name/:email/:password', async (req, res) => {
  try {
    const user = await dal.create(req.params.name, req.params.email, req.params.password, User);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Method - All accounts
router.get('/account/all', async (req, res) => {
  try {
    const users = await dal.all(User);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Method - Login user
router.get('/account/login/:email/:password', async (req, res) => {
  try {
    const user = await dal.findOne(req.params.email, User);
    if (user && user.password === req.params.password) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user account balance
router.post('/account/update/:email/:amount', async (req, res) => {
  try {
    const { email, amount } = req.params;
    const updatedUser = await dal.update(email, amount, User);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
