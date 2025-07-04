const Task = require("../task.schema.js");

async function getTasksProvider(req,res) {
  return await Task.find();
}

module.exports = getTasksProvider;