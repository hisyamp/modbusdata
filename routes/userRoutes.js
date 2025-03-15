const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.post("/users", UserController.createUser);

module.exports = router;
