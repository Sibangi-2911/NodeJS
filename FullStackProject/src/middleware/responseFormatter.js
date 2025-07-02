const {getReasonPhrase} = require("http-status-codes");

function responseFormatter(req,res,next){
  const originalJson = res.json;

  res.json = (data)=>{
    const response = {
      status: res.statusCode >=200 && res.statusCode<300 ? "success":"error",
      statusCode: res.statusCode,
      message : getReasonPhrase(res.statusCode),
      data: data,
    };
    originalJson.call(res,response); // res the original object is now replaced by response
  };
  next();
}
module.exports = responseFormatter;