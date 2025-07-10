const {query} = require("express-validator");

const getTasksValidator = [
  query("limit", "limit must be a valid int").optional().isInt().toInt(),
  query("page", "page must be a valid int").optional().isInt().toInt(),
  query("order", "order must be of ['asc', 'dsc']").optional().isIn(["asc","dsc"]),
];

module.exports = getTasksValidator;