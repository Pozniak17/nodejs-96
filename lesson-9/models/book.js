import mongoose from "mongoose";

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
    // тут ми вказуємо що в нашої книєки буде ід користувача, а в нас це _id: new ObjectId('692db90f609c9005b394749f'),
    // не може бути книжки, в якої немає користувача
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Book", bookSchema); //books - collection name
