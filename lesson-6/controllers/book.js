// імпортуємо модель, теж прийнято з великої літери
import Book from "../models/book.js";

async function getBooks(req, res, next) {
  try {
    const books = await Book.find();

    res.send(books);
  } catch (error) {
    next(error);
  }
}

async function getBook(req, res, next) {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    // якщо не знайдено то повертає null
    if (book === null) {
      return res.status(404).send("Book not found");
    }

    res.send(book);
  } catch (error) {
    next(error);
  }
}

//todo при помилці, якщо ми передамо для перевірки щось типу такого http://localhost:8080/api/books/1111, буде помилка 500, а нам треба 404☝️, але це тому що id в Atlas має бути 24 символи, якщо вказали 24 символи, то буде 404. В відео 1:40:07 та як провалідувати через Joi

async function createBook(req, res, next) {
  // тут Joi

  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
    pages: req.body.pages,
  };

  console.log(book);
  try {
    const result = await Book.create(book);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

function updateBook(req, res, next) {
  const { id } = req.params;
  res.send(`Update book ${id}`);
}

async function deleteBook(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Book.findByIdAndDelete(id); //теж повертає null
    // todo якщо нам треба видалити за іншим полем є метод
    // Book.findOneAndDelete({ author: "Author 1" });

    if (result === null) {
      res.status(404).send("Book not found");
    }

    res.send({ id });
  } catch (error) {
    next(error);
  }
}

export default {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};

// 1:45:00
