//! тут ми додаємо валідацію на title, producer, year які приходять в Body через бібліотеку Joi (аналог Yup)

// файл POST відправлення наших даних
// {
//     "title": "Film 1",
//     "producer": "Producer 1",
//     "year": 2000
// }

import express from "express";

import crypto from "node:crypto";
import morgan from "morgan";

import movieSchema from "./schema/movie.js";

const PORT = 8080;
const app = express();

// для логування в консолі
app.use(morgan("combined"));

const jsonParser = express.json();

app.post("/movies", jsonParser, (req, res) => {
  //   console.log(req.body);
  const movie = {
    title: req.body.title,
    producer: req.body.producer,
    year: req.body.year,
  };

  // проганяємо через нашу схему об'єкт movie. convert: false це щоб не конвертувалося з рядка в число
  const { error, value } = movieSchema.validate(movie, { convert: false });
  if (typeof error !== "undefined") {
    return res.status(400).send("Validation Error");
  }

  res.status(201).send({ id: crypto.randomUUID(), ...value }); //201 - created та повертаємо весь об'єкт який створили (додаючи наш id)
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
