import Book from "../models/book.js";

async function getBooks(req, res, next) {
  //* це з middleware те що ми додали req.user = {id: decode.id, name: decode.name};
  console.log({ user: req.user }); //{ id: '692db947609c9005b39474a3', name: 'Maria' }

  try {
    const books = await Book.find({ ownerId: req.user.id }); //передаємо всередину фільтр, для показу лише книжок користувача

    res.send(books);
  } catch (error) {
    next(error);
  }
}

async function getBook(req, res, next) {
  const { id } = req.params;
  try {
    //! варіант 1
    // const book = await Book.findById(id);

    // якщо не знайдено по id
    // if (book === null) {
    //   return res.status(404).send({ message: "Book not found" });
    // }

    // додаткова перевірка, щоб не можна було витягувати книги по id, які не належать ownerId
    // toString для конвертування ew ObjectId('692db947609c9005b39474a3') в 692db947609c9005b39474a3
    //todo 403 це "така книга є, але немає доступу" не використовують, тому повертають 404
    // if (book.ownerId.toString() !== req.user.id) {
    // return res.status(403).send({ message: "Book is forbidden" }); // не використовуємо
    // return res.status(404).send({ message: "Book not found" }); // використовуємо
    // }
    //!

    //! варіант 2 (так само робиться update та delete)
    const book = await Book.findOne({ _id: id, ownerId: req.user.id });

    if (book === null) {
      return res.status(404).send({ message: "Book not found" });
    }
    //!

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
    ownerId: req.user.id, //додаємо поле id до книжки при створенні, в body не передаємо, додається автоматично з user req.user = {id: decode.id, name: decode.name}; з токену
  };

  try {
    const result = await Book.create(book);

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
    // { new: true } для повернення в консоль нового оновленого вже значення
    const result = await Book.findByIdAndUpdate(id, book, { new: true });

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

//todo findByIdAndDelete це видалення по id
//todo findOneAndDelete це видалення по фільтру Book.findOneAndDelete({author: "Author 1"})
