const {getUser} = require("../service/auth.js");

async function restrictToLoggedinUserOnly(req,res,next) {
  //const userUid = req.cookies?.uid; // from controller whatever cookie name
  const userUid = req.headers["authorization"];

  if(!userUid || !userUid.startsWith("Bearer "))
    return res.redirect("/login");
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);
  if(!user)
    return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req,res,next){
  const userUid = req.headers["authorization"];
  if (!userUid || !userUid.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);
  
  req.user = user;
  next();
  //const userUid = req.cookies?.uid; // from controller whatever cookie name
  
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};