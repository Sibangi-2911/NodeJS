const express = require("express");
const authController = require("./auth.controller");
const authRouter = express.Router();


authRouter.post("/login",authController.handleLogin);

module.exports = authRouter;