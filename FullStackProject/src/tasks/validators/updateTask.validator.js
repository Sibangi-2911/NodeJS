const {body} = require("express-validator");

const updateTaskValidator = [
  body("_id", "Valid document id is required").notEmpty().isMongoId(),
  body("title", "title must be a string").isString().optional().trim(),
  body("title","The title cannot be  more than 100 characters.").isLength({max:100}),
  body("dueDate","dueDate needs to be a valid ISO8601 string").isString().isISO8601().optional(),
  body("description", "The description cannot be empty and needs to be a string").isString().optional().trim(),
  body("description", "The description cannot be more than 500 characters.").isLength({max:500}),
  body("priority").isIn(["low","normal","high"]).optional(),
  body("status").isIn(["todo","inProgress","completed"]).optional(),
];

module.exports = updateTaskValidator;