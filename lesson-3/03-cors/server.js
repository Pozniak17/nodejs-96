import * as fs from "node:fs/promises";
import path from "node:path";
import cors from "cors";

import express from "express";

const PORT = 8080;

const app = express();

app.use(cors());

app.get("/movies", async (req, res) => {
  const data = await fs.readFile(path.resolve("movies.txt"), {
    encoding: "utf-8",
  });
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
