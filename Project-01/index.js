//Restapi json project
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { error } = require("console");
const { type } = require("os");
const app = express();
const PORT = 8000;

//schema- Defining the structure
const userSchema = new mongoose.Schema({
  firstName: {
    type:String,
    required:true,
  },
  lastName: {
    type:String,
  },
  email: {
    type:String,
    required:true,
    unique:true,
  },
  jobTitle: {
    type:String,
  },
  gender: {
    type: String,
  },
  },
  { timestamps: true}
);
//connection
mongoose.connect("mongodb://127.0.0.1:27017/new-app-1")
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log("Mongo Error", err));
//schema model
const User = mongoose.model("user", userSchema);

//middleware plugin
app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
  fs.appendFile("log.txt",`\n ${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,(err,data)=>{
    console.log("Hello from middleware 1");
    req.myUserName = "SIBANGI";
    next(); //this calls the next middleware function or the next router
  });
})

app.use((req,res,next)=>{
  console.log("Hello from middleware2 ",req.myUserName);
  next();
})
//Rest api
app.get("/api/users",async(req,res)=>{
  const allDbUsers = await User.find({});
  console.log("I  am into get request method ",req.myUserName);
  res.setHeader("X-myName","Sibangi Boxipatro"); //always add X to custom headers
  console.log(req.headers);
  return res.json(allDbUsers);
});

app.get("/users",async(req,res)=>{
  const allDbUsers = await User.find({});
  /*html document
  <ul>
  <li>Name</li>
  </ul>
  */
const html = `
<ul>
${allDbUsers.map((user)=>`<li>${user.firstName}-${user.email}</li>`).join("")}
</ul>
`;
return res.send(html);
});

app.route("/api/users/:id").get(async(req,res)=>{
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).json({error: "No user found"});
  return res.json(user);
})

.patch(async(req,res)=>{
  //edit user with id
  await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
  return res.json({status: "Success"});
})

.delete(async(req,res)=>{
  await User.findByIdAndDelete(req.params.id);
  return res.json({status: "success"});
});

app.post("/api/users",async(req,res)=>{
  //TOOD: new user
  const body = req.body;
  if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
    return res.status(400).json({msg: "All fields are required"});
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email:body.email,
    gender:body.gender,
    jobTitle:body.job_title,
  });
  console.log("Result: ",result);
  return res.status(201).json({msg: "Success"});
});

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));