const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const app = express();
const path = require("path");
const route1 = require("./route/user");
require("dotenv").config();
const PORT=process.env.PORT || 3000;
const URL=process.env.URL;
const connectToMongodb= require("./connection");
const {general_authentication} = require("./middlewares/auth");
const route2 = require("./route/slash");
const route3 = require("./route/blog");

// Function for MongoDB connection
const database = "blogify"; // Replace 'your_database_name' with the actual name of your database
const collection = "user";
const blog_collection = "blogs";
connectToMongodb(URL, database, collection);
// connectToMongodb(url,database,blog_collection)
app.set("view engine", "ejs");
// app.set("views", path.resolve("./view"));

// Use

app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.static(path.resolve("./public")));
app.use(general_authentication('uid'));

// useroutes
app.use("/user", route1);
app.use("/blog",route3);
app.use("/",route2);


// Listen
app.listen(PORT,()=>{
    console.log(`app listening at port ${PORT}`)
})
