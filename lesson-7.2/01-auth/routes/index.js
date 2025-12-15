import express from "express";
import bookRoutes from "./books.js";
import authRoutes from "./auth.js";

const router = express.Router();

router.use("/books", bookRoutes);
router.use("/auth", authRoutes);

export default router;
