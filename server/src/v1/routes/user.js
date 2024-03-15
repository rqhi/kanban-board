const router = require('express').Router()
const userController = require('../controllers/user');
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')

// Route zum Erstellen eines neuen Benutzers
router.post(
    '/', 
    userController.register
    );

// Route zum Abrufen aller Benutzer
router.get(
    '/', 
    tokenHandler.verifyToken,
    userController.getAll
    );

module.exports = router;
