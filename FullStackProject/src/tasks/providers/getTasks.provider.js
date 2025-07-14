const Task = require("../task.schema.js");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function getTasksProvider(req,res) {
  const data = matchedData(req);

  try{
    const totalTasks = await Task.countDocuments();
    const currentPage = data.page;
    const limit = data.limit; // how many pages to load at one go
    const order = data.order;
    const totalPages = Math.ceil(totalTasks/limit);
    const nextPage = currentPage === totalPages ? currentPage : currentPage+1;
    const previousPage = currentPage === 1 ? currentPage : currentPage-1;
    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;

    //fetch data
    const tasks = await Task.find({
      status: {$in: ["todo", "inProgress"]},
    }).limit(limit).skip(currentPage-1).sort({
      createdAt: order==="asc" ? 1 : -1,
    });

    let finalResponse = {
      data:tasks,
      pagination: {
        meta: {
          itemsPerPage: limit,
          totalItems: totalTasks,
          currentPage: currentPage,
          totalPages: totalPages
        },
        link: {
          first: `${baseUrl}/?limit=${limit}&page=${1}&order=${order}`,
          last: `${baseUrl}/?limit=${limit}&page=${totalPages}&order=${order}`,
          currentPage: `${baseUrl}/?limit=${limit}&page=${currentPage}&order=${order}`,
          next: `${baseUrl}/?limit=${limit}&page=${nextPage}&order=${order}`,
          previous: `${baseUrl}/?limit=${limit}&page=${previousPage}&order=${order}`,
        },
      },
    };

    return res.status(StatusCodes.OK).json(finalResponse);
  }catch(error){
    errorLogger("Error while fetching the tasks", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later",
    });
  }
}

module.exports = getTasksProvider;