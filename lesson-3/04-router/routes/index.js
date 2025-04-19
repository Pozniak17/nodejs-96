import express from "express";

import bookRoutes from "./books.js";
import movieRoutes from "./movies.js";
import userRoutes from "./users.js";

const router = express.Router();

// якщо наша url починається зі /books то йди в bookRoutes і т д.
router.use("/books", bookRoutes);
router.use("/movies", movieRoutes);
router.use("/users", userRoutes);

export default router;
