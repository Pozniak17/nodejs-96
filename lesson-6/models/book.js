import mongoose from "mongoose";

// в title вказуємо додаткові параметри, рядок і обов'язкове поле
// в enum всі можливі жанри
// default це якщо не вказано, то ставиться за замовчуванням

//todo MongoDB дозволяє містити поля з різними полями, а Mongoose намагається створити однакову для всіх структуру. Якщо нам це не ОК, щоб кожен документ з колекції містив різні значення, тоді краще скористатися нативним MongoDB драйвером. 59:00
const bookSchema = new mongoose.Schema({
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
});

// тут ми створюємо бд, монгус переводить назву в нижній регістр book і перетворює в множину books, це буде назвою нашої колекції
export default mongoose.model("Book", bookSchema); //books - collection name
