import Book from "../models/book.js";

async function getBooks(req, res, next) {
  // який користувач робить запит
  // todo це докодоване значення
  console.log({ user: req.user }); //{ id: '692db90f609c9005b394749f', name: 'Michael' }
  console.log(req);

  try {
    // req.user.id = це значення з decode
    const books = await Book.find({ ownerId: req.user.id }); //персоналізуємо відповідь за фільтром

    res.send(books);
  } catch (error) {
    next(error);
  }
}

async function getBook(req, res, next) {
  const { id } = req.params;
  try {
    // todo варіант 1
    // const book = await Book.findById(id);

    // // якщо не знайдено по id
    // if (book === null) {
    //   return res.status(404).send({ message: "Book not found" });
    // }

    // //* нове
    // console.log(book.ownerId, req.user.id); //new ObjectId('692db947609c9005b39474a3') 692db947609c9005b39474a3
    //! щоб взяти число без тексту вик. toString()
    //! це щоб по чужому ід не можна було б взяти книжку
    // if (book.ownerId.toString !== req.user.id) {
    //   // return res.status(403).send({ message: "Book is forbidden" });
    //   return res.status(404).send({ message: "Book not found" }); // робить так
    // }

    //todo варіант 1

    //todo варіант 2
    const book = await Book.findOne({ _id: id, ownerId: req.user.id });

    if (book === null) {
      return res.status(404).send({ message: "Book not found" });
    }
    //todo варіант 2
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
    ownerId: req.user.id, //нове поле, яке ми витягуємо з req.user.id, це ті що decode
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

// todo
// при create - post запиті передаємо, ownedId - передавати не треба, він береться з декодованих значень req.user
// {
//     "title": "New JS",
//     "author": "Gleck Glock",
//     "genre": "Action",
//     "year": 2020,
//     "pages": 100
// }

//todo отримуємо
// {
//     "title": "New JS",
//     "author": "Gleck Glock",
//     "genre": "Action",
//     "year": 2020,
//     "pages": 100,
//     "ownerId": "692db90f609c9005b394749f", // додалося поле з декодованого значення
//     "_id": "69551bb4659f8beb65c2da05", // id книжки (створює MongoDB)
//     "createdAt": "2025-12-31T12:48:52.262Z",
//     "updatedAt": "2025-12-31T12:48:52.262Z"
// }
