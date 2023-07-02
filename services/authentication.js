const jwt=require("jsonwebtoken");
const secret="abdul123";

function set_cookie(user)
{
    return jwt.sign({
        _id:user._id,
        username:user.username,
        password:user.password,
        email:user.email
    },secret)
}

function get_cookie(token){
    return jwt.verify(token,secret)
}

module.exports={set_cookie,get_cookie}