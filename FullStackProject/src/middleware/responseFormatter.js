const { StatusCodes, getReasonPhrase } = require("http-status-codes");

function responseFormatter(req, res, next) {
  const originalJson = res.json;

  res.json = (data) => {
    // Make sure status code is preserved correctly
    const statusCode = res.statusCode || StatusCodes.OK;

    // Build response object
    const response = {
      status: statusCode >= 200 && statusCode < 300 ? "success" : "error",
      statusCode,
      message: getReasonPhrase(statusCode),
    };

    // Set custom message if available in `reason` field
    if (statusCode >= 300) {
      response.error = data;

      if (data && typeof data === "object" && data.reason) {
        response.message = data.reason;
      } else if (typeof data === "string") {
        response.message = data;
      }
    } else {
      // For successful responses
      response.data = data?.pagination ? data.data : data;
      if (data?.pagination) {
        response.pagination = data.pagination;
      }
    }

    originalJson.call(res, response);
  };

  next();
}

module.exports = responseFormatter;
