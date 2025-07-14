const {query} = require("express-validator");

const getTasksValidator = [
  query("limit", "limit must be a valid int").optional().isInt().toInt({min:1}),
  query("limit").customSanitizer((value, {req})=>{
    return value ? value : 3;
  }),
  query("page", "page must be a valid int").optional().isInt().toInt({min:1}),
  query("page").customSanitizer((value, {req})=>{
    return value ? value : 1;
  }),
  query("order", "order must be of ['asc', 'dsc']").optional().isIn(["asc","dsc"]),
  query("order").customSanitizer((value, {req})=>{
    return value ? value : "asc";
  }),
];

module.exports = getTasksValidator;