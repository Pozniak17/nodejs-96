// в файлі всі навіть тип number це string, тому треба для чисел конвертувати
//! 1. щоб зчитати треба npm i dotenv встановити
import "dotenv/config"; //! 2. це для того щоб dotenv працював
import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

async function run() {
  try {
    await mongoose.connect(DB_URI);

    console.info("Database connection successfully");
  } finally {
    await mongoose.disconnect();
  }
}

run().catch((error) => console.error(error));
