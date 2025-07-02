const express = require("express");
const usersController = require("./users.controller.js");
const usersRouter = express.Router();

usersRouter.post("/create", usersController.handleCreateUser);

module.exports = usersRouter;