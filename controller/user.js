const Signup_model = require("../model/user");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { set_cookie } = require("../services/authentication");
const saltRounds = 10;
const secret="abdul123";

function new_user_signup(req, res) {
  // res.send("hello im first get in routers1");
  const body = req.body;
  bcrypt
    .hash(body.password, saltRounds)
    .then((hash) => {
      body.password = hash; // Assign the hashed password to body.password
      const user = Signup_model.create({
        username: body.username,
        email: body.email,
        password: body.password,
      });
    })
    .catch((err) => console.error(err.message));
  return res.redirect("/blogs");
}

async function user_login(req, res) {
  const { email, password } = req.body;
  const user = await Signup_model.findOne({ email });

  if (!user) {
    const error = "Incorrect email";
    return res.render("login", { error });
  }
  

  bcrypt
    .compare(password, user.password)
    .then((isPasswordMatched) => {
      if (!isPasswordMatched) {
        const error = "Incorrect password";
        return res.render("login", { error });
      };
      const token=set_cookie(user);
      res.cookie("uid",token);
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error.message);
      res.redirect("/login");
    });
}

function user_logout(req,res){
  res.clearCookie("uid");
  res.redirect("/login")
}

module.exports = { new_user_signup, user_login,user_logout };
