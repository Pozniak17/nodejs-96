import express from "express";
import bookRoutes from "./books.js";
import authRoutes from "./auth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use("/books", authMiddleware, bookRoutes);
router.use("/auth", authRoutes);

export default router;
