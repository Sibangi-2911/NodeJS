const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const getUserByEmail = require("../../users/providers/getUserByEmail.provider.js");
const bcrypt = require("bcrypt");
const generateTokenProvider = require("./generateTokenProvider.js");

async function loginProvider(req,res) {
  const validatedData = matchedData(req);
  try{
    //get user from database
    const user = await getUserByEmail(validatedData.email);

    //compare hash
    const result = await bcrypt.compare(validatedData.password, user.password);

    if(!result){
      return res.status(StatusCodes.BAD_REQUEST).json({message: "Please check your credentials"});
    }

    const token = generateTokenProvider(user);

    return res.status(StatusCodes.OK).json({
      accessToken: token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }catch(error){
    errorLogger("Error while trying to login", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = loginProvider;