const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

async function connectToMongodb(url) {
  return mongoose.connect(url)
  .then(()=>console.log("Mongodb connected..."))
  .catch(()=>console.log("Mongo error", err));
}

module.exports = {
  connectToMongodb,
};