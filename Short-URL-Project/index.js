const express = require("express");
const path = require("path");
const {connectToMongodb} = require("./connect.js");
const urlRoute = require("./routes/url.js");
const staticRouter = require("./routes/staticRouter.js");
const URL = require("./models/url.js");


const app = express();
const PORT = 8001;

connectToMongodb('mongodb://localhost:27017/short-url');

//server side rendering ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//html page
/*app.get("/test", async(req,res)=>{
  const allUrls = await URL.find({});
  return res.render("home", {
    urls:allUrls,
  });
});*/

app.use("/url", urlRoute);

app.use("/",staticRouter);

app.get("/url/:shortId", async (req,res)=>{
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