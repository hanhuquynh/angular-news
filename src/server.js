const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "project-angular",
});

app.get("/api/news", async (req, res) => {
  const [news] = await connectDB.execute("select * from news order by id desc");
  return res.json({
    data: news,
  });
});

app.get("/api/news/:id", async (req, res) => {
  let id = req.params.id;
  const [news] = await connectDB.execute("select * from news where id = ?", [
    id,
  ]);
  return res.json({
    data: news,
  });
});

app.post("/api/news", async (req, res) => {
  let title = req.body.title;
  let image = req.body.image;
  let image_title = req.body.image_title;
  let posting_date = req.body.posting_date;
  let category = req.body.category;
  let content = req.body.content;
  await connectDB.execute(
    "insert into news (title, image, image_title, posting_date,category,content) values (?,?,?,?,?,?)",
    [title, image, image_title, posting_date, category, content]
  );
  return res.json({
    message: "ok",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
