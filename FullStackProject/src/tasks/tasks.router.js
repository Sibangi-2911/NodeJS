const express = require("express");
const {body, validationResult} = require("express-validator");
const taskController = require("./tasks.controller");
const { StatusCodes } = require("http-status-codes");
const createTaskValidator = require("./validators/createTask.validator.js");
const taskRouter = express.Router();

taskRouter.get("/tasks",taskController.handleGetTasks);

taskRouter.post("/tasks", createTaskValidator ,(req,res)=>{ 
  const result = validationResult(req);
  if(result.isEmpty()){
    return taskController.handlePostTasks(req,res);
  } else{
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
}
);

taskRouter.patch("/tasks", taskController.handlePatchTasks);

taskRouter.delete("/tasks", taskController.handleDeleteTasks);

module.exports = taskRouter;