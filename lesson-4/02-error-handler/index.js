import express from "express";
import * as fs from "node:fs/promises";
import path from "node:path";

const PORT = 8080;
const app = express();

// формуємо помилку сервера (коли в нас не вірний доступ books.txt не існує, а в нас movies.txt)
app.get("/movies", async (req, res, next) => {
  //   res.send("Movies"); //якщо роут знайшовся тут і буде вихід з функції, в next не піде'
  try {
    const data = await fs.readFile(path.resolve("movies.txt"), {
      encoding: "utf-8",
    });

    res.send(data);
  } catch (error) {
    // 500 помилка це внутрішня помилка сервера
    next(error);
    // console.error(error); //! викидаємо помилку в консоль для себе або можна застосувати Sentry (адмін-консоль для помилок)
    // res.status(500).send("Internal Server Error:-(");
  }
});

app.get("/books", async (req, res, next) => {
  try {
    const data = await fs.readFile(path.resolve("books.txt"), {
      encoding: "utf-8",
    });

    res.send(data);
  } catch (error) {
    next(error);
    // 500 помилка це внутрішня помилка сервера
    // console.error(error); //! викидаємо помилку в консоль для себе або можна застосувати Sentry (адмін-консоль для помилок)
    // res.status(500).send("Internal Server Error:-(");
  }
});

// видаємо помилку при не вірному введені (не movies, а books) через middleware
// це кастомізація помилки 404, щоб 404 не надсилала index.html, а наш текст "Not Found:("
app.use((req, res, next) => {
  res.status(404).send("Not Found:(");
});

//! Ця мідлвара з 4 параметрами це обробка помилки, яка йде з next(error) на 18 на 32 рядках
//! 4 аргументи - це тільки для помилок
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("Internal Server Error:-(");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${8080}`);
});
