import express from "express";
import * as fs from "node:fs/promises";
import path from "node:path";

const app = express();

// обробка помилки сервера (не можемо зчитати books.txt)
app.get("/movies", async (req, res, next) => {
  try {
    const data = await fs.readFile(path.resolve("books.txt"), {
      encoding: "utf-8",
    });

    res.send(data);
  } catch (error) {
    next(error);
  }
});

// обробка помилки сервера (не можемо зчитати books.txt)
app.get("/books", async (req, res, next) => {
  try {
    const data = await fs.readFile(path.resolve("books.txt"), {
      encoding: "utf-8",
    });

    res.send(data);
  } catch (error) {
    next(error);
  }
});

// кастомізація помилки 404 (клієнтські помилки)
app.use((req, res, next) => {
  res.status(404).send("Not Found:(");
});

// Handler Application Error
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Internal Server Error");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
