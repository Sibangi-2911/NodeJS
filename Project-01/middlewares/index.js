const fs = require("fs");
const { model } = require("mongoose");

function logReqRes(filename){
  return(req,res,next)=>{
    fs.appendFile(filename,`\n ${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,(err,data)=>{
        console.log("Hello from middleware 1");
        req.myUserName = "SIBANGI";
        next(); //this calls the next middleware function or the next router
      });
  }
}

module.exports = {logReqRes};