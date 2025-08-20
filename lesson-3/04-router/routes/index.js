// це файл підключення всіх роутів, щоб підключити до app
import express from "express";

// імпортуємо всі наші роути
import bookRoutes from "./books.js";
import movieRoutes from "./movies.js";
import userRoutes from "./users.js";

const router = express.Router();

// якщо в нас url буде починатися зі /users, то йди в userRoutes
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/movies", movieRoutes);

export default router;
