//make a server
const http = require("http");
const fs = require("fs");
//we need a handler to handle the requests
const myServer = http.createServer((req,res)=>{
  const log = `${Date.now()}: ${req.url} New Request received \n`;
  fs.appendFile("./log.txt",log,(err, data)=>{
      switch(req.url){
        case "/":
          res.end("Home Page");
          break;
        case "/about":
          res.end("I am Sibangi");
          break;
        case "/contacts":
          res.end("010028564");
          break;
        default:
          res.end("404 Not found");
      }
  });
});
//we need to listen on any port
myServer.listen(8000, ()=>console.log("Server Started!"));

