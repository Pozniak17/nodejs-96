import * as fs from "node:fs/promises";
import path from "node:path";
import express from "express";

const PORT = 8080;

const app = express();

// виносимо логіку
function checkAuth(req, res, next) {
  console.log("Middleware A");
  const apiKey = req.query["api-key"]; //зчитуємо в запиті http://localhost:8080/movies?api-key=12345 властивість api-key
  // якщо не введений api-key: 12345 то ми не зможемо отримати доступ до запиту, в запиті буде помилка
  if (apiKey !== "12345") {
    return res.status(401).send("Please provide API Key"); //401 unauthorized
  }

  next();
}

// use для middleware в express
//! app.use(checkAuth); - глобальна middleware, перевірка по всьому документі

// next() вказує йди далі вниз по коду
app.use((req, res, next) => {
  console.log("Middleware B");

  next();
});

// зчитуємо з файлу movies.txt при get http://localhost:8080/movies список фільмів
//! тут checkAuth працює тільки в app.get
app.get("/movies", checkAuth, async (req, res) => {
  const data = await fs.readFile(path.resolve("movies.txt"), {
    encoding: "utf-8",
  });

  res.send(data);
});

app.post("/movies", checkAuth, (req, res) => {
  res.send("POST Movies");
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
