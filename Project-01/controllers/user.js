const User = require("../models/user.js");

async function handleGetAllUsers(req,res) {
  const allDbUsers = await User.find({});
  console.log("I  am into get request method ",req.myUserName);
  res.setHeader("X-myName","Sibangi Boxipatro"); //always add X to custom headers
  console.log(req.headers);
  return res.json(allDbUsers);
}
async function handlegetUserById(req,res) {
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).json({error: "No user found"});
  return res.json(user);
}
async function handleupdateUserById(req,res) {
  //edit user with id
  await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
  return res.json({status: "Success"});
}
async function handledeleteUserById(req,res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({status: "success"});
}
async function handleCreateNewUser(req,res) {
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
  return res.status(201).json({msg: "Success", id:result._id});
}
module.exports={handleGetAllUsers,
                handlegetUserById,
                handleupdateUserById,
                handledeleteUserById,
                handleCreateNewUser
};
