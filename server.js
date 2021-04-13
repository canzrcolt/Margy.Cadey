const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const dotenv = require("dotenv");
const articleRouter = require("./routes/articles");
const app = express();

dotenv.config();

//Connect to Db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db!")
);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
app.listen(5000);
