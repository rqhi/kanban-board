const router = require('express').Router({ mergeParams: true })
const { param, body } = require('express-validator')
const tokenHandler = require('../handlers/tokenHandler')
const validation = require('../handlers/validation')
const taskController = require('../controllers/task')
const Task = require('../models/task');
const { isTeamLeader, isProjektmanager } = require('../middleware/authMiddleware');

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  body('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid section id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.create
)

router.put(
  '/update-position',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePosition
)

router.delete(
  '/:taskId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid task id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.delete
)

router.put(
  '/:taskId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid task id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.update
)

router.patch('/assign/:taskId', isProjektmanager, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body; // Assuming the request body contains the ID of the user to assign the task to
    const task = await Task.findByIdAndUpdate(taskId, { assignedTo: userId }, { new: true });
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router