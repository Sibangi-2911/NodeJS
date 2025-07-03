//how thw structure of one task is going to look
const {Schema} = require("mongoose");

const taskSchema = new Schema({
  title: {
    type:String,
    required:[true, "Task title is required"],
    trim:true,
    maxLength:[100, "Title should not be more than 100 characters"],
  },
  description: {
    type:String,
    required:[true, "Task description is required"],
    trim: true,
    maxLength:[500, "Dexcription should not be more than 500 characters"],
  },
  status: {
    type:String,
    required:[true, "Task Status is required"],
    enum:["todo","inProgress","completed"],
    default:"todo",
  },
  priority: {
    type:String,
    required:[true, "Task Priority is required"],
    enum:["low","normal","high"],
    default:"normal",
  },
  dueDate: {
    type:Date,
    required:[true, "Task due date is required"],
  },
  createdAt: {
    type:Date,
    default:Date.now,
  }
});