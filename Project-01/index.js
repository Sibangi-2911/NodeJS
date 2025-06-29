const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const { stringify } = require("querystring");
const { error } = require("console");
const app = express();
const PORT = 8000;

//middleware plugin
app.use(express.urlencoded({extended: false}));

app.get("/api/users",(req,res)=>{
  return res.json(users);
});

app.get("/users",(req,res)=>{
  /*html document
  <ul>
  <li>Name</li>
  </ul>
  */
const html = `
<ul>
${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
</ul>
`;
return res.send(html);
});

app.route("/api/users/:id").get((req,res)=>{
  const id = Number(req.params.id);
  const user = users.find((user)=>user.id==id);
  return res.json(user);
})

.patch((req,res)=>{
  //edit user with id
  const id = Number(req.params.id);
  const index = users.findIndex((user)=>user.id==id);

  if(index==-1){
    return res.status(404).json({error: "User not found"});
  }

  //update user info
  users[index]={...users[index],...req.body};
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err)=>{
    if(err){
      return res.status(500).json({error: "failed to update user"});
    }
    return res.json({status:"user updated successfully", user:users[index]});
    });
})

.delete((req,res)=>{
  //delete the user with id
  const id = Number(req.params.id);
  const index = users.findIndex((user)=>user.id==id);

  if(index==-1){
    return res.status(404).json({error:"user not found"});
  }

  //Remove user from list
  const deletedUser = users.splice(index,1)[0];

  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
    if(err){
      return res.status(500).json({error: "failed to delete user"});
    }
    return res.json({ status: "User deleted", deletedUser });
  });
});

app.post("/api/users",(req,res)=>{
  //TOOD: new user
  const body = req.body;
  users.push({...body, id: users.length+1});
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
  if (err) {
    return res.status(500).json({ error: "Failed to write data" });
  }
  return res.status(201).json({ status: "User added successfully",id: users.length});
});
  console.log("Body: ",body);
});

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));