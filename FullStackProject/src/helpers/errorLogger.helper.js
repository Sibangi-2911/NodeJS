const logger = require("./winston.helper.js");

function errorLogger(message,req,error){
  logger.error(`Error creating a new task ${error.message}`, {
      metadata: {
        errorCode:error.code,
        errorName:error.name,
        method:req.method,
        url:req.originalUrl,
        body:req.body,
        query:req.query,
        params:req.params,
        error:error,
      }
    });
}

module.exports = errorLogger;