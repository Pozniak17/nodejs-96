// файл для підключення бази даних
import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Database connection successfully"))
  .catch((error) => {
    console.error(error);
    process.exit(1); //якщо не зможемо підключитися, вимикаємо (щоб не грузився додаток) 0 - процес завершився успішно, відмінне від 0 - помилка
  });
