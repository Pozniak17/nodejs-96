import express from "express";

import authMiddleware from "../middleware/auth.js";

import bookRoutes from "./books.js";
import authRoutes from "./auth.js";
import userRoutes from "./users.js";

const router = express.Router();

router.use("/books", authMiddleware, bookRoutes);
router.use("/auth", authRoutes);
// Заняття 9
router.use("/users", authMiddleware, userRoutes);

export default router;
