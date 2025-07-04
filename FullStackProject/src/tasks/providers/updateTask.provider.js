const Task = require("../task.schema.js");

async function updateTaskProvider(req,res){
  //fetch id
  const task = await Task.findById(req.body["_id"]);

  //update the task
  task.title= req.body.title;
  task.description=req.body.description;
  task.status=req.body.status;
  task.priority = req.body.priority;
  task.dueDate = req.body.dueDate;

  //save
  return await task.save();
}

module.exports = updateTaskProvider;