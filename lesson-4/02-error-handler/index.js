import express from "express";
import * as fs from "node:fs/promises";
import path from "node:path";

const app = express();
const PORT = 8080;

// в try/catch серверна помилка 5хх
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

// Handle 404 Error клієнтська помилка 4хх
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Handler Application Error, мідлвара на 4 аргументи лише для помилок, важливо 4
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Internal Server Error:((");
});

app.listen(8080, () => {
  console.log(`Server started on port ${PORT}`);
});
