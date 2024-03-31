const router = require('express').Router({ mergeParams: true })
const commentsController = require('../controllers/comments');
const tokenHandler = require('../handlers/tokenHandler')

// Route to create a new comment for a task
router.post(
    '/',
    tokenHandler.verifyToken,
    commentsController.create
);

// Route to delete a comment from a task
router.delete(
    '/:commentId', 
    tokenHandler.verifyToken,
    commentsController.delete
);

// Route to update a comment on a task
router.put(
    '/:commentId', 
    tokenHandler.verifyToken,
    commentsController.update
);

// Route to get all comments for a task
router.get(
    '/', 
    tokenHandler.verifyToken,
    commentsController.list
);

module.exports = router;