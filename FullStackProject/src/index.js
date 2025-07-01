const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const taskRouter = require("./tasks/tasks.router.js");
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

//attach the router here that is define the routes
app.use("/", taskRouter);

app.listen(port,()=>{
  console.log(`App listens at port no. ${port}`);
});