const express = require("express");
const { user_addblog,user_addblog_and_render } = require("../controller/blog");
const route3 = express.Router();
const path = require("path");
const fs = require('fs');

const multer = require('multer');  //for file uploads

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationDir = path.resolve(__dirname, '../public/uploads');
    fs.mkdirSync(destinationDir, { recursive: true });
    cb(null, destinationDir);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

route3.get('/newblog', user_addblog);
route3.post('/newblog/add', upload.single("coverimage"), user_addblog_and_render);

module.exports = route3;
