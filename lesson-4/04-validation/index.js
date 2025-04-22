import express from "express";
import crypto from "node:crypto";
import morgan from "morgan";
import movieSchema from "./schema/movie.js";

const app = express();
const port = 8080;

app.use(morgan("combined"));

//* цей метод розпарсить req.body, для post,put,patch, тому глабально ми її не робимо
//! app.use(express.json());
//* тому
const jsonParser = express.json();

app.post("/movies", jsonParser, (req, res) => {
  //   console.log(req.body);
  //   const { title, producer, year } = req.body;

  const movie = {
    title: req.body.title,
    producer: req.body.producer,
    year: req.body.year,
  };

  const { error, value } = movieSchema.validate(movie, { convert: false }); // convert це щоб joi не конвертував рядок в число

  if (typeof error !== "undefined") {
    return res.status(400).send("Validation Error");
  }

  res.status(201).send({ id: crypto.randomUUID(), ...value });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
