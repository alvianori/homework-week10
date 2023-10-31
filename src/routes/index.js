const express = require("express");
const moviesRouter = require("./moviesRouter");
const usersRouter = require("./usersRouter");
const router = express.Router();

router.use("/Movies", moviesRouter);
router.use("/Users", usersRouter);

module.exports = router;
