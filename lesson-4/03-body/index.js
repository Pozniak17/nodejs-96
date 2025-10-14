// файл POST відправлення наших даних
// {
//     "title": "Film 1",
//     "producer": "Producer 1",
//     "year": 2000
// }

import express from "express";
import crypto from "node:crypto";

const PORT = 8080;
const app = express();

// глобальна мідлвара, (краще її парсити в не глобально) розпарсюємо наш JSON файл який ми передали, щоб побачити його в консолі
// нам express.json() потрібен тільки на POST
//! app.use(express.json()); //побачимо в консолі { title: 'Film 1', producer: 'Producer 1', year: 2000 }

const jsonParser = express.json(); //глобальна мідлвара щоб побачити req.body

app.post("/movies", jsonParser, (req, res) => {
  //   console.log(req.body);
  const { title, producer, year } = req.body;
  res.status(201).send({ id: crypto.randomUUID(), title, producer, year }); //201 - created та повертаємо весь об'єкт який створили (додаючи наш id)
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
