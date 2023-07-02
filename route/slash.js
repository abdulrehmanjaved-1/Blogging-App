const express = require("express");
const { route } = require("./user");
const route2 = express.Router();
const { restrictTologinedOnly } = require("../middlewares/auth.js");
const { get_cookie } = require("../services/authentication");
const blog_model = require("../model/blog");

route2.get("/", (req, res) => {
  res.render("../view/firstpage.ejs");
});
route2.get("/signup", (req, res) => {
  res.render("../view/home.ejs");
});
route2.get("/login", (req, res) => {
  res.render("../view/login.ejs");
});
// route2.get("/newblog", (req, res) => {
//   res.render("../view/myblogs.ejs",{user:req.user});
// });
route2.get("/blogs", restrictTologinedOnly, async(req, res) => {
  const nonverifiedcookie = req.cookies["uid"];
  const verifiedtoken = get_cookie(nonverifiedcookie);
  const allblogs=await blog_model.find({});
  res.render("../view/welcome.ejs", { blogs:allblogs,user: verifiedtoken, error: req.error });
});

module.exports = route2;
