const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const responseFormatter = require("./middleware/responseFormatter.js");
const { StatusCodes } = require("http-status-codes");
const taskRouter = require("./tasks/tasks.router.js");
const authRouter = require("./auth/auth.router.js");
const usersRouter = require("./users/users.router.js");
const mongoose = require("mongoose");
const expressWinstonLogger = require("./middleware/expressWinston.middleware.js");
const dotenv = require("dotenv");// This should be before using process.env
const cors = require("cors");
const configureApp = require("./settings/config.js");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFile = `.env.${process.env.NODE_ENV}`;

dotenv.config({path: envFile});

console.log(process.env.TEST_VARIABLE);

const app = express();
const port = parseInt(process.env.PORT);
console.log(process.env.NODE_ENV);

/*const middleware = function(req,res,next){
  req.info = {appname: "Tasks Manager", author: "Sibangi"};
  next();
};
app.use(middleware);*/
app.use(express.json()); // this middleware converts the incoming request body into json
configureApp(app);

//connection to mongodb
async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });

    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`App listens at port no. ${port}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}


bootstrap();
