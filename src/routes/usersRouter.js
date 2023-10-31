const express = require("express");
const Users = require("../controller/usersController");
const router = express.Router();

router.get("/", Users.getAllUsers);
router.get("/:id", Users.getUserById);
router.post("/", Users.createUser);
router.patch("/:id", Users.updateUser);
router.delete("/:id", Users.deleteUser);

module.exports = router;
