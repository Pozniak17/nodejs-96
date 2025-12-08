import express from "express";
import bookRoutes from "./books.js";
import authRoutes from "./auth.js";

//! мідлвара, яка перевірятиме токен
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// підключаємо мідлвару, щоб при запиті до книжок перевірявся токен
router.use("/books", authMiddleware, bookRoutes);
router.use("/auth", authRoutes);

export default router;
