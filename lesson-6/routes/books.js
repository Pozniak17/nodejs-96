import express from "express";

import BookController from "../controllers/book.js"; // прийнято контролери називати з великої літери

const router = express.Router();
const jsonParser = express.json(); // це для парсу req.body, бо express не парсить, для post, put запитів, рядки 10, 11

router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBook);
router.post("/", jsonParser, BookController.createBook);
router.put("/:id", jsonParser, BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

export default router;
