// в es6 вказувати треба розширення і файл
import Books from "./books/index.js";
import { program } from "commander";

//! тут пишемо cli, дивитися на методи в index.js що вони отримують аргументами
async function invokeAction({ action, id, title, author }) {
  switch (action) {
    case "getAll":
      const books = await Books.getBooks();
      return books;

    case "getById":
      const book = await Books.getBook(id);
      return book;

    case "create":
      const createdBook = await Books.createBook({ title, author });
      return createdBook;

    case "update":
      const updatedBook = await Books.updatedBook(id, { title, author });
      return updatedBook;

    case "remove":
      const removedBook = await Books.removeBook(id);
      return removedBook;

    default:
      return "unknown action:(";
  }
}

// як запускати node app.js --action create --title "Title 1" --author "Author 1"
// це робиться через
// console.log(process.argv);

// [
//   "C:\\Program Files\\nodejs\\node.exe",
//   "C:\\Users\\pozni\\Documents\\GitHub\\nodejs-96\\lesson-2\\03-bookshelf-cli\\app.js",
//   "--action",
//   "create",
//   "--title",
//   "Title 1",
//   "--author",
//   "Author 1",
// ];

// встановлюємо commander (щоб не робити через process.argv вручну)

//! опції program --action <action> тут ми вказуємо що в команді це буде --action це назва ключа, create буде значенням
program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "Book id")
  .option("-t, --title <title>", "Book title")
  .option("-u, --author <author>", "Book author"); // <-- тут зміна

// далі нам треба розпарсити
program.parse(process.argv);

// повертає опції, які він розпарсив з process.argv
//* console.log(program.opts());

//* запускаємо node app.js --action create --title "Title" --author "Author"
//* повертає { action: 'create', title: 'Title', author: 'Author' }

//* або node app.js --action getAll

//* node app.js --help це для виводу команд

invokeAction(program.opts()).then(console.log).catch(console.error);
