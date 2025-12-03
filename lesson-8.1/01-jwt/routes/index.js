import express from "express";
import authMiddleware from "../middleware/auth.js";

import bookRoutes from "./books.js";
import authRoutes from "./auth.js";

const router = express.Router();

router.use("/books", authMiddleware, bookRoutes);
router.use("/auth", authRoutes);

export default router;
