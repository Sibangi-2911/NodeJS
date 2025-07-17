const express = require("express");
const { validationResult} = require("express-validator");
const usersController = require("./users.controller.js");
const { StatusCodes } = require("http-status-codes");
const createUserValidator = require("./validators/createuser.validator.js");
const usersRouter = express.Router();

/**
 * @swagger
 * 
 * /users/create:
 *  post:
 *   summary: Create a new user
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    201:
 *     description: User created successfully
 *     content:
 *      application/json:
 *       example:
 *        status: success
 *        statusCode: 201
 *        message: Created
 *        data:
 *         _id: 68674e34318cd4ce7036b659
 *         firstName: John
 *         lastName: Doe
 *         email: john@doe.com
 */

usersRouter.post("/create", createUserValidator, (req,res)=>{
  const result = validationResult(req);
    if(result.isEmpty()){
      return usersController.handleCreateUser(req,res);
    } else{
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

module.exports = usersRouter;