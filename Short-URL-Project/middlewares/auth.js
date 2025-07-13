const {getUser} = require("../service/auth.js");

async function restrictToLoggedinUserOnly(req,res,next) {
  const userUid = req.cookies?.uid; // from controller whatever cookie name

  if(!userUid)
    return res.redirect("/login");
  const user = getUser(userUid);
  if(!user)
    return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req,res,next){
  const userUid = req.cookies?.uid; // from controller whatever cookie name

  const user = getUser(userUid);
  
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};