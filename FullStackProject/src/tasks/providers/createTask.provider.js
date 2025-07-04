const Task = require("../task.schema.js");

async function createTaskProvider(req,res) {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority:req.body.priority,
    dueDate: req.body.dueDate,
  });
  return await task.save();
}

module.exports = createTaskProvider;