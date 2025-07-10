require("dotenv").config(); // This should be before using process.env
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
const cors = require("cors");


const app = express();
const port = 3001;

/*const middleware = function(req,res,next){
  req.info = {appname: "Tasks Manager", author: "Sibangi"};
  next();
};
app.use(middleware);*/
app.use(express.json()); // this middleware converts the incoming request body into json

//on;y to these origins the resources could be shared
const corsOptions = {
  origin: ["example.com","example2.com"],
};
app.use(cors()); //include all origins only during development otherwise specify clear origins from where the request can be sent

//flag a means append the next user activty
let accessLogStream = fs.createWriteStream(path.join(__dirname,"..","access.log"),{
  flag:'a',
});
app.use(morgan("combined", {stream: accessLogStream}));
app.use(responseFormatter);
app.use(expressWinstonLogger);

//attach the router here that is define the routes
app.use("/", taskRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

//if resource/request not found
app.use((req,res)=>{
  res.status(StatusCodes.NOT_FOUND).json(null);
})

//connection to mongodb
async function bootstrap() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || "fullstackTasks",
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
