const express = require("express");
const { validationResult} = require("express-validator");
const usersController = require("./users.controller.js");
const { StatusCodes } = require("http-status-codes");
const createUserValidator = require("./validators/createuser.validator.js");
const usersRouter = express.Router();

usersRouter.post("/create", createUserValidator, (req,res)=>{
  const result = validationResult(req);
    if(result.isEmpty()){
      return usersController.handleCreateUser(req,res);
    } else{
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

module.exports = usersRouter;