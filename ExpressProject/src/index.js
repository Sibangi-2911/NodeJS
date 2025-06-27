const express = require("express");
const app = express();
const port = 3001;

//get route
app.get("/:category",(req,res)=>{
  console.log("Request URL: ", req.url);
  console.log("Request params: ",req.params);
  console.log("Request query: ",req.query);
  console.log("Request headers: ",req.headers);
  console.log("Request Method: ",req.method);
  res.send("Hello World");
});

app.post("/",(req,res)=>{
  console.log("Request Method: ",req.method);
  res.send("Hello World");
});

app.patch("/",(req,res)=>{
  console.log("Request Method: ",req.method);
  res.send("Hello World");
});

app.put("/",(req,res)=>{
  console.log("Request Method: ",req.method);
  res.send("Hello World");
});

app.delete("/",(req,res)=>{
  console.log("Request Method: ",req.method);
  res.send("Hello World");
});

app.listen(port,()=>{
  console.log(`App listens at port no. ${port}`);
});