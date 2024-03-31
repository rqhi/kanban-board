var router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/boards', require('./board'))
router.use('/boards/:boardId/sections', require('./section'))
router.use('/boards/:boardId/tasks', require('./task'))
router.use('/users', require('./user'))
router.use('/tasks/:taskId/comments', require('./comments'))

module.exports = router;
