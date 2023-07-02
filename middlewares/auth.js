const { get_cookie } = require("../services/authentication");

function restrictTologinedOnly(req,res,next){
    const user_cookie=req.cookies?.uid;
    if(!user_cookie) return res.redirect("/login");
    const is_cookie_ok=get_cookie(user_cookie);
    if(!is_cookie_ok) return res.redirect("/login");
    try {
        req.user = user_cookie;
        return next();
    } catch (error) {
        console.log(error);
        res.redirect("/ok");
    }
}

function general_authentication(cookieName) {
    return async(req, res, next) => {
     const tokenCookieValue = req.cookies[cookieName];
      if (!tokenCookieValue) {
        return next();
      }
      try {
        const userPayload = get_cookie(tokenCookieValue);
        req.user = userPayload;
        return next();
      } catch (error) {
        console.log(error);
        res.redirect("/login"); // Redirect to login page or handle the error appropriately
      }
    };
  }
  



module.exports={restrictTologinedOnly,general_authentication};