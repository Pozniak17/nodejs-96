import mongoose from "mongoose";

// в title вказуємо додаткові параметри, рядок і обов'язкове поле
// в enum всі можливі жанри
// default це якщо не вказано, то ставиться за замовчуванням

//todo MongoDB дозволяє містити поля з різними полями, а Mongoose намагається створити однакову для всіх структуру. Якщо нам це не ОК, щоб кожен документ з колекції містив різні значення, тоді краще скористатися нативним MongoDB драйвером. 59:00
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "Action",
        "Biography",
        "History",
        "Horror",
        "Kids",
        "Learning",
        "Sci-Fi",
      ],
      required: true,
    },
    year: {
      type: Number,
      default: 2024,
    },
    pages: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true } //вимикаємо версіонність
);

// тут ми створюємо бд, монгус переводить назву в нижній регістр book і перетворює в множину books, це буде назвою нашої колекції
export default mongoose.model("Book", bookSchema); //books - collection name

//todo Монгусівська схема вказує чи в коді помилка, а ось клієнту як раз схема від Joi вказує
//todo  { versionKey: false } - це щоб вимкнути версіонність у відповіді, приклад:

// {
//     "title": "Title 4",
//     "author": "Author 4",
//     "genre": "Action",
//     "year": 2007,
//     "pages": 389,
//     "_id": "68f21eed4ed7cc980897e7ca",
//!     "__v": 0
// }

//todo {timestamps: true} - це щоб увімкнути час створення і оновлення

// {
//     "title": "Title 6",
//     "author": "Author 6",
//     "genre": "Action",
//     "year": 2008,
//     "pages": 220,
//     "_id": "68f220d8bcd6f8daea2f9b3f",
//!     "createdAt": "2025-10-17T10:56:24.164Z",
//!     "updatedAt": "2025-10-17T10:56:24.164Z"
// }
