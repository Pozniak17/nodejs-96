import * as fs from "node:fs/promises";
import path from "node:path";
import express from "express";

const PORT = 8080;

const app = express();

app.use((req, res, next) => {
  const apiKey = req.query["api-key"];

  console.log({ typeof: typeof apiKey });

  console.log("Middleware A");

  next();
});

app.use((req, res, next) => {
  console.log("Middleware B");

  next();
});

app.get("/movies", async (req, res) => {
  const data = await fs.readFile(path.resolve("movies.txt"), {
    encoding: "utf-8",
  });
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
