const express = require('express');
const router = express.Router();
const Group = require('../models/group');

// POST /groups/create
router.post('/create', async (req, res) => {
  try {
    const { name, userId } = req.body; // Assuming the creator is automatically a member
    const newGroup = new Group({ name, members: [userId] });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
