const express = require("express");
const app = express();
const port = 3001;

//get route
app.get("/users/:role",(req,res)=>{
  console.log("Request Parmeters: ",req.params);
  res.send("Hello World");
});


app.listen(port,()=>{
  console.log(`App listens at port no. ${port}`);
});