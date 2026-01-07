import express from "express";
import BookController from "../controllers/book.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBook);
router.post("/", jsonParser, BookController.createBook);
router.put("/:id", jsonParser, BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

export default router;

//* якщо треба валідацію, то може бути необмежена кількість middleware в середині і потім в кінці handler
// router.post("/", jsonParser, validation(Schema), BookController.createBook);
