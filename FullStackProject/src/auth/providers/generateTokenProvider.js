const jwt = require("jsonwebtoken");

function generateTokenProvider(user){
  const payload = {
    sub: user["_id"],
    email:user.email,
    iat:Math.floor(Date.now()/1000), //issued at time to get the epoch time
    exp: Math.floor(Date.now()/1000) + parseInt(process.env.JWT_ACCESS_EXPIRATION_TTL), // expiry time
  };

  //TOKEN CREATION
  return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = generateTokenProvider;