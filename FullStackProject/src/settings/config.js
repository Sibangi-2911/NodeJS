const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const responseFormatter = require("../middleware/responseFormatter.js");
const { StatusCodes } = require("http-status-codes");
const taskRouter = require("../tasks/tasks.router.js");
const authRouter = require("../auth/auth.router.js");
const usersRouter = require("../users/users.router.js");
const expressWinstonLogger = require("../middleware/expressWinston.middleware.js");
const cors = require("cors");


function configureApp(app){
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
}

module.exports = configureApp;