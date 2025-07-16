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

/**
 * @swagger
 * 
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 * /tasks:
 *  post:
 *   summary: Create a new task
 *   tags: [Tasks]
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Task'
 *   responses:
 *    201:
 *     description: Task created successfully
 *     content:
 *      application/json:
 *       example:
 *        status: success
 *        statusCode: 201
 *        message: Created
 *        data:
 *         _id: 68674e34318cd4ce7036b659
 *         title: Create a new video
 *         description: A video about full stack web development
 *         status: todo
 *         priority: normal
 *         dueDate: 2025-01-01T12:00:00Z
 *    401:
 *     description: Not Authorized Error
 *     content:
 *      application/json:
 *       example:
 *        status: error
 *        statusCode: 401
 *        message: Unauthorized
 *        error:
 *         message: You are not authorised to perform this request
 *    403:
 *     description: Forbidden Error
 *     content:
 *      application/json:
 *       example:
 *        status: error
 *        statusCode: 403
 *        message: Forbidden
 *        error:
 *         message: Please login again!!! Invalid token
 */

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