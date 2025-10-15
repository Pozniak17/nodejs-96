function getBooks(req, res, next) {
  res.send("Books");
}

function getBook(req, res, next) {
  const { id } = req.params;
  res.send(`Book ${id}`);
}

function createBook(req, res, next) {
  res.status(201).send("Book");
}

function updateBook(req, res, next) {
  const { id } = req.params;
  res.send(`Update book ${id}`);
}

function deleteBook(req, res, next) {
  const { id } = req.params;
  res.send(`Delete book ${id}`);
}

export default {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
