//make a server
const http = require("http");
const fs = require("fs");
const url = require("url");
//we need a handler to handle the requests
const myServer = http.createServer((req,res)=>{
  if(req.url=='/favicon.ico') return res.end();
  const log = `${Date.now()}: ${req.method} ${req.url} New Request received \n`;
  const myurl = url.parse(req.url,true);
  console.log(myurl);
  fs.appendFile("./log.txt",log,(err, data)=>{
      switch(myurl.pathname){
        case "/":
          if(req.method=="GET") res.end("Home Page");
          break;
        case "/about":
          const username = myurl.query.myname;
          res.end(` Hi!!! ${username}`);
          break;
        case "/contacts":
          res.end("010028564");
          break;
        case "/signup":
          if(req.method=="GET"){
            res.end("This is a signup form.");
          }
          else if (req.method=="POST"){
            //DB query
            res.end("Success");
          }
        default:
          res.end("404 Not found");
      }
  });
});
//we need to listen on any port
myServer.listen(8000, ()=>console.log("Server Started!"));

