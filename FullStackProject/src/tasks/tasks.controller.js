const {StatusCodes, ReasonPhrases} = require("http-status-codes");

function handleGetTasks(req,res){
  let response = [
    {
      "title": "Title of the task1",
      "date": "2025-01-01T12:00:00Z",
      "description": "Task1 is to be done",
      "priority": "normal",
      "status": "todo"
    },
    {
      "title": "Title of the task2",
      "date": "2025-01-01T12:00:00Z",
      "description": "Task2 is to be done.",
      "priority": "normal",
      "status": "todo"
    },
  ];
  res.status(StatusCodes.OK).json(response);
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