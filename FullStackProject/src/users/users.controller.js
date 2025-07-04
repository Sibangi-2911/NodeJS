const {StatusCodes, ReasonPhrases} = require("http-status-codes");
const createUserProvider = require("./providers/createUser.provider.js");

async function handleCreateUser(req,res){
  const user = await createUserProvider(req,res);
  res.status(StatusCodes.CREATED).json(user);
}

module.exports={handleCreateUser};