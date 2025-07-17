//static router meams used for front end
const express = require("express");
const {restrictTo} = require("../middlewares/auth.js");
const URL = require("../models/url.js");
const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async(req,res)=>{
  const allUrls = await URL.find({});
  return res.render("home", {
    urls:allUrls,
  });
})

router.get("/",restrictTo(["NORMAL", "ADMIN"]),async(req,res)=>{
  const allUrls = await URL.find({ createdBy: req.user._id});
  return res.render("home", {
    urls:allUrls,
  });
});

router.get("/signup", (req,res)=>{
  return res.render("signup");
});

router.get("/login", (req,res)=>{
  return res.render("login");
});

module.exports = router;