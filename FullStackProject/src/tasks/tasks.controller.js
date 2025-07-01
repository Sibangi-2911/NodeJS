function handleGetTasks(req,res){
  res.send("GET tasks controller");
}
function handlePostTasks(req,res){
  console.log("Request Body:", req.body);
  res.send("POST tasks controller");
}
function handlePatchTasks(req,res){
  res.send("PATCH tasks controller");
}
function handleDeleteTasks(req,res){
  res.send("DELETE tasks controller");
}

module.exports = {handleGetTasks, handlePostTasks, handlePatchTasks, handleDeleteTasks};