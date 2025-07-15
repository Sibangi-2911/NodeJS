const express = require("express");
const {body, validationResult} = require("express-validator");
const taskController = require("./tasks.controller");
const { StatusCodes } = require("http-status-codes");
const createTaskValidator = require("./validators/createTask.validator.js");
const getTasksValidator = require("./validators/getTasks.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validator.js");
const authenticateToken = require("../middleware/authenticateToken.middleware.js");

const taskRouter = express.Router();

taskRouter.get("/tasks",[getTasksValidator, authenticateToken], (req,res)=>{
  const result = validationResult(req);
  if(result.isEmpty()){
    return taskController.handleGetTasks(req,res);
  } else{
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

taskRouter.post("/tasks", [createTaskValidator,authenticateToken] ,(req,res)=>{ 
  const result = validationResult(req);
  if(result.isEmpty()){
    return taskController.handlePostTasks(req,res);
  } else{
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
}
);

taskRouter.patch("/tasks", [updateTaskValidator,authenticateToken], (req,res)=>{ 
  const result = validationResult(req);
  if(result.isEmpty()){
    return taskController.handlePatchTasks(req,res);
  } else{
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

taskRouter.delete("/tasks", [deleteTaskValidator,authenticateToken], (req,res)=>{
  const result = validationResult(req);
  if(result.isEmpty()){
    return taskController.handleDeleteTasks(req,res);
  } else{
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = taskRouter;