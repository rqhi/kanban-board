const router = require("express").Router();
const { param } = require("express-validator");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

// Route zum Erstellen eines neuen Benutzers
router.post("/", userController.register);

// Route zum Abrufen aller Benutzer
router.get("/", tokenHandler.verifyToken, userController.getAll);

// Route to get a single user
router.get(
  "/:userId",
  param("userId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  tokenHandler.verifyToken,
  userController.getUser
);

// Route to update a single user
router.put(
  "/:userId",
  param("userId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  tokenHandler.verifyToken,
  userController.updateUser
);

// Route to delete a single user
router.delete(
  "/:userId",
  param("userId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  tokenHandler.verifyToken,
  userController.deleteUser
);

module.exports = router;
