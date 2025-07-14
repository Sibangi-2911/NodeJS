const {getReasonPhrase} = require("http-status-codes");
const { error } = require("winston");

function responseFormatter(req,res,next){
  const originalJson = res.json;

  res.json = (data)=>{
    const response = {
      status: res.statusCode >=200 && res.statusCode<300 ? "success":"error",
      statusCode: res.statusCode,
      message : getReasonPhrase(res.statusCode),
      /*data:res.statusCode >=200 && res.statusCode<300 ? data : null,
      error:res.statusCode >=200 && res.statusCode<300 ? null: data,*/
    };
    if(res.statusCode >=200 && res.statusCode<300){
      response.data = data.pagination ? data.data : data;
    }
    if(res.statusCode>300){
      response.error = error;
    }
    if(data.pagination){
      response.pagination = data.pagination;
    }
    originalJson.call(res,response); // res the original object is now replaced by response
  };
  next();
}
module.exports = responseFormatter;