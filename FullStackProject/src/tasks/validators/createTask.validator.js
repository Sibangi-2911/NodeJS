const {body} = require("express-validator");

const createTaskValidator = [
  body("title", "The title should not be empty").notEmpty(),
  body("title","The title should be a string").isString(),
  body("title").trim(),
  body("title").isLength({max:100}),
  body("dueDate","dueDate needs to be a valid ISO8601 string").isString().isISO8601().notEmpty(),
  body("description", "The description cannot be empty and needs to be a string").isString().notEmpty().trim(),
  body("description", "The description cannot be more than 500 characters.").isLength({max:500}),
  body("priority").isIn(["low","normal","high"]),
  body("status").isIn(["todo","inProgress","completed"])
];

module.exports = createTaskValidator;