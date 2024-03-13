const router = require('express').Router()
const userController = require('../controllers/user');
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')

router.get(
    '/', 
    userController.getAll
    );

module.exports = router;
