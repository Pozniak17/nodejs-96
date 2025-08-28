import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

// в метода path є метод resolve в собі містить абсолютний шлях, з того місця де ми запустили node, також нормалізує шлях.
const filePath = path.resolve("books", "books.json");

//! тут функції helpers
// зчитування книжок з books.json
async function readBooks() {
  // повертає string під json,
  const data = await fs.readFile(filePath, { encoding: "utf-8" });
  // треба сконвертувати в об'єкт
  return JSON.parse(data);
}

// readBooks().then((books) => console.log(books[0].title));

// перезапис в books.json
function writeBooks(books) {
  // в нас books.json це json, тому те що ми записуємо треба теж перетворити в json
  return fs.writeFile(filePath, JSON.stringify(books, undefined, 2)); // space: 2 пробіли, це щоб не в 1 рядок, а щоб був гарний json вигляд
}

// writeBooks([{ id: "1", title: "Title1", author: "Author1" }]);

//! тут функції helpers

//! а тут функції вже роботи з bookshelf
// взяти з книжкової полиці
async function getBooks() {
  const books = await readBooks();

  return books;
}

// беремо книжку по id
async function getBook(id) {
  // 1. зчитуємо всі книжки
  const books = await readBooks();

  // 2. повертаємо елемент масиву, а якщо нічого не знайдено то undefined
  const book = books.find((book) => book.id === id);

  // 3. якщо контакт не знайдено то повертаємо null (find повертає undefined)
  if (typeof book === "undefined") {
    return null;
  }

  return book;
}

// створення (будемо додавати в список книжок)
async function createBook(book) {
  // 1. зчитуємо книжки
  const books = await readBooks();

  // 2. створюємо нову книжку, додаючи власний id
  const newBook = { ...book, id: crypto.randomUUID() };

  // 3. додаємо в кінець книжку до інших книжок
  books.push(newBook);

  // 4. перезаписуємо книжки (перетворюючи в JSON формат)
  await writeBooks(books);

  // 5. повертаємо користувачеві нову створену книжку
  return newBook;
}

// оновлення книжки по id її і самі дані які ми хочемо оновити
async function updatedBook(id, book) {
  // 1. зчитуємо книжки
  const books = await readBooks();

  // 2. шукаємо індекс книжки, тієї яку ми передаємо аргументом
  const index = books.findIndex((book) => book.id === id);

  // 3. findIndex повертає або індекс або -1, якщо не знайшли повертаємо null
  if (index === -1) {
    return null;
  }

  const updatedBook = { ...book, id };

  // варіант 1 (без мутації)
  //   const newBooks = [
  //     ...books.slice(0, index),
  //     updatedBook,
  //     ...books.slice(index + 1),
  //   ];

  //   await writeBooks(newBooks);

  // варіант 2 (через мутацію, але нічого страшного)
  books[index] = updatedBook;

  await writeBooks(books);

  return updatedBook;
}

// функція видалення
async function removeBook(id) {
  // 1. зчитуємо книжки
  const books = await readBooks();

  // 2. шукаємо індекс книжки, тієї яку ми передаємо аргументом
  const index = books.findIndex((book) => book.id === id);

  // 3. findIndex повертає або індекс або -1, якщо не знайшли повертаємо null
  if (index === -1) {
    return null;
  }

  const removedBook = books[index];

  // варіант 1 (без мутації)
  //   const newBooks = [...books.slice(0, index), ...books.slice(index + 1)];

  //   await writeBooks(newBooks);

  // варіант 2 (з мутацією), вказуємо індекс та скільки елементів ми хочемо видалити
  books.splice(index, 1);

  // перезаписуємо
  await writeBooks(books);
  // повертаємо видалену книжку
  return removedBook;
}

// readBooks та writeBooks ми не експортуємо, бо це приватні функції, потрібні тільки тут (інкапсуляція)
export { getBooks, getBook, createBook, updatedBook, removeBook };
// продовжити 1:56:30
