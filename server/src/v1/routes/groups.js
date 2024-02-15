const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const { isAdmin } = require('../middleware/authMiddleware');

router.post('/create', isAdmin, async (req, res) => {
  try {
    const newGroup = new Group(req.body); // Simplified; in practice, validate and sanitize input
    await newGroup.save();
    res.status(201).send(newGroup);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
