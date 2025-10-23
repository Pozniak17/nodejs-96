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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema); // books - collection name

//Joi це помилки для виводу клієнту
// Монгусівська схема як раз для нас

//*  versionKey: false,
// вимикаємо версіонність __v: 0

//*  timestamps: true, додаються ці поля при створенні книжки
//  "createdAt": "2025-10-23T10:51:34.794Z",
//   "updatedAt": "2025-10-23T10:51:34.794Z"
