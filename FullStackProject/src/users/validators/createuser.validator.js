const {body} = require("express-validator");

const createUserValidator =[
  body("firstName", "First name is required").isString().notEmpty().trim().isLength({max:100}),
  body("lastName", "last name is a string").isString().optional().trim().isLength({max:100}),
  body("email", "email is required and must be valid one").isEmail().notEmpty().trim().isLength({max:200}),
  body("password", "Password must include at least one number, one uppercase letter, one lowercase letter, and one special character.")
  .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
  .notEmpty()
  .isLength({min:8}),
];

module.exports = createUserValidator;