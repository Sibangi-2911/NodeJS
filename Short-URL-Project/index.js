const express = require("express");
const {connectToMongodb} = require("./connect.js");
const urlRoute = require("./routes/url.js");
const URL = require("./models/url.js");

const app = express();
const PORT = 8001;

connectToMongodb('mongodb://localhost:27017/short-url');

app.use(express.json());

app.use("/URL", urlRoute);

app.get("/:shortId", async (req,res)=>{
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId,
  }, {$push: {
    visitHistory: {
      timestamp: Date.now(),
    },
  }});
  res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=> console.log(`Server started at port no. ${PORT}`));