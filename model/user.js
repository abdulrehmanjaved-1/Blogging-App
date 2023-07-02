const {Schema,model}=require("mongoose")

const Signup_schema=new Schema({
    username:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true});

const Signup_model=model("user",Signup_schema);

module.exports=Signup_model;

