//Restapi json project
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { error } = require("console");
const { type } = require("os");
const {connectMongoDb} = require("./connection.js");
const userRouter = require("./routes/user.js");
const {logReqRes} = require("./middlewares/index.js");
const app = express();
const PORT = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/new-app-1");


//middleware plugin
app.use(express.urlencoded({extended: false}));

//middleware
app.use(logReqRes("log.txt"));

app.use((req,res,next)=>{
  console.log("Hello from middleware2 ",req.myUserName);
  next();
})

//Routes
app.use("/api/users", userRouter);

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));