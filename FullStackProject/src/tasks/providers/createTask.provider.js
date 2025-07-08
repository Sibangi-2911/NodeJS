const Task = require("../task.schema.js");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");

async function createTaskProvider(req,res) {
  const validatedResult = matchedData(req);
  console.log(validatedResult);
  const task = new Task(validatedResult);
  try{
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  }catch(error){
    console.log(error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = createTaskProvider;