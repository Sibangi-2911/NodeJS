const express = require("express");
const taskController = require("./tasks.controller");
const taskRouter = express.Router();

taskRouter.get("/tasks",taskController.handleGetTasks);

taskRouter.post("/tasks", taskController.handlePostTasks);

taskRouter.patch("/tasks", taskController.handlePatchTasks);

taskRouter.delete("/tasks", taskController.handleDeleteTasks);

module.exports = taskRouter;