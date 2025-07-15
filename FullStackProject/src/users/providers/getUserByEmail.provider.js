const User = require("../user.schema.js");

async function getUserByEmail(email) {
  try{
    const user = await User.findOne({email:email});
    return user;
  }catch(error){
    return error;
  }
}


module.exports = getUserByEmail;