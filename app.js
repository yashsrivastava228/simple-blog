
import express from 'express';
import bodyParser from "body-parser";
import _ from 'lodash';

const homeStartingContent  = "Be part of our blog by sharing your story and insights with our community.";
const aboutContent= "Here in our blog, you'll find insightful articles, practical tips, and captivating stories. Whether you're just starting out or have some experience, our aim is to provide valuable content that inspires, educates, and entertains.";
const contactContent = "Have a question or suggestion? We'd love to hear from you! You can contact us on our email : yashsrivastava228@gmail.com";
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts=[];

app.get("/", (req, res) => {
  res.render("home.ejs", { headf : homeStartingContent, posts : posts });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { ab : aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs", { con : contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.get("/posts/:postName",(req,res)=>{
  const reqTitle=_.lowerCase(req.params.postName);

  posts.forEach((post)=>{
    const postTitle=_.lowerCase(post.title);
    if(reqTitle===postTitle)
    {
      res.render("post.ejs",{
        title : post.title,
        content : post.content
      })
    }
  })
})

app.post("/compose", (req, res) => {
  const post=
  {
   title: req.body.comp,
  content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
