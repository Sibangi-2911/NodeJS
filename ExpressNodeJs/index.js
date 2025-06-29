const http = require("http");
const express = require("express");

const app = express();

app.get("/",(req,res)=>{
  return res.send("Hello from Home Page")
});
app.get("/about",(req,res)=>{
  return res.send("Hello from about page"+"  Hey!!"+req.query.name+" you are "+req.query.age);
});

app.listen(8000,()=>console.log("Server Started..."));
