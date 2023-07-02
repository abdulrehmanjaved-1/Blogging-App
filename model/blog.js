const {Schema,model}=require("mongoose");
const { get_cookie } = require("../services/authentication");
// const { dynamic_collection } = require("../controller/blog");

const blog_schema=new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        // required:true,
    },
    coverimageurl:{
        type:String,
        required:false,
        // default:"../public/uploads/1688208997227-F2022105135-Abdulrehman Muhammad Javed.jpg"
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:'user' 
    }
},{timestamps:true});


// const decoded=dynamic_collection;
const blog_model=model("blogs",blog_schema);

module.exports=blog_model;

