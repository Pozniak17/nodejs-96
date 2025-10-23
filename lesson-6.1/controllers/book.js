import Book from "../models/book.js";

async function getBooks(req, res, next) {
  try {
    const books = await Book.find(); //find повертає всі документи які знаходяться в колекції
    res.send(books);
  } catch (error) {
    next(error);
  }
}

async function getBook(req, res, next) {
  const { id } = req.params;
  try {
    const book = await Book.findById(id); //повертає документ або null

    if (book === null) {
      return res.status(404).send("Book not found");
    }

    res.send(book);
  } catch (error) {
    next(error);
  }
}

async function createBook(req, res, next) {
  // Add Joi before
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
    pages: req.body.pages,
  };

  try {
    const result = await Book.create(book); //книжка яка створилася з id

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

async function updateBook(req, res, next) {
  // Add Joi before

  const { id } = req.params;

  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
    pages: req.body.pages,
  };

  try {
    const result = await Book.findByIdAndUpdate(id, book, { new: true });

    console.log(result); //! findByIdAndUpdate повертає в консоль попередню версію до оновлення або вказати опцію { new: true }☝️

    if (result === null) {
      return res.status(404).send("Book not found");
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  const { id } = req.params;
  try {
    const result = await Book.findByIdAndDelete(id);

    //! Book.findOneAndDelete({ author: "Author 1" }); цей метод видаляє за фільтром
    if (result === null) {
      return res.status(404).send("Book not found");
    }

    res.send({ id });
  } catch (error) {
    next(error);
  }
}

export default {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
