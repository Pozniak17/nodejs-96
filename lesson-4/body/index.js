import express from "express";
import crypto from "node:crypto";

const app = express();

// app.use(express.json());
const jsonParser = express.json();

app.post("/movies", jsonParser, (req, res) => {
  const { title, producer, year } = req.body;

  res.status(201).send({ id: crypto.randomUUID(), title, producer, year });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
