const blog_model = require("../model/blog");
const { get_cookie } = require("../services/authentication");

async function user_addblog(req, res) {
  const nonverifiedcookie = req.cookies["uid"];
  const verifiedtoken = get_cookie(nonverifiedcookie);
  const allblogs = await blog_model.find({}).exec(); // Await the execution of the query
  // console.log(allblogs);
  return res.render("../view/myblogs.ejs", { user: verifiedtoken, blogs: allblogs });
}


async function user_addblog_and_render(req, res) {
  try {
    const blog = req.body;

    // Check if the required fields are present
    if (!blog.title) {
      throw new Error("Title is required");
    }

    // Create a new blog entry using the blog_model
    await blog_model.create({
      title: blog.title,
      body: blog.body,
      createdby:blog._id,
      coverimageurl: req.file ? `../public/uploads/${req.file.filename}` : null
    });

    // Redirect the user to the "/blogs" page
    return res.redirect("/blogs");
  } catch (error) {
    console.error(error);
    return res.redirect("/blogs");
  }
}

  
async function dynamic_collection(req,res){
    const nonverifiedcookie = req.cookies["uid"];
  const verifiedtoken = get_cookie(nonverifiedcookie);
  return verifiedtoken;
}
module.exports={user_addblog,user_addblog_and_render,dynamic_collection};