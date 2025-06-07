import express from "express";
import path from "path";
import tasksRouter from "./routes/tasks";

const app = express();
const PORT = 3100;

app.use(express.json()); // JSON ボディパーサーを使用

// EJS をテンプレートエンジンに設定
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views")); // views フォルダのパス指定

app.get("/", (req, res) => {
  res.render("index",{message:"変数として渡される!!"}); // views/index.ejs を表示
});

// タスクルーティングをマウント
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
