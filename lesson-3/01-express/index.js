import express from "express";

const PORT = 8080;

// 1.ств. експресівську апку)
const app = express();

// 3.робимо куди буде робитись запит, (запит відповідь)
//get запит на http://localhost:8080/
app.get("/", (req, res) => {
  res.send("Hello, Express!"); //завершуємо відповідь
});

// post запит на http://localhost:8080/movies
app.post("/movies", (req, res) => {
  res.send("POST Movies:)");
});

// 2.слухаємо порт
app.listen(8080, () => {
  console.log(`Server started on port ${PORT}`);
});

// запуск через node.index.js
