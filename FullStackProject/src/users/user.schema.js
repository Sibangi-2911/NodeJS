const {Schema, model} = require("mongoose");

const userSchema = Schema({
  firstName : {
    type:String,
    required : [true, "First name is required"],
    trim: true,
    maxLength:[100, "First name cannot exceed 100 characters"],
  },
  lastName : {
    type:String,
    required : false,
    trim: true,
    maxLength:[100, "last name cannot exceed 100 characters"],
  },
  email : {
    type:String,
    required : [true, "email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email){
        // Regex to validate email
        /** 
         * 
         * ^\w+: This ensures that the email starts with one or more word characters (letters, digits, or underscores). The ^ anchors the match at the start of the string.

          ([\.-]?\w+)*: This matches zero or more groups that may start with a dot . or a dash -, followed by one or more word characters. This pattern matches parts of the email prefix separated by dots or dashes (like in first.last or first-last).

          @: This is the mandatory "at" symbol in the email address.

          \w+: After the @, there must be one or more word characters. This part typically matches the domain name (like example in example.com).

          ([\.-]?\w+)*: This is similar to the earlier group, allowing for domain subsections separated by dots or dashes (like example.co.uk).

          (\.\w{2,3})+$: This matches the top-level domain (TLD) which must be a dot followed by two to three word characters. It allows for emails with multiple dot-separated TLDs, like co.uk.
         */
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: ()=> `Please enter a valid email address`,
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
      },
});
//model
const User = model("User", userSchema);

module.exports = User;

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *     - firstName
 *     - email
 *     - password
 *    properties:
 *     firstName:
 *      type: string
 *      description: The first name of the user
 *      maxLength: 100
 *     lastName:
 *      type: string
 *      description: The last name of the user
 *      maxLength: 100
 *     email:
 *      type: string
 *      description: A valid email address
 *     password:
 *      type: string
 *      description: Must contain 8 characters and also a number, a capital letter and a special character
 *    example:
 *     firstName: John
 *     lastName: Doe
 *     email: john@doe.com
 *     password: Password@123#
 */