const Comment = require('../models/comment');

exports.create = async (req, res) => {
  console.log("Creating a new comment with data:", req.body);
  console.log("Param: ", req.params);
  console.log("req:", req.user.id)
  try {
    const comment = await Comment.create({
      text: req.body.text,
      taskId: req.params.taskId,
      userId: req.user.id, // assuming the user is attached to the request
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.commentId });
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId },
      req.body,
      { new: true }
    );
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.list = async (req, res) => {
  try {
    const comments = await Comment.find({ taskId: req.params.taskId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};