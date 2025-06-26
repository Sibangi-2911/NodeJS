const express = require("express");
const app = express();
const port = 3001;

//get route
app.get("/",(req,res)=>{
  console.log("Test");
  res.send("Hello World");
});

app.listen(port,()=>{
  console.log(`App listens at port no. ${port}`);
});